import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class ChallengeController {
  // GET /api/challenges - Récupérer tous les challenges
  async getAllChallenges(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const challenges = await prisma.challenge.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { attempts: true },
          },
        },
      });

      res.status(200).json({
        success: true,
        data: challenges,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/challenges/:id - Récupérer un challenge par ID
  async getChallengeById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const challenge = await prisma.challenge.findUnique({
        where: { id },
        include: {
          _count: {
            select: { attempts: true },
          },
        },
      });

      if (!challenge) {
        throw new AppError('Challenge not found', 404);
      }

      res.status(200).json({
        success: true,
        data: challenge,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/challenges/:id/attempt - Soumettre une tentative
  async submitAttempt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const { code, timeSpent } = req.body;

      const challenge = await prisma.challenge.findUnique({
        where: { id },
      });

      if (!challenge) {
        throw new AppError('Challenge not found', 404);
      }

      // Valider le code (simulation - en production, utilisez un service d'exécution sécurisé)
      const { passed, score } = this.validateCode(code, challenge);

      // Créer la tentative
      const attempt = await prisma.challengeAttempt.create({
        data: {
          userId,
          challengeId: id,
          code,
          passed,
          score,
          timeSpent,
        },
      });

      // Si réussi, ajouter des XP
      if (passed) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            xp: { increment: challenge.xpReward },
          },
        });
      }

      res.status(201).json({
        success: true,
        message: passed ? 'Challenge completed!' : 'Challenge failed',
        data: {
          attempt,
          xpEarned: passed ? challenge.xpReward : 0,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/challenges/:id/attempts - Récupérer les tentatives d'un challenge
  async getChallengeAttempts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const attempts = await prisma.challengeAttempt.findMany({
        where: {
          challengeId: id,
          userId,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: attempts,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/challenges/leaderboard - Récupérer le leaderboard
  async getLeaderboard(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await prisma.user.findMany({
        orderBy: [
          { xp: 'desc' },
          { level: 'desc' },
        ],
        take: 100,
        select: {
          id: true,
          username: true,
          fullName: true,
          avatar: true,
          xp: true,
          level: true,
          _count: {
            select: {
              challenges: {
                where: { passed: true },
              },
            },
          },
        },
      });

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/challenges/my-attempts - Récupérer mes tentatives
  async getMyAttempts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;

      const attempts = await prisma.challengeAttempt.findMany({
        where: { userId },
        include: {
          challenge: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: attempts,
      });
    } catch (error) {
      next(error);
    }
  }

  // Fonction de validation du code (simulation)
  private validateCode(code: string, challenge: any): { passed: boolean; score: number } {
    // En production, utilisez un service comme Judge0 ou créez un sandbox Docker
    try {
      const testCases = challenge.testCases as { inputs: any[]; outputs: any[] };
      let passedTests = 0;

      // Simulation de validation
      // Dans un vrai système, vous exécuteriez le code de manière sécurisée
      if (code.length > 10) {
        passedTests = testCases.inputs.length;
      }

      const totalTests = testCases.inputs.length;
      const score = Math.round((passedTests / totalTests) * 100);
      const passed = score === 100;

      return { passed, score };
    } catch (error) {
      return { passed: false, score: 0 };
    }
  }
}

export default new ChallengeController();
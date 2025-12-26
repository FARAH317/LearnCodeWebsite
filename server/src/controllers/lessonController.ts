import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class LessonController {
  // GET /api/lessons/:id
  async getLessonById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const lesson = await prisma.lesson.findUnique({
        where: { id },
        include: {
          course: true,
          quizzes: true,
        },
      });

      if (!lesson) {
        throw new AppError('Lesson not found', 404);
      }

      res.status(200).json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/progress
  async saveProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { lessonId, code, completed } = req.body;

      // Vérifier que la leçon existe
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (!lesson) {
        throw new AppError('Lesson not found', 404);
      }

      // Vérifier si la progression existe déjà
      const existingProgress = await prisma.progress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
      });

      let progress;
      let xpEarned = 0;
      let levelUp = false;
      let newLevel = 0;

      if (existingProgress) {
        // Vérifier si c'est une nouvelle complétion
        const isNewCompletion = completed && !existingProgress.completed;

        // Mettre à jour
        progress = await prisma.progress.update({
          where: { id: existingProgress.id },
          data: {
            code,
            completed,
            ...(completed && !existingProgress.completedAt && { completedAt: new Date() }),
          },
        });

        // Ajouter XP uniquement si c'est une nouvelle complétion
        if (isNewCompletion) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { xp: true, level: true },
          });

          if (user) {
            const oldLevel = user.level;
            const newXp = user.xp + lesson.xpReward;
            newLevel = Math.floor(newXp / 1000) + 1;
            levelUp = newLevel > oldLevel;

            await prisma.user.update({
              where: { id: userId },
              data: {
                xp: newXp,
                level: newLevel,
              },
            });

            xpEarned = lesson.xpReward;
          }
        }
      } else {
        // Créer nouvelle progression
        progress = await prisma.progress.create({
          data: {
            userId,
            lessonId,
            code,
            completed,
            ...(completed && { completedAt: new Date() }),
          },
        });

        // Ajouter XP si complété
        if (completed) {
          const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { xp: true, level: true },
          });

          if (user) {
            const oldLevel = user.level;
            const newXp = user.xp + lesson.xpReward;
            newLevel = Math.floor(newXp / 1000) + 1;
            levelUp = newLevel > oldLevel;

            await prisma.user.update({
              where: { id: userId },
              data: {
                xp: newXp,
                level: newLevel,
              },
            });

            xpEarned = lesson.xpReward;
          }
        }
      }

      // Récupérer l'utilisateur mis à jour
      const updatedUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          fullName: true,
          xp: true,
          level: true,
        },
      });

      res.status(200).json({
        success: true,
        message: completed ? 'Lesson completed!' : 'Progress saved',
        data: {
          progress,
          xpEarned,
          levelUp,
          newLevel: levelUp ? newLevel : undefined,
          user: updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/progress
  async getUserProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;

      const progress = await prisma.progress.findMany({
        where: { userId },
        include: {
          lesson: {
            include: {
              course: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LessonController();
import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class LessonController {
  // GET /api/lessons/:id
  async getLessonById(req: Request, res: Response, next: NextFunction) {
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
  async saveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { lessonId, code, completed } = req.body;

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

      if (existingProgress) {
        // Mettre à jour
        progress = await prisma.progress.update({
          where: { id: existingProgress.id },
          data: {
            code,
            completed,
            ...(completed && { completedAt: new Date() }),
          },
        });
      } else {
        // Créer
        progress = await prisma.progress.create({
          data: {
            userId,
            lessonId,
            code,
            completed,
            ...(completed && { completedAt: new Date() }),
          },
        });
      }

      // Si complété, ajouter l'XP
      if (completed && !existingProgress?.completed) {
        const lesson = await prisma.lesson.findUnique({
          where: { id: lessonId },
        });

        if (lesson) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              xp: { increment: lesson.xpReward },
            },
          });
        }
      }

      res.status(200).json({
        success: true,
        message: 'Progress saved',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/progress
  async getUserProgress(req: Request, res: Response, next: NextFunction) {
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
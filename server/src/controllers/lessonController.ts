import { Request, Response } from 'express';
import prisma from '../config/database';
import xpService from '../services/xpService';

class LessonController {
  // Sauvegarder la progression
  async saveProgress(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { lessonId, code, completed } = req.body;

      // Vérifier si la leçon existe
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: { id: true, xpReward: true },
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found',
        });
      }

      // Vérifier si une progression existe déjà
      const existingProgress = await prisma.progress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
      });

      // Déterminer si l'utilisateur vient de complèter la leçon pour la première fois
      const isFirstCompletion = completed && (!existingProgress || !existingProgress.completed);

      let xpResult = null;

      // Si c'est la première complétion, ajouter les XP
      if (isFirstCompletion) {
        xpResult = await xpService.addXP(userId, lesson.xpReward);
      }

      // Créer ou mettre à jour la progression
      const progress = await prisma.progress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId,
          },
        },
        update: {
          code,
          completed,
          updatedAt: new Date(),
        },
        create: {
          userId,
          lessonId,
          code,
          completed,
        },
      });

      return res.json({
        success: true,
        data: {
          progress,
          xpGained: isFirstCompletion ? lesson.xpReward : 0,
          leveledUp: xpResult?.leveledUp || false,
          newLevel: xpResult?.newLevel,
          totalXP: xpResult?.user.xp,
        },
      });
    } catch (error: any) {
      console.error('Error saving progress:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error saving progress',
      });
    }
  }

  // Récupérer la progression de l'utilisateur
  async getUserProgress(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;

      const progress = await prisma.progress.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
      });

      return res.json({
        success: true,
        data: progress,
      });
    } catch (error: any) {
      console.error('Error fetching progress:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error fetching progress',
      });
    }
  }

  // Récupérer une leçon par ID
  async getLessonById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const lesson = await prisma.lesson.findUnique({
        where: { id },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              language: true,
            },
          },
        },
      });

      if (!lesson) {
        return res.status(404).json({
          success: false,
          message: 'Lesson not found',
        });
      }

      return res.json({
        success: true,
        data: lesson,
      });
    } catch (error: any) {
      console.error('Error fetching lesson:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error fetching lesson',
      });
    }
  }
}

export default new LessonController();
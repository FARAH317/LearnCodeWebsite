import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class RoadmapController {
  // GET /api/roadmaps - Récupérer toutes les roadmaps publiques
  async getAllRoadmaps(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roadmaps = await prisma.roadmap.findMany({
        where: { isPublic: true },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
          _count: {
            select: { steps: true },
          },
        },
        orderBy: [
          { likes: 'desc' },
          { views: 'desc' },
        ],
      });

      res.status(200).json({
        success: true,
        data: roadmaps,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/roadmaps/my-roadmaps - Récupérer mes roadmaps
  async getMyRoadmaps(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;

      const roadmaps = await prisma.roadmap.findMany({
        where: { userId },
        include: {
          _count: {
            select: { steps: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json({
        success: true,
        data: roadmaps,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/roadmaps/:id - Récupérer une roadmap par ID
  async getRoadmapById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const roadmap = await prisma.roadmap.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
              avatar: true,
            },
          },
          steps: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
      }

      // Incrémenter les vues si la roadmap est publique
      if (roadmap.isPublic) {
        await prisma.roadmap.update({
          where: { id },
          data: { views: { increment: 1 } },
        });
      }

      res.status(200).json({
        success: true,
        data: roadmap,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/roadmaps - Créer une roadmap
  async createRoadmap(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { title, description, category, isPublic, data } = req.body;

      const roadmap = await prisma.roadmap.create({
        data: {
          userId,
          title,
          description,
          category,
          isPublic: isPublic || false,
          data: data || { nodes: [], edges: [] },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              fullName: true,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        message: 'Roadmap created successfully',
        data: roadmap,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/roadmaps/:id - Mettre à jour une roadmap
  async updateRoadmap(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const { title, description, category, isPublic, data } = req.body;

      // Vérifier que l'utilisateur est propriétaire
      const existingRoadmap = await prisma.roadmap.findUnique({
        where: { id },
      });

      if (!existingRoadmap) {
        throw new AppError('Roadmap not found', 404);
      }

      if (existingRoadmap.userId !== userId) {
        throw new AppError('Not authorized to update this roadmap', 403);
      }

      const roadmap = await prisma.roadmap.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(category && { category }),
          ...(isPublic !== undefined && { isPublic }),
          ...(data && { data }),
        },
      });

      res.status(200).json({
        success: true,
        message: 'Roadmap updated successfully',
        data: roadmap,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/roadmaps/:id - Supprimer une roadmap
  async deleteRoadmap(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      const roadmap = await prisma.roadmap.findUnique({
        where: { id },
      });

      if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
      }

      if (roadmap.userId !== userId) {
        throw new AppError('Not authorized to delete this roadmap', 403);
      }

      await prisma.roadmap.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: 'Roadmap deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/roadmaps/:id/like - Liker une roadmap
  async likeRoadmap(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const roadmap = await prisma.roadmap.update({
        where: { id },
        data: { likes: { increment: 1 } },
      });

      res.status(200).json({
        success: true,
        message: 'Roadmap liked',
        data: { likes: roadmap.likes },
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/roadmaps/:id/steps - Ajouter/Mettre à jour des étapes
  async updateSteps(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      const { steps } = req.body;

      const roadmap = await prisma.roadmap.findUnique({
        where: { id },
      });

      if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
      }

      if (roadmap.userId !== userId) {
        throw new AppError('Not authorized', 403);
      }

      // Supprimer les anciennes étapes
      await prisma.roadmapStep.deleteMany({
        where: { roadmapId: id },
      });

      // Créer les nouvelles étapes
      if (steps && steps.length > 0) {
        await prisma.roadmapStep.createMany({
          data: steps.map((step: any, index: number) => ({
            roadmapId: id,
            title: step.title,
            description: step.description,
            order: step.order || index,
            completed: step.completed || false,
            resources: step.resources || null,
          })),
        });
      }

      const updatedRoadmap = await prisma.roadmap.findUnique({
        where: { id },
        include: {
          steps: {
            orderBy: { order: 'asc' },
          },
        },
      });

      res.status(200).json({
        success: true,
        message: 'Steps updated successfully',
        data: updatedRoadmap,
      });
    } catch (error) {
      next(error);
    }
  }

  // PATCH /api/roadmaps/:id/steps/:stepId - Marquer une étape comme complétée
  async toggleStepCompletion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, stepId } = req.params;
      const userId = req.user!.userId;

      const roadmap = await prisma.roadmap.findUnique({
        where: { id },
      });

      if (!roadmap) {
        throw new AppError('Roadmap not found', 404);
      }

      if (roadmap.userId !== userId) {
        throw new AppError('Not authorized', 403);
      }

      const step = await prisma.roadmapStep.findUnique({
        where: { id: stepId },
      });

      if (!step) {
        throw new AppError('Step not found', 404);
      }

      const updatedStep = await prisma.roadmapStep.update({
        where: { id: stepId },
        data: { completed: !step.completed },
      });

      res.status(200).json({
        success: true,
        data: updatedStep,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoadmapController();
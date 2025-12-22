"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapController = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
class RoadmapController {
    // GET /api/roadmaps - Récupérer toutes les roadmaps publiques
    async getAllRoadmaps(_req, res, next) {
        try {
            const roadmaps = await database_1.default.roadmap.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/roadmaps/my-roadmaps - Récupérer mes roadmaps
    async getMyRoadmaps(req, res, next) {
        try {
            const userId = req.user.userId;
            const roadmaps = await database_1.default.roadmap.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/roadmaps/:id - Récupérer une roadmap par ID
    async getRoadmapById(req, res, next) {
        try {
            const { id } = req.params;
            const roadmap = await database_1.default.roadmap.findUnique({
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
                throw new errorHandler_1.AppError('Roadmap not found', 404);
            }
            // Incrémenter les vues si la roadmap est publique
            if (roadmap.isPublic) {
                await database_1.default.roadmap.update({
                    where: { id },
                    data: { views: { increment: 1 } },
                });
            }
            res.status(200).json({
                success: true,
                data: roadmap,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /api/roadmaps - Créer une roadmap
    async createRoadmap(req, res, next) {
        try {
            const userId = req.user.userId;
            const { title, description, category, isPublic, data } = req.body;
            const roadmap = await database_1.default.roadmap.create({
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
        }
        catch (error) {
            next(error);
        }
    }
    // PUT /api/roadmaps/:id - Mettre à jour une roadmap
    async updateRoadmap(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const { title, description, category, isPublic, data } = req.body;
            // Vérifier que l'utilisateur est propriétaire
            const existingRoadmap = await database_1.default.roadmap.findUnique({
                where: { id },
            });
            if (!existingRoadmap) {
                throw new errorHandler_1.AppError('Roadmap not found', 404);
            }
            if (existingRoadmap.userId !== userId) {
                throw new errorHandler_1.AppError('Not authorized to update this roadmap', 403);
            }
            const roadmap = await database_1.default.roadmap.update({
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
        }
        catch (error) {
            next(error);
        }
    }
    // DELETE /api/roadmaps/:id - Supprimer une roadmap
    async deleteRoadmap(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const roadmap = await database_1.default.roadmap.findUnique({
                where: { id },
            });
            if (!roadmap) {
                throw new errorHandler_1.AppError('Roadmap not found', 404);
            }
            if (roadmap.userId !== userId) {
                throw new errorHandler_1.AppError('Not authorized to delete this roadmap', 403);
            }
            await database_1.default.roadmap.delete({
                where: { id },
            });
            res.status(200).json({
                success: true,
                message: 'Roadmap deleted successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /api/roadmaps/:id/like - Liker une roadmap
    async likeRoadmap(req, res, next) {
        try {
            const { id } = req.params;
            const roadmap = await database_1.default.roadmap.update({
                where: { id },
                data: { likes: { increment: 1 } },
            });
            res.status(200).json({
                success: true,
                message: 'Roadmap liked',
                data: { likes: roadmap.likes },
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /api/roadmaps/:id/steps - Ajouter/Mettre à jour des étapes
    async updateSteps(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const { steps } = req.body;
            const roadmap = await database_1.default.roadmap.findUnique({
                where: { id },
            });
            if (!roadmap) {
                throw new errorHandler_1.AppError('Roadmap not found', 404);
            }
            if (roadmap.userId !== userId) {
                throw new errorHandler_1.AppError('Not authorized', 403);
            }
            // Supprimer les anciennes étapes
            await database_1.default.roadmapStep.deleteMany({
                where: { roadmapId: id },
            });
            // Créer les nouvelles étapes
            if (steps && steps.length > 0) {
                await database_1.default.roadmapStep.createMany({
                    data: steps.map((step, index) => ({
                        roadmapId: id,
                        title: step.title,
                        description: step.description,
                        order: step.order || index,
                        completed: step.completed || false,
                        resources: step.resources || null,
                    })),
                });
            }
            const updatedRoadmap = await database_1.default.roadmap.findUnique({
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
        }
        catch (error) {
            next(error);
        }
    }
    // PATCH /api/roadmaps/:id/steps/:stepId - Marquer une étape comme complétée
    async toggleStepCompletion(req, res, next) {
        try {
            const { id, stepId } = req.params;
            const userId = req.user.userId;
            const roadmap = await database_1.default.roadmap.findUnique({
                where: { id },
            });
            if (!roadmap) {
                throw new errorHandler_1.AppError('Roadmap not found', 404);
            }
            if (roadmap.userId !== userId) {
                throw new errorHandler_1.AppError('Not authorized', 403);
            }
            const step = await database_1.default.roadmapStep.findUnique({
                where: { id: stepId },
            });
            if (!step) {
                throw new errorHandler_1.AppError('Step not found', 404);
            }
            const updatedStep = await database_1.default.roadmapStep.update({
                where: { id: stepId },
                data: { completed: !step.completed },
            });
            res.status(200).json({
                success: true,
                data: updatedStep,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RoadmapController = RoadmapController;
exports.default = new RoadmapController();
//# sourceMappingURL=roadmapController.js.map
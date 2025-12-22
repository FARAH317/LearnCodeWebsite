"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
class LessonController {
    // GET /api/lessons/:id
    async getLessonById(req, res, next) {
        try {
            const { id } = req.params;
            const lesson = await database_1.default.lesson.findUnique({
                where: { id },
                include: {
                    course: true,
                    quizzes: true,
                },
            });
            if (!lesson) {
                throw new errorHandler_1.AppError('Lesson not found', 404);
            }
            res.status(200).json({
                success: true,
                data: lesson,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /api/lessons/progress
    async saveProgress(req, res, next) {
        try {
            const userId = req.user.userId;
            const { lessonId, code, completed } = req.body;
            // Vérifier si la progression existe déjà
            const existingProgress = await database_1.default.progress.findUnique({
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
                progress = await database_1.default.progress.update({
                    where: { id: existingProgress.id },
                    data: {
                        code,
                        completed,
                        ...(completed && { completedAt: new Date() }),
                    },
                });
            }
            else {
                // Créer
                progress = await database_1.default.progress.create({
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
                const lesson = await database_1.default.lesson.findUnique({
                    where: { id: lessonId },
                });
                if (lesson) {
                    await database_1.default.user.update({
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
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/lessons/progress
    async getUserProgress(req, res, next) {
        try {
            const userId = req.user.userId;
            const progress = await database_1.default.progress.findMany({
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LessonController = LessonController;
exports.default = new LessonController();
//# sourceMappingURL=lessonController.js.map
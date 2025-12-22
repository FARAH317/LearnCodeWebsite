"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const database_1 = __importDefault(require("../config/database"));
const errorHandler_1 = require("../middleware/errorHandler");
class CourseController {
    // GET /api/courses - Récupérer tous les cours
    async getAllCourses(_req, res, next) {
        try {
            const courses = await database_1.default.course.findMany({
                where: { isPublished: true },
                orderBy: { order: 'asc' },
                include: {
                    _count: {
                        select: { lessons: true },
                    },
                },
            });
            res.status(200).json({
                success: true,
                data: courses,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/courses/:id - Récupérer un cours par ID
    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await database_1.default.course.findUnique({
                where: { id },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                    },
                },
            });
            if (!course) {
                throw new errorHandler_1.AppError('Course not found', 404);
            }
            res.status(200).json({
                success: true,
                data: course,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/courses/:id/lessons - Récupérer les leçons d'un cours
    async getCourseLessons(req, res, next) {
        try {
            const { id } = req.params;
            const lessons = await database_1.default.lesson.findMany({
                where: { courseId: id },
                orderBy: { order: 'asc' },
            });
            res.status(200).json({
                success: true,
                data: lessons,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // POST /api/courses/:id/enroll - S'inscrire à un cours
    async enrollCourse(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            // Vérifier si déjà inscrit
            const existingEnrollment = await database_1.default.enrollment.findUnique({
                where: {
                    userId_courseId: {
                        userId,
                        courseId: id,
                    },
                },
            });
            if (existingEnrollment) {
                throw new errorHandler_1.AppError('Already enrolled in this course', 400);
            }
            // Créer l'inscription
            const enrollment = await database_1.default.enrollment.create({
                data: {
                    userId,
                    courseId: id,
                },
            });
            res.status(201).json({
                success: true,
                message: 'Successfully enrolled in course',
                data: enrollment,
            });
        }
        catch (error) {
            next(error);
        }
    }
    // GET /api/courses/my-courses - Récupérer mes cours
    async getMyCourses(req, res, next) {
        try {
            const userId = req.user.userId;
            const enrollments = await database_1.default.enrollment.findMany({
                where: { userId },
                include: {
                    course: {
                        include: {
                            _count: {
                                select: { lessons: true },
                            },
                        },
                    },
                },
            });
            const courses = enrollments.map((e) => e.course);
            res.status(200).json({
                success: true,
                data: courses,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CourseController = CourseController;
exports.default = new CourseController();
//# sourceMappingURL=courseController.js.map
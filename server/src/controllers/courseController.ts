import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

export class CourseController {
  // GET /api/courses - Récupérer tous les cours
  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await prisma.course.findMany({
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
    } catch (error) {
      next(error);
    }
  }

  // GET /api/courses/:id - Récupérer un cours par ID
  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      });

      if (!course) {
        throw new AppError('Course not found', 404);
      }

      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/courses/:id/lessons - Récupérer les leçons d'un cours
  async getCourseLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const lessons = await prisma.lesson.findMany({
        where: { courseId: id },
        orderBy: { order: 'asc' },
      });

      res.status(200).json({
        success: true,
        data: lessons,
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/courses/:id/enroll - S'inscrire à un cours
  async enrollCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;

      // Vérifier si déjà inscrit
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: id,
          },
        },
      });

      if (existingEnrollment) {
        throw new AppError('Already enrolled in this course', 400);
      }

      // Créer l'inscription
      const enrollment = await prisma.enrollment.create({
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
    } catch (error) {
      next(error);
    }
  }

  // GET /api/courses/my-courses - Récupérer mes cours
  async getMyCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;

      const enrollments = await prisma.enrollment.findMany({
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

      const courses = enrollments.map((e: { course: typeof prisma.course }) => e.course);



      res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
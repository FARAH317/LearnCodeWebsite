import express from 'express';
import courseController from '../controllers/courseController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// IMPORTANT: Routes protégées AVANT les routes avec paramètres
router.get('/my-courses', authMiddleware, courseController.getMyCourses.bind(courseController));

// Routes publiques
router.get('/', courseController.getAllCourses.bind(courseController));
router.get('/:id', courseController.getCourseById.bind(courseController));
router.get('/:id/lessons', courseController.getCourseLessons.bind(courseController));

// Routes protégées avec paramètres
router.post('/:id/enroll', authMiddleware, courseController.enrollCourse.bind(courseController));

export default router;
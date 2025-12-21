import express from 'express';
import courseController from '../controllers/courseController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// IMPORTANT: Routes protégées AVANT les routes avec paramètres
router.get('/my-courses', authMiddleware, courseController.getMyCourses);

// Routes publiques
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/:id/lessons', courseController.getCourseLessons);

// Routes protégées avec paramètres
router.post('/:id/enroll', authMiddleware, courseController.enrollCourse);

export default router;
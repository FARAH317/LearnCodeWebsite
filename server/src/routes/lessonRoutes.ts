import express from 'express';
import lessonController from '../controllers/lessonController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

// Routes pour la progression (MUST be before /:id route)
router.post('/progress', lessonController.saveProgress.bind(lessonController));
router.get('/progress', lessonController.getUserProgress.bind(lessonController));

// Route pour une leçon spécifique (this should come last)
router.get('/:id', lessonController.getLessonById.bind(lessonController));

export default router;
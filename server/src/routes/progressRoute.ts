import express from 'express';
import lessonController from '../controllers/lessonController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

// Routes pour la progression
router.post('/', lessonController.saveProgress.bind(lessonController));
router.get('/', lessonController.getUserProgress.bind(lessonController));

export default router;
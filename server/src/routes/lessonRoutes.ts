import express from 'express';
import lessonController from '../controllers/lessonController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

// Routes pour la progression AVANT les routes avec :id
router.post('/progress', lessonController.saveProgress);
router.get('/progress', lessonController.getUserProgress);

// Route pour une leçon spécifique
router.get('/:id', lessonController.getLessonById);

export default router;
import express from 'express';
import challengeController from '../controllers/challengeController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Routes protégées (nécessitent authentification)
router.use(authMiddleware);

// Routes spécifiques AVANT les routes avec :id
router.get('/leaderboard', challengeController.getLeaderboard.bind(challengeController));
router.get('/my-attempts', challengeController.getMyAttempts.bind(challengeController));

// Routes générales
router.get('/', challengeController.getAllChallenges.bind(challengeController));
router.get('/:id', challengeController.getChallengeById.bind(challengeController));

// Routes avec paramètres
router.post('/:id/attempt', challengeController.submitAttempt.bind(challengeController));
router.get('/:id/attempts', challengeController.getChallengeAttempts.bind(challengeController));

export default router;
import express from 'express';
import roadmapController from '../controllers/roadmapController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Routes protégées
router.use(authMiddleware);

// Routes spécifiques AVANT les routes avec :id
router.get('/my-roadmaps', roadmapController.getMyRoadmaps.bind(roadmapController));

// Routes générales
router.get('/', roadmapController.getAllRoadmaps.bind(roadmapController));
router.post('/', roadmapController.createRoadmap.bind(roadmapController));

// Routes avec :id
router.get('/:id', roadmapController.getRoadmapById.bind(roadmapController));
router.put('/:id', roadmapController.updateRoadmap.bind(roadmapController));
router.delete('/:id', roadmapController.deleteRoadmap.bind(roadmapController));

// Actions sur roadmaps
router.post('/:id/like', roadmapController.likeRoadmap.bind(roadmapController));
router.post('/:id/steps', roadmapController.updateSteps.bind(roadmapController));
router.patch('/:id/steps/:stepId', roadmapController.toggleStepCompletion.bind(roadmapController));

export default router;
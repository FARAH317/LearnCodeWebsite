import express from 'express';
import authController from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validate, registerSchema, loginSchema } from '../middleware/validation';

const router = express.Router();

// Routes publiques
router.post('/register', validate(registerSchema), authController.register.bind(authController));
router.post('/login', validate(loginSchema), authController.login.bind(authController));

// Routes protégées (nécessitent authentification)
router.get('/me', authMiddleware, authController.getMe.bind(authController));
router.put('/profile', authMiddleware, authController.updateProfile.bind(authController));

export default router;
import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import des routes
import authRoutes from './routes/authRoutes';
import courseRoutes from './routes/courseRoutes';
import lessonRoutes from './routes/lessonRoutes';
import challengeRoutes from './routes/challengeRoutes';
import roadmapRoutes from './routes/roadmapRoutes';

const app: Application = express();

// Middlewares globaux
app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', lessonRoutes); // Progress routes are in lessonRoutes

// Gestion des routes non trouvées
app.use(notFoundHandler);

// Gestion des erreurs
app.use(errorHandler);

export default app;
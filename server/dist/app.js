"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
// Import des routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const lessonRoutes_1 = __importDefault(require("./routes/lessonRoutes"));
const challengeRoutes_1 = __importDefault(require("./routes/challengeRoutes"));
const roadmapRoutes_1 = __importDefault(require("./routes/roadmapRoutes"));
const app = (0, express_1.default)();
// Middlewares globaux
app.use((0, cors_1.default)({
    origin: env_1.config.cors.allowedOrigins,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Route de santé
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});
// Routes API
app.use('/api/auth', authRoutes_1.default);
app.use('/api/courses', courseRoutes_1.default);
app.use('/api/lessons', lessonRoutes_1.default);
app.use('/api/challenges', challengeRoutes_1.default);
app.use('/api/roadmaps', roadmapRoutes_1.default);
app.use('/api/progress', lessonRoutes_1.default); // Progress routes are in lessonRoutes
// Gestion des routes non trouvées
app.use(errorHandler_1.notFoundHandler);
// Gestion des erreurs
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map
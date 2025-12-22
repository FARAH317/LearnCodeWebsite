"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lessonController_1 = __importDefault(require("../controllers/lessonController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Toutes les routes nécessitent l'authentification
router.use(auth_1.authMiddleware);
// Routes pour la progression AVANT les routes avec :id
router.post('/progress', lessonController_1.default.saveProgress.bind(lessonController_1.default));
router.get('/progress', lessonController_1.default.getUserProgress.bind(lessonController_1.default));
// Route pour une leçon spécifique
router.get('/:id', lessonController_1.default.getLessonById.bind(lessonController_1.default));
exports.default = router;
//# sourceMappingURL=lessonRoutes.js.map
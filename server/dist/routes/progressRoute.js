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
// Routes pour la progression
router.post('/', lessonController_1.default.saveProgress.bind(lessonController_1.default));
router.get('/', lessonController_1.default.getUserProgress.bind(lessonController_1.default));
exports.default = router;
//# sourceMappingURL=progressRoute.js.map
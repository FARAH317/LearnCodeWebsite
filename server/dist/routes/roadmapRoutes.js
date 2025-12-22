"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roadmapController_1 = __importDefault(require("../controllers/roadmapController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Routes protégées
router.use(auth_1.authMiddleware);
// Routes spécifiques AVANT les routes avec :id
router.get('/my-roadmaps', roadmapController_1.default.getMyRoadmaps.bind(roadmapController_1.default));
// Routes générales
router.get('/', roadmapController_1.default.getAllRoadmaps.bind(roadmapController_1.default));
router.post('/', roadmapController_1.default.createRoadmap.bind(roadmapController_1.default));
// Routes avec :id
router.get('/:id', roadmapController_1.default.getRoadmapById.bind(roadmapController_1.default));
router.put('/:id', roadmapController_1.default.updateRoadmap.bind(roadmapController_1.default));
router.delete('/:id', roadmapController_1.default.deleteRoadmap.bind(roadmapController_1.default));
// Actions sur roadmaps
router.post('/:id/like', roadmapController_1.default.likeRoadmap.bind(roadmapController_1.default));
router.post('/:id/steps', roadmapController_1.default.updateSteps.bind(roadmapController_1.default));
router.patch('/:id/steps/:stepId', roadmapController_1.default.toggleStepCompletion.bind(roadmapController_1.default));
exports.default = router;
//# sourceMappingURL=roadmapRoutes.js.map
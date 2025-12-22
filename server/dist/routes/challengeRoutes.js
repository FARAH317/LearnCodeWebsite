"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const challengeController_1 = __importDefault(require("../controllers/challengeController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Routes protégées (nécessitent authentification)
router.use(auth_1.authMiddleware);
// Routes spécifiques AVANT les routes avec :id
router.get('/leaderboard', challengeController_1.default.getLeaderboard.bind(challengeController_1.default));
router.get('/my-attempts', challengeController_1.default.getMyAttempts.bind(challengeController_1.default));
// Routes générales
router.get('/', challengeController_1.default.getAllChallenges.bind(challengeController_1.default));
router.get('/:id', challengeController_1.default.getChallengeById.bind(challengeController_1.default));
// Routes avec paramètres
router.post('/:id/attempt', challengeController_1.default.submitAttempt.bind(challengeController_1.default));
router.get('/:id/attempts', challengeController_1.default.getChallengeAttempts.bind(challengeController_1.default));
exports.default = router;
//# sourceMappingURL=challengeRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// Routes publiques
router.post('/register', (0, validation_1.validate)(validation_1.registerSchema), authController_1.default.register.bind(authController_1.default));
router.post('/login', (0, validation_1.validate)(validation_1.loginSchema), authController_1.default.login.bind(authController_1.default));
// Routes protégées (nécessitent authentification)
router.get('/me', auth_1.authMiddleware, authController_1.default.getMe.bind(authController_1.default));
router.put('/profile', auth_1.authMiddleware, authController_1.default.updateProfile.bind(authController_1.default));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
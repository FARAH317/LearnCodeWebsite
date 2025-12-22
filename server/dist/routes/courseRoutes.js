"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = __importDefault(require("../controllers/courseController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// IMPORTANT: Routes protégées AVANT les routes avec paramètres
router.get('/my-courses', auth_1.authMiddleware, courseController_1.default.getMyCourses.bind(courseController_1.default));
// Routes publiques
router.get('/', courseController_1.default.getAllCourses.bind(courseController_1.default));
router.get('/:id', courseController_1.default.getCourseById.bind(courseController_1.default));
router.get('/:id/lessons', courseController_1.default.getCourseLessons.bind(courseController_1.default));
// Routes protégées avec paramètres
router.post('/:id/enroll', auth_1.authMiddleware, courseController_1.default.enrollCourse.bind(courseController_1.default));
exports.default = router;
//# sourceMappingURL=courseRoutes.js.map
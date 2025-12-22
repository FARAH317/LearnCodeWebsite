import { Request, Response, NextFunction } from 'express';
export declare class CourseController {
    getAllCourses(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getCourseById(req: Request, res: Response, next: NextFunction): Promise<void>;
    getCourseLessons(req: Request, res: Response, next: NextFunction): Promise<void>;
    enrollCourse(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyCourses(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: CourseController;
export default _default;
//# sourceMappingURL=courseController.d.ts.map
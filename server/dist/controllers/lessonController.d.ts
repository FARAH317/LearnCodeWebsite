import { Request, Response, NextFunction } from 'express';
export declare class LessonController {
    getLessonById(req: Request, res: Response, next: NextFunction): Promise<void>;
    saveProgress(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserProgress(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: LessonController;
export default _default;
//# sourceMappingURL=lessonController.d.ts.map
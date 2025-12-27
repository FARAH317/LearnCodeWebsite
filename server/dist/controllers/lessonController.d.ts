import { Request, Response } from 'express';
declare class LessonController {
    saveProgress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserProgress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getLessonById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: LessonController;
export default _default;
//# sourceMappingURL=lessonController.d.ts.map
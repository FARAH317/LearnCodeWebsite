import { Request, Response, NextFunction } from 'express';
export declare class RoadmapController {
    getAllRoadmaps(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyRoadmaps(req: Request, res: Response, next: NextFunction): Promise<void>;
    getRoadmapById(req: Request, res: Response, next: NextFunction): Promise<void>;
    createRoadmap(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateRoadmap(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteRoadmap(req: Request, res: Response, next: NextFunction): Promise<void>;
    likeRoadmap(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateSteps(req: Request, res: Response, next: NextFunction): Promise<void>;
    toggleStepCompletion(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: RoadmapController;
export default _default;
//# sourceMappingURL=roadmapController.d.ts.map
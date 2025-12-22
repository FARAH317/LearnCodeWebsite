import { Request, Response, NextFunction } from 'express';
export declare class ChallengeController {
    getAllChallenges(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getChallengeById(req: Request, res: Response, next: NextFunction): Promise<void>;
    submitAttempt(req: Request, res: Response, next: NextFunction): Promise<void>;
    getChallengeAttempts(req: Request, res: Response, next: NextFunction): Promise<void>;
    getLeaderboard(_req: Request, res: Response, next: NextFunction): Promise<void>;
    getMyAttempts(req: Request, res: Response, next: NextFunction): Promise<void>;
    private validateCode;
}
declare const _default: ChallengeController;
export default _default;
//# sourceMappingURL=challengeController.d.ts.map
export declare class XPService {
    /**
     * Ajouter des XP à un utilisateur et mettre à jour son niveau
     */
    addXP(userId: string, xpAmount: number): Promise<{
        user: {
            username: string;
            fullName: string;
            id: string;
            xp: number;
            level: number;
        };
        xpGained: number;
        leveledUp: boolean;
        previousLevel: number;
        newLevel: number;
    }>;
    /**
     * Calculer le niveau basé sur les XP
     */
    calculateLevel(xp: number): number;
    /**
     * Calculer les XP nécessaires pour le prochain niveau
     */
    getXPForNextLevel(currentXP: number): number;
}
declare const _default: XPService;
export default _default;
//# sourceMappingURL=xpService.d.ts.map
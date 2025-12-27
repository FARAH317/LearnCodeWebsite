"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XPService = void 0;
const database_1 = __importDefault(require("../config/database"));
class XPService {
    /**
     * Ajouter des XP à un utilisateur et mettre à jour son niveau
     */
    async addXP(userId, xpAmount) {
        // Récupérer l'utilisateur actuel
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: { xp: true, level: true },
        });
        if (!user) {
            throw new Error('User not found');
        }
        // Calculer les nouveaux XP
        const newXP = user.xp + xpAmount;
        // Calculer le nouveau niveau (1000 XP par niveau)
        const newLevel = Math.floor(newXP / 1000) + 1;
        // Déterminer si l'utilisateur a monté de niveau
        const leveledUp = newLevel > user.level;
        // Mettre à jour l'utilisateur
        const updatedUser = await database_1.default.user.update({
            where: { id: userId },
            data: {
                xp: newXP,
                level: newLevel,
            },
            select: {
                id: true,
                xp: true,
                level: true,
                username: true,
                fullName: true,
            },
        });
        return {
            user: updatedUser,
            xpGained: xpAmount,
            leveledUp,
            previousLevel: user.level,
            newLevel: updatedUser.level,
        };
    }
    /**
     * Calculer le niveau basé sur les XP
     */
    calculateLevel(xp) {
        return Math.floor(xp / 1000) + 1;
    }
    /**
     * Calculer les XP nécessaires pour le prochain niveau
     */
    getXPForNextLevel(currentXP) {
        const currentLevel = this.calculateLevel(currentXP);
        return currentLevel * 1000;
    }
}
exports.XPService = XPService;
exports.default = new XPService();
//# sourceMappingURL=xpService.js.map
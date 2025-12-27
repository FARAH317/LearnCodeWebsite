import prisma from '../config/database';

export class XPService {
  /**
   * Ajouter des XP à un utilisateur et mettre à jour son niveau
   */
  async addXP(userId: string, xpAmount: number) {
    // Récupérer l'utilisateur actuel
    const user = await prisma.user.findUnique({
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
    const updatedUser = await prisma.user.update({
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
  calculateLevel(xp: number): number {
    return Math.floor(xp / 1000) + 1;
  }

  /**
   * Calculer les XP nécessaires pour le prochain niveau
   */
  getXPForNextLevel(currentXP: number): number {
    const currentLevel = this.calculateLevel(currentXP);
    return currentLevel * 1000;
  }
}

export default new XPService();
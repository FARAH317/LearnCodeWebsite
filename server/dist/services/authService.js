"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = __importDefault(require("../config/database"));
const encryption_1 = require("../utils/encryption");
const jwt_1 = require("../utils/jwt");
const errorHandler_1 = require("../middleware/errorHandler");
class AuthService {
    // Inscription
    async register(data) {
        const { email, username, password, fullName } = data;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await database_1.default.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            if (existingUser.email === email) {
                throw new errorHandler_1.AppError('Email already in use', 409);
            }
            if (existingUser.username === username) {
                throw new errorHandler_1.AppError('Username already taken', 409);
            }
        }
        // Hasher le mot de passe
        const hashedPassword = await (0, encryption_1.hashPassword)(password);
        // Créer l'utilisateur
        const user = await database_1.default.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                fullName,
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                avatar: true,
                bio: true,
                xp: true,
                level: true,
                createdAt: true,
            },
        });
        // Générer le token JWT
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        return {
            user,
            token,
        };
    }
    // Connexion
    async login(data) {
        const { email, password } = data;
        // Trouver l'utilisateur
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new errorHandler_1.AppError('Invalid email or password', 401);
        }
        // Vérifier le mot de passe
        const isPasswordValid = await (0, encryption_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            throw new errorHandler_1.AppError('Invalid email or password', 401);
        }
        // Calculer le niveau basé sur les XP
        const calculatedLevel = Math.floor(user.xp / 1000) + 1;
        // Mettre à jour le niveau si différent
        if (calculatedLevel !== user.level) {
            await database_1.default.user.update({
                where: { id: user.id },
                data: { level: calculatedLevel },
            });
            user.level = calculatedLevel;
        }
        // Générer le token JWT
        const token = (0, jwt_1.generateToken)({
            userId: user.id,
            email: user.email,
            username: user.username,
        });
        // Retourner les données sans le mot de passe
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    // Récupérer le profil de l'utilisateur connecté
    async getMe(userId) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                avatar: true,
                bio: true,
                xp: true,
                level: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        enrollments: true,
                        roadmaps: true,
                        achievements: true,
                    },
                },
            },
        });
        if (!user) {
            throw new errorHandler_1.AppError('User not found', 404);
        }
        // Calculer le niveau basé sur les XP
        const calculatedLevel = Math.floor(user.xp / 1000) + 1;
        // Mettre à jour le niveau si différent
        if (calculatedLevel !== user.level) {
            await database_1.default.user.update({
                where: { id: userId },
                data: { level: calculatedLevel },
            });
            user.level = calculatedLevel;
        }
        return user;
    }
    // Mettre à jour le profil
    async updateProfile(userId, data) {
        const { fullName, username, bio, avatar } = data;
        // Si le username est modifié, vérifier qu'il n'est pas déjà pris
        if (username) {
            const existingUser = await database_1.default.user.findUnique({
                where: { username },
            });
            if (existingUser && existingUser.id !== userId) {
                throw new errorHandler_1.AppError('Username already taken', 409);
            }
        }
        // Construire l'objet de mise à jour
        const updateData = {};
        if (fullName !== undefined)
            updateData.fullName = fullName;
        if (username !== undefined)
            updateData.username = username;
        if (bio !== undefined)
            updateData.bio = bio;
        if (avatar !== undefined)
            updateData.avatar = avatar;
        const user = await database_1.default.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                avatar: true,
                bio: true,
                xp: true,
                level: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map
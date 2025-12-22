import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/encryption';
import { generateToken } from '../utils/jwt';
import { AppError } from '../middleware/errorHandler';

interface RegisterData {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  // Inscription
  async register(data: RegisterData) {
    const { email, username, password, fullName } = data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new AppError('Email already in use', 409);
      }
      if (existingUser.username === username) {
        throw new AppError('Username already taken', 409);
      }
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
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
        xp: true,
        level: true,
        createdAt: true,
      },
    });

    // Générer le token JWT
    const token = generateToken({
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
  async login(data: LoginData) {
    const { email, password } = data;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Vérifier le mot de passe
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Générer le token JWT
    const token = generateToken({
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
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
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
      throw new AppError('User not found', 404);
    }

    return user;
  }

  // Mettre à jour le profil
  async updateProfile(userId: string, data: Partial<RegisterData>) {
    const { fullName, username } = data;

    // Si le username est modifié, vérifier qu'il n'est pas déjà pris
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new AppError('Username already taken', 409);
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(fullName && { fullName }),
        ...(username && { username }),
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
      },
    });

    return user;
  }
}
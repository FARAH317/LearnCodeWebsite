// src/services/authService.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from '../config/database';
 // ton PrismaClient
import { User } from "@prisma/client";

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

const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthService {
  // Inscription
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
  }

  // Connexion
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
  }

  // Récupérer le profil
  async getMe(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  // Mettre à jour le profil
  async updateProfile(userId: string, data: Partial<RegisterData>): Promise<User> {
    return prisma.user.update({ where: { id: userId }, data });
  }
}

export const authService = new AuthService();

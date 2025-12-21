import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { config } from '../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
}

// Secret
const secret: Secret = config.jwt.secret;
if (!secret) throw new Error('JWT secret is not defined');

// Sign options avec typage correct pour expiresIn
const signOptions: SignOptions = {
  expiresIn: (config.jwt.expiresIn ?? '1h') as `${number}${"d" | "h" | "m" | "s"}`, 
};

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, secret, signOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};

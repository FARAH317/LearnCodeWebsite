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
interface UpdateProfileData {
    email?: string;
    username?: string;
    fullName?: string;
    bio?: string;
    avatar?: string;
}
export declare class AuthService {
    register(data: RegisterData): Promise<{
        user: {
            email: string;
            username: string;
            fullName: string;
            id: string;
            avatar: string | null;
            bio: string | null;
            xp: number;
            level: number;
            createdAt: Date;
        };
        token: string;
    }>;
    login(data: LoginData): Promise<{
        user: {
            email: string;
            username: string;
            fullName: string;
            id: string;
            avatar: string | null;
            bio: string | null;
            xp: number;
            level: number;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    getMe(userId: string): Promise<{
        email: string;
        username: string;
        fullName: string;
        id: string;
        avatar: string | null;
        bio: string | null;
        xp: number;
        level: number;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            enrollments: number;
            roadmaps: number;
            achievements: number;
        };
    }>;
    updateProfile(userId: string, data: UpdateProfileData): Promise<{
        email: string;
        username: string;
        fullName: string;
        id: string;
        avatar: string | null;
        bio: string | null;
        xp: number;
        level: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
//# sourceMappingURL=authService.d.ts.map
import { ApiService } from '@lib/services/api';
import type { LoginData, RegisterData } from '@lib/types';

export class AuthService {
    public static async login(data: LoginData) {
        return ApiService.post<null>('/auth/login', { data });
    }
    
    public static async register(data: RegisterData) {
        return ApiService.post<null>('/auth/register', { data });
    }
    
    public static async logout() {
        return ApiService.post<null>('/auth/logout');
    }
}

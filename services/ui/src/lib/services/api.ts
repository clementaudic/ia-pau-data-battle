import { clientEnv, serverEnv } from '@config/env';
import { DEFAULT_ERROR_MESSAGE, LOGIN_PAGE_ROUTE } from '@lib/constants';
import type { RequestConfig, RequestConfigData, RequestConfigParams } from '@lib/types';

const generateFullUrl = (baseUrl: string, path: string, params?: RequestConfigParams) => {
    const url = new URL(path, baseUrl);
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') return;
            
            if (Array.isArray(value)) {
                if (value.length === 0) return;
                
                value.forEach((element) => {
                    url.searchParams.append(key, element);
                });
            } else {
                url.searchParams.append(key, String(value));
            }
        });
    }
    
    return url;
};

export class ApiService {
    private static async request<R, P extends RequestConfigParams = {}, D extends RequestConfigData = {}>(
        path: string,
        config: RequestConfig<P, D>,
    ): Promise<R | undefined> {
        const { method, headers, data, params, ...otherConfig } = config;
        
        const allHeaders = new Headers(headers);
        
        if (!(data instanceof FormData)) {
            allHeaders.set('Content-Type', 'application/json');
        }
        
        let baseUrl: string;
        
        if (typeof window === 'undefined') {
            baseUrl = serverEnv.API_URL;
            
            try {
                const { cookies } = await import('next/headers');
                
                const requestCookies = await cookies();
                
                const sessionCookie = requestCookies.get('user_session');
                
                if (sessionCookie) {
                    allHeaders.set('Cookie', `${sessionCookie.name}=${sessionCookie.value}`);
                }
            } catch (error) {
                return this.handleError(error instanceof Error ? error : new Error(DEFAULT_ERROR_MESSAGE));
            }
        } else {
            baseUrl = clientEnv.API_EXTERNAL_URL;
        }
        
        let response: Response;
        
        try {
            response = await fetch(generateFullUrl(baseUrl, path, params), {
                method: method ?? 'GET',
                headers: allHeaders,
                body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
                credentials: 'include',
                ...otherConfig,
            });
        } catch (error) {
            return this.handleError(error instanceof Error ? error : new Error(DEFAULT_ERROR_MESSAGE));
        }
        
        let responseBody;
        
        try {
            responseBody = await response.json();
        } catch {
            responseBody = undefined;
        }
        
        if (response.ok) {
            return responseBody as R;
        }
        
        if (response.status === 401 && path !== '/auth/login') {
            if (typeof window === 'undefined') {
                const { redirect } = await import('next/navigation');
                
                redirect(LOGIN_PAGE_ROUTE);
            } else {
                window.location.href = LOGIN_PAGE_ROUTE;
            }
        }
        
        return this.handleError(new Error((responseBody as { message: string }).message ?? DEFAULT_ERROR_MESSAGE));
    }
    
    private static handleError(error: Error) {
        if (typeof window === 'undefined') {
            console.error(error);
            return undefined;
        } else {
            throw error;
        }
    }
    
    public static async get<R, P extends RequestConfigParams = {}>(path: string, config?: RequestConfig<P, never>) {
        return this.request<R, P>(path, { ...config, method: 'GET' });
    }
    
    public static async post<R, P extends RequestConfigParams = {}, D extends RequestConfigData = {}>(
        path: string,
        config?: RequestConfig<P, D>,
    ) {
        return this.request<R, P>(path, { ...config, method: 'POST' });
    }
    
    public static async put<R, P extends RequestConfigParams = {}, D extends RequestConfigData = {}>(
        path: string,
        config?: RequestConfig<P, D>,
    ) {
        return this.request<R, P>(path, { ...config, method: 'PUT' });
    }
    
    public static async patch<R, P extends RequestConfigParams = {}, D extends RequestConfigData = {}>(
        path: string,
        config?: RequestConfig<P, D>,
    ) {
        return this.request<R, P>(path, { ...config, method: 'PATCH' });
    }
    
    public static async delete<R, P extends RequestConfigParams = {}>(path: string, config?: RequestConfig<P, never>) {
        return this.request<R, P>(path, { ...config, method: 'DELETE' });
    }
}

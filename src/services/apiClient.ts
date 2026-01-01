/**
 * API Client Configuration
 * Base configuration for all API requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

interface ApiResponse<T> {
    data: T | null;
    error: ApiError | null;
    success: boolean;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    setToken(token: string | null) {
        this.token = token;
    }

    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    data: null,
                    error: {
                        message: errorData.message || `HTTP ${response.status}`,
                        status: response.status,
                        code: errorData.code,
                    },
                    success: false,
                };
            }

            const data = await response.json();
            return { data, error: null, success: true };
        } catch (err) {
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : 'Network error',
                    code: 'NETWORK_ERROR',
                },
                success: false,
            };
        }
    }

    async post<T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    data: null,
                    error: {
                        message: errorData.message || `HTTP ${response.status}`,
                        status: response.status,
                        code: errorData.code,
                    },
                    success: false,
                };
            }

            const data = await response.json();
            return { data, error: null, success: true };
        } catch (err) {
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : 'Network error',
                    code: 'NETWORK_ERROR',
                },
                success: false,
            };
        }
    }

    async put<T, B = unknown>(endpoint: string, body: B): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    data: null,
                    error: {
                        message: errorData.message || `HTTP ${response.status}`,
                        status: response.status,
                        code: errorData.code,
                    },
                    success: false,
                };
            }

            const data = await response.json();
            return { data, error: null, success: true };
        } catch (err) {
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : 'Network error',
                    code: 'NETWORK_ERROR',
                },
                success: false,
            };
        }
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                return {
                    data: null,
                    error: {
                        message: errorData.message || `HTTP ${response.status}`,
                        status: response.status,
                        code: errorData.code,
                    },
                    success: false,
                };
            }

            const data = await response.json();
            return { data, error: null, success: true };
        } catch (err) {
            return {
                data: null,
                error: {
                    message: err instanceof Error ? err.message : 'Network error',
                    code: 'NETWORK_ERROR',
                },
                success: false,
            };
        }
    }
}

// Singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

export type { ApiResponse, ApiError };
export default ApiClient;

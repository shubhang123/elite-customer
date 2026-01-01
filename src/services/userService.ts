/**
 * User Profile API Service
 * Handles all user profile-related API calls
 */

import { apiClient, ApiResponse } from './apiClient';
import { User, UserProfile } from '@/types';

// API Response types
interface UserResponse {
    id: string;
    name: string;
    phone: string;
    email?: string;
    avatar?: string;
    createdAt: string;
}

interface UpdateProfileRequest {
    name?: string;
    email?: string;
    avatar?: string;
}

// API Service
export const userService = {
    /**
     * Get current user profile
     */
    async getProfile(): Promise<ApiResponse<User>> {
        return apiClient.get<User>('/user/profile');
    },

    /**
     * Update user profile
     */
    async updateProfile(updates: UpdateProfileRequest): Promise<ApiResponse<User>> {
        return apiClient.put<User>('/user/profile', updates);
    },

    /**
     * Get user's active job ID
     */
    async getActiveJobId(): Promise<ApiResponse<{ jobId: string | null }>> {
        return apiClient.get('/user/active-job');
    },

    /**
     * Upload avatar image
     */
    async uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch('/api/user/avatar', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                return {
                    data: null,
                    error: { message: 'Upload failed', status: response.status },
                    success: false,
                };
            }

            const data = await response.json();
            return { data, error: null, success: true };
        } catch (err) {
            return {
                data: null,
                error: { message: 'Upload failed', code: 'UPLOAD_ERROR' },
                success: false,
            };
        }
    },
};

export default userService;

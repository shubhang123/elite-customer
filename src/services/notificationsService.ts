/**
 * Notifications API Service
 * Handles all notification-related API calls
 */

import { apiClient, ApiResponse } from './apiClient';
import { NotificationEntry } from '@/types';

// API Response types
interface NotificationResponse {
    id: string;
    icon: string;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'warning' | 'success' | 'error';
}

// API Service
export const notificationsService = {
    /**
     * Get all notifications for the current user
     */
    async getNotifications(): Promise<ApiResponse<NotificationEntry[]>> {
        const response = await apiClient.get<NotificationResponse[]>('/notifications');
        if (response.success && response.data) {
            return {
                ...response,
                data: response.data.map(n => ({
                    icon: n.icon,
                    message: n.message,
                    date: n.date,
                })),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Mark a notification as read
     */
    async markAsRead(notificationId: string): Promise<ApiResponse<void>> {
        return apiClient.put(`/notifications/${notificationId}/read`, {});
    },

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(): Promise<ApiResponse<void>> {
        return apiClient.put('/notifications/read-all', {});
    },

    /**
     * Get unread notification count
     */
    async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
        return apiClient.get('/notifications/unread-count');
    },
};

export default notificationsService;

/**
 * Chat API Service
 * Handles all chat-related API calls
 */

import { apiClient, ApiResponse } from './apiClient';
import { ChatMessage, MessageSender } from '@/types';

// API Response types
interface ChatMessageResponse {
    id: string;
    text: string;
    sender: 'customer' | 'designer';
    timestamp: string;
    imageUrl?: string;
    isDesignPreview?: boolean;
}

interface SendMessageRequest {
    text: string;
    imageUrl?: string;
}

interface DesignApprovalRequest {
    messageId: string;
    approved: boolean;
    feedback?: string;
}

// Transform functions
const transformChatMessage = (msg: ChatMessageResponse): ChatMessage => ({
    id: msg.id,
    text: msg.text,
    sender: msg.sender === 'customer' ? MessageSender.Customer : MessageSender.Designer,
    timestamp: new Date(msg.timestamp),
    imageUrl: msg.imageUrl,
    isDesignPreview: msg.isDesignPreview,
});

// API Service
export const chatService = {
    /**
     * Get all chat messages for a job
     */
    async getMessages(jobId: string): Promise<ApiResponse<ChatMessage[]>> {
        const response = await apiClient.get<ChatMessageResponse[]>(`/jobs/${jobId}/chat`);
        if (response.success && response.data) {
            return {
                ...response,
                data: response.data.map(transformChatMessage),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Send a message
     */
    async sendMessage(jobId: string, message: SendMessageRequest): Promise<ApiResponse<ChatMessage>> {
        const response = await apiClient.post<ChatMessageResponse>(`/jobs/${jobId}/chat`, message);
        if (response.success && response.data) {
            return {
                ...response,
                data: transformChatMessage(response.data),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Approve or reject a design
     */
    async submitDesignApproval(jobId: string, approval: DesignApprovalRequest): Promise<ApiResponse<void>> {
        return apiClient.post<void>(`/jobs/${jobId}/design-approval`, approval);
    },

    /**
     * Upload an image attachment
     */
    async uploadImage(jobId: string, file: File): Promise<ApiResponse<{ url: string }>> {
        // For file uploads, we'd typically use FormData
        // This is a placeholder - actual implementation would handle file upload
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`/api/jobs/${jobId}/upload`, {
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

export default chatService;

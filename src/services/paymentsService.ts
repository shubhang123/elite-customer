/**
 * Payments API Service
 * Handles all payment-related API calls
 */

import { apiClient, ApiResponse } from './apiClient';
import { PaymentSummary, PaymentEntry, PaymentStatus } from '@/types';

// API Response types
interface PaymentSummaryResponse {
    total: number;
    paid: number;
    due: number;
}

interface PaymentEntryResponse {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'due';
    transactionId?: string;
    method?: string;
}

interface InitiatePaymentRequest {
    amount: number;
    method: 'card' | 'upi' | 'netbanking';
}

interface PaymentInitiationResponse {
    paymentId: string;
    redirectUrl?: string;
    orderId?: string;
}

// Transform functions
const transformPaymentEntry = (entry: PaymentEntryResponse): PaymentEntry => ({
    date: entry.date,
    amount: entry.amount,
    status: entry.status === 'paid' ? PaymentStatus.Paid : PaymentStatus.Due,
});

// API Service
export const paymentsService = {
    /**
     * Get payment summary for a job
     */
    async getPaymentSummary(jobId: string): Promise<ApiResponse<PaymentSummary>> {
        return apiClient.get<PaymentSummary>(`/jobs/${jobId}/payments/summary`);
    },

    /**
     * Get payment history for a job
     */
    async getPaymentHistory(jobId: string): Promise<ApiResponse<PaymentEntry[]>> {
        const response = await apiClient.get<PaymentEntryResponse[]>(`/jobs/${jobId}/payments/history`);
        if (response.success && response.data) {
            return {
                ...response,
                data: response.data.map(transformPaymentEntry),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Initiate a payment
     */
    async initiatePayment(
        jobId: string,
        request: InitiatePaymentRequest
    ): Promise<ApiResponse<PaymentInitiationResponse>> {
        return apiClient.post<PaymentInitiationResponse>(`/jobs/${jobId}/payments/initiate`, request);
    },

    /**
     * Verify payment completion
     */
    async verifyPayment(
        jobId: string,
        paymentId: string
    ): Promise<ApiResponse<{ success: boolean; transactionId: string }>> {
        return apiClient.post(`/jobs/${jobId}/payments/verify`, { paymentId });
    },
};

export default paymentsService;

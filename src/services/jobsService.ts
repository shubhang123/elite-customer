/**
 * Jobs API Service
 * Handles all job-related API calls (progress, summary, etc.)
 */

import { apiClient, ApiResponse } from './apiClient';
import { JobSummary, ProgressStep, ProgressStatus } from '@/types';

// API Response types
interface JobResponse {
    id: string;
    status: string;
    estimatedDelivery: string;
    createdAt: string;
    updatedAt: string;
}

interface ProgressStepResponse {
    label: string;
    date: string;
    status: 'done' | 'inprogress' | 'pending';
    description?: string;
    estimatedDuration?: number;
}

interface JobDetailsResponse {
    job: JobResponse;
    progressSteps: ProgressStepResponse[];
}

// Transform functions
const transformJobSummary = (job: JobResponse): JobSummary => ({
    status: job.status,
    estimatedDelivery: job.estimatedDelivery,
});

const transformProgressStep = (step: ProgressStepResponse): ProgressStep => ({
    label: step.label,
    date: step.date,
    status: step.status === 'done'
        ? ProgressStatus.Done
        : step.status === 'inprogress'
            ? ProgressStatus.InProgress
            : ProgressStatus.Pending,
    description: step.description,
    estimatedDuration: step.estimatedDuration,
});

// API Service
export const jobsService = {
    /**
     * Get current job summary
     */
    async getJobSummary(jobId: string): Promise<ApiResponse<JobSummary>> {
        const response = await apiClient.get<JobResponse>(`/jobs/${jobId}`);
        if (response.success && response.data) {
            return {
                ...response,
                data: transformJobSummary(response.data),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Get job progress steps
     */
    async getProgressSteps(jobId: string): Promise<ApiResponse<ProgressStep[]>> {
        const response = await apiClient.get<ProgressStepResponse[]>(`/jobs/${jobId}/progress`);
        if (response.success && response.data) {
            return {
                ...response,
                data: response.data.map(transformProgressStep),
            };
        }
        return { ...response, data: null };
    },

    /**
     * Get full job details (summary + progress)
     */
    async getJobDetails(jobId: string): Promise<ApiResponse<{ summary: JobSummary; steps: ProgressStep[] }>> {
        const response = await apiClient.get<JobDetailsResponse>(`/jobs/${jobId}/details`);
        if (response.success && response.data) {
            return {
                ...response,
                data: {
                    summary: transformJobSummary(response.data.job),
                    steps: response.data.progressSteps.map(transformProgressStep),
                },
            };
        }
        return { ...response, data: null };
    },
};

export default jobsService;

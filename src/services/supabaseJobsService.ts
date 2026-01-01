/**
 * Jobs Service - Fetches jobs from Supabase
 * Based on the actual jobs table schema
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Job interface matching actual Supabase schema
export interface Job {
    id: string;
    status: string;
    branch_id: number | null;
    created_at: string | null;
    job_code: string | null;
    amount: number | null;
    timeline: TimelineEntry[] | null;
    design: DesignInfo | null;
    salesperson: SalespersonInfo | null;
    // Computed from chat_messages
    last_message?: string;
    last_message_time?: string;
}

export interface TimelineEntry {
    status: string;
    timestamp: string;
    note?: string;
}

export interface DesignInfo {
    designerId?: string;
    designerName?: string;
    status?: string;
    images?: string[];
}

export interface SalespersonInfo {
    name?: string;
    phone?: string;
}

export const supabaseJobsService = {
    /**
     * Check if Supabase is configured
     */
    isConfigured: () => isSupabaseConfigured,

    /**
     * Get all jobs for the current user
     */
    async getJobs(): Promise<{ data: Job[] | null; error: string | null }> {
        if (!supabase) {
            return { data: null, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('id, status, branch_id, created_at, job_code, amount, timeline, design, salesperson')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching jobs:', error);
                return { data: null, error: error.message };
            }

            // Get last message for each job
            const jobsWithMessages = await Promise.all(
                (data || []).map(async (job) => {
                    const { data: messages } = await supabase!
                        .from('chat_messages')
                        .select('message, created_at')
                        .eq('job_id', job.id)
                        .order('created_at', { ascending: false })
                        .limit(1);

                    return {
                        ...job,
                        last_message: messages?.[0]?.message || null,
                        last_message_time: messages?.[0]?.created_at || null,
                    } as Job;
                })
            );

            return { data: jobsWithMessages, error: null };
        } catch (err) {
            console.error('Error fetching jobs:', err);
            return { data: null, error: 'Failed to fetch jobs' };
        }
    },

    /**
     * Get a single job by ID
     */
    async getJob(jobId: string): Promise<{ data: Job | null; error: string | null }> {
        if (!supabase) {
            return { data: null, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('id, status, branch_id, created_at, job_code, amount, timeline, design, salesperson')
                .eq('id', jobId)
                .single();

            if (error) {
                return { data: null, error: error.message };
            }

            return { data: data as Job, error: null };
        } catch (err) {
            return { data: null, error: 'Failed to fetch job' };
        }
    },

    /**
     * Get job timeline/progress
     */
    async getJobProgress(jobId: string): Promise<{ data: TimelineEntry[] | null; error: string | null }> {
        if (!supabase) {
            return { data: null, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('timeline')
                .eq('id', jobId)
                .single();

            if (error) {
                return { data: null, error: error.message };
            }

            return { data: data?.timeline || [], error: null };
        } catch (err) {
            return { data: null, error: 'Failed to fetch progress' };
        }
    },
};

export default supabaseJobsService;

/**
 * Supabase Chat Service
 * Handles chat messages using Supabase real-time
 */

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ChatMessage, MessageSender } from '@/types';

// Database types matching Supabase schema
interface ChatMessageRow {
    id: string;
    job_id: string | null;
    sender_type: string;
    sender_id: string;
    sender_name: string | null;
    message: string | null;
    image_url: string | null;
    created_at: string | null;
}

// Transform database row to app model
const transformMessage = (row: ChatMessageRow): ChatMessage => ({
    id: row.id,
    text: row.message || '',
    sender: row.sender_type === 'customer' ? MessageSender.Customer : MessageSender.Designer,
    timestamp: row.created_at ? new Date(row.created_at) : new Date(),
    imageUrl: row.image_url || undefined,
    isDesignPreview: row.image_url ? true : false,
});

export const supabaseChatService = {
    /**
     * Check if Supabase is configured
     */
    isConfigured: () => isSupabaseConfigured,

    /**
     * Get all chat messages for a job
     */
    async getMessages(jobId: string): Promise<{ data: ChatMessage[] | null; error: string | null }> {
        if (!supabase) {
            return { data: null, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('job_id', jobId)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error);
                return { data: null, error: error.message };
            }

            const messages = (data as ChatMessageRow[]).map(transformMessage);
            return { data: messages, error: null };
        } catch (err) {
            console.error('Error fetching messages:', err);
            return { data: null, error: 'Failed to fetch messages' };
        }
    },

    /**
     * Send a new message
     */
    async sendMessage(
        jobId: string,
        senderId: string,
        senderName: string,
        text: string,
        imageUrl?: string
    ): Promise<{ data: ChatMessage | null; error: string | null }> {
        if (!supabase) {
            return { data: null, error: 'Supabase not configured' };
        }

        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .insert({
                    job_id: jobId,
                    sender_type: 'customer',
                    sender_id: senderId,
                    sender_name: senderName,
                    message: text,
                    image_url: imageUrl || null,
                })
                .select()
                .single();

            if (error) {
                console.error('Error sending message:', error);
                return { data: null, error: error.message };
            }

            return { data: transformMessage(data as ChatMessageRow), error: null };
        } catch (err) {
            console.error('Error sending message:', err);
            return { data: null, error: 'Failed to send message' };
        }
    },

    /**
     * Subscribe to new messages in real-time
     */
    subscribeToMessages(
        jobId: string,
        onNewMessage: (message: ChatMessage) => void
    ): (() => void) | null {
        if (!supabase) {
            return null;
        }

        const channel = supabase
            .channel(`chat:${jobId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: `job_id=eq.${jobId}`,
                },
                (payload) => {
                    const message = transformMessage(payload.new as ChatMessageRow);
                    onNewMessage(message);
                }
            )
            .subscribe();

        // Return unsubscribe function
        return () => {
            if (supabase) {
                supabase.removeChannel(channel);
            }
        };
    },

    /**
     * Get messages count for a job
     */
    async getMessagesCount(jobId: string): Promise<{ count: number; error: string | null }> {
        if (!supabase) {
            return { count: 0, error: 'Supabase not configured' };
        }

        try {
            const { count, error } = await supabase
                .from('chat_messages')
                .select('*', { count: 'exact', head: true })
                .eq('job_id', jobId);

            if (error) {
                return { count: 0, error: error.message };
            }

            return { count: count || 0, error: null };
        } catch (err) {
            return { count: 0, error: 'Failed to get count' };
        }
    },
};

export default supabaseChatService;

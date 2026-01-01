/** @jsxImportSource @emotion/react */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import {
    UserProfile,
    JobSummary,
    FeatureCard,
    ProgressStep,
    ProgressStatus,
    PaymentSummary,
    PaymentEntry,
    PaymentStatus,
    NotificationEntry,
    ChatMessage,
    MessageSender,
} from '@/types';

// Import API services
import { jobsService } from '@/services/jobsService';
import { chatService } from '@/services/chatService';
import { paymentsService } from '@/services/paymentsService';
import { notificationsService } from '@/services/notificationsService';
import { apiClient } from '@/services/apiClient';

// Loading states
interface LoadingState {
    job: boolean;
    chat: boolean;
    payments: boolean;
    notifications: boolean;
}

interface ErrorState {
    job: string | null;
    chat: string | null;
    payments: string | null;
    notifications: string | null;
}

// Extended app state with loading/error states
interface AppStateContextType {
    // Data
    user: UserProfile | null;
    jobSummary: JobSummary | null;
    features: FeatureCard[];
    progressSteps: ProgressStep[];
    paymentSummary: PaymentSummary | null;
    paymentHistory: PaymentEntry[];
    notifications: NotificationEntry[];
    chatMessages: ChatMessage[];
    jobId: string;

    // Theme
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Loading and error states
    loading: LoadingState;
    errors: ErrorState;

    // Actions - Local (for demo/offline)
    setUser: (user: UserProfile | null) => void;
    addChatMessage: (message: ChatMessage) => void;

    // API Actions - Use these when backend is available
    fetchJobData: (jobId: string) => Promise<void>;
    fetchChatMessages: (jobId: string) => Promise<void>;
    fetchPayments: (jobId: string) => Promise<void>;
    fetchNotifications: () => Promise<void>;
    sendChatMessage: (text: string, imageUrl?: string) => Promise<void>;
    submitDesignApproval: (messageId: string, approved: boolean, feedback?: string) => Promise<void>;
    refreshAll: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Check if we're in demo mode (no API configured)
const isDemoMode = !process.env.NEXT_PUBLIC_API_URL;

// Mock data for demo mode
const mockFeatures: FeatureCard[] = [
    { icon: 'MdTimeline', label: 'Track Progress', route: '/progress' },
    { icon: 'MdChatBubbleOutline', label: 'Chat with Designer', route: '/chat' },
    { icon: 'MdPayment', label: 'View Payments', route: '/payments' },
    { icon: 'MdNotifications', label: 'Notifications', route: '/notifications' },
];

const mockProgressSteps: ProgressStep[] = [
    { label: 'Order Received', date: '2024-12-20', status: ProgressStatus.Done, description: 'Your order has been confirmed' },
    { label: 'Design Started', date: '2024-12-21', status: ProgressStatus.Done, description: 'Designer assigned to your project' },
    { label: 'Design Review', date: '2024-12-23', status: ProgressStatus.InProgress, description: 'Awaiting your feedback on designs' },
    { label: 'Production', date: '', status: ProgressStatus.Pending, description: 'Manufacturing process' },
    { label: 'Delivery', date: '', status: ProgressStatus.Pending, description: 'Shipping to your address' },
];

const mockPaymentHistory: PaymentEntry[] = [
    { date: '2024-12-20', amount: 2500, status: PaymentStatus.Paid },
    { date: '2024-12-25', amount: 2500, status: PaymentStatus.Due },
];

const mockNotifications: NotificationEntry[] = [
    { icon: 'MdDesignServices', message: 'New design ready for review', date: '2024-12-23' },
    { icon: 'MdPayment', message: 'Payment of €2,500 is due', date: '2024-12-25' },
    { icon: 'MdUpdate', message: 'Your order status has been updated', date: '2024-12-22' },
];

const mockChatMessages: ChatMessage[] = [
    {
        id: '1',
        text: 'Hello! I\'m Sarah, your dedicated designer. I\'m excited to work on your project!',
        sender: MessageSender.Designer,
        timestamp: new Date(Date.now() - 3600000),
    },
    {
        id: '2',
        text: 'Hi Sarah! Looking forward to seeing the designs.',
        sender: MessageSender.Customer,
        timestamp: new Date(Date.now() - 3500000),
    },
    {
        id: '3',
        text: 'Here\'s the first design concept for your review:',
        sender: MessageSender.Designer,
        timestamp: new Date(Date.now() - 1800000),
        imageUrl: 'https://picsum.photos/400/300',
        isDesignPreview: true,
    },
];

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Data states
    const [user, setUser] = useState<UserProfile | null>({ name: 'John', phone: '+44 7700 900123' });
    const [jobSummary, setJobSummary] = useState<JobSummary | null>({ status: 'In Production', estimatedDelivery: 'Dec 30, 2024' });
    const [features] = useState<FeatureCard[]>(mockFeatures);
    const [progressSteps, setProgressSteps] = useState<ProgressStep[]>(mockProgressSteps);
    const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>({ total: 5000, paid: 2500, due: 2500 });
    const [paymentHistory, setPaymentHistory] = useState<PaymentEntry[]>(mockPaymentHistory);
    const [notifications, setNotifications] = useState<NotificationEntry[]>(mockNotifications);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
    const [jobId] = useState<string>('7b4803e7-acc1-4d76-a98f-01731014fa74');

    // Theme state
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Loading states
    const [loading, setLoading] = useState<LoadingState>({
        job: false,
        chat: false,
        payments: false,
        notifications: false,
    });

    // Error states
    const [errors, setErrors] = useState<ErrorState>({
        job: null,
        chat: null,
        payments: null,
        notifications: null,
    });

    // Load dark mode preference from localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            setIsDarkMode(savedDarkMode === 'true');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = useCallback(() => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('darkMode', String(newValue));
            // Apply/remove dark class on document
            if (newValue) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newValue;
        });
    }, []);

    // Local action - add chat message (for demo/offline)
    const addChatMessage = useCallback((message: ChatMessage) => {
        setChatMessages(prev => [...prev, message]);
    }, []);

    // API Actions - These integrate with your backend when available

    const fetchJobData = useCallback(async (jobId: string) => {
        if (isDemoMode) return;

        setLoading(prev => ({ ...prev, job: true }));
        setErrors(prev => ({ ...prev, job: null }));

        try {
            const [summaryRes, stepsRes] = await Promise.all([
                jobsService.getJobSummary(jobId),
                jobsService.getProgressSteps(jobId),
            ]);

            if (summaryRes.success && summaryRes.data) {
                setJobSummary(summaryRes.data);
            }
            if (stepsRes.success && stepsRes.data) {
                setProgressSteps(stepsRes.data);
            }

            if (!summaryRes.success) {
                setErrors(prev => ({ ...prev, job: summaryRes.error?.message || 'Failed to load job' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, job: 'Failed to load job data' }));
        } finally {
            setLoading(prev => ({ ...prev, job: false }));
        }
    }, []);

    const fetchChatMessages = useCallback(async (jobId: string) => {
        if (isDemoMode) return;

        setLoading(prev => ({ ...prev, chat: true }));
        setErrors(prev => ({ ...prev, chat: null }));

        try {
            const response = await chatService.getMessages(jobId);
            if (response.success && response.data) {
                setChatMessages(response.data);
            } else {
                setErrors(prev => ({ ...prev, chat: response.error?.message || 'Failed to load messages' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, chat: 'Failed to load messages' }));
        } finally {
            setLoading(prev => ({ ...prev, chat: false }));
        }
    }, []);

    const fetchPayments = useCallback(async (jobId: string) => {
        if (isDemoMode) return;

        setLoading(prev => ({ ...prev, payments: true }));
        setErrors(prev => ({ ...prev, payments: null }));

        try {
            const [summaryRes, historyRes] = await Promise.all([
                paymentsService.getPaymentSummary(jobId),
                paymentsService.getPaymentHistory(jobId),
            ]);

            if (summaryRes.success && summaryRes.data) {
                setPaymentSummary(summaryRes.data);
            }
            if (historyRes.success && historyRes.data) {
                setPaymentHistory(historyRes.data);
            }

            if (!summaryRes.success) {
                setErrors(prev => ({ ...prev, payments: summaryRes.error?.message || 'Failed to load payments' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, payments: 'Failed to load payments' }));
        } finally {
            setLoading(prev => ({ ...prev, payments: false }));
        }
    }, []);

    const fetchNotifications = useCallback(async () => {
        if (isDemoMode) return;

        setLoading(prev => ({ ...prev, notifications: true }));
        setErrors(prev => ({ ...prev, notifications: null }));

        try {
            const response = await notificationsService.getNotifications();
            if (response.success && response.data) {
                setNotifications(response.data);
            } else {
                setErrors(prev => ({ ...prev, notifications: response.error?.message || 'Failed to load notifications' }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, notifications: 'Failed to load notifications' }));
        } finally {
            setLoading(prev => ({ ...prev, notifications: false }));
        }
    }, []);

    const sendChatMessage = useCallback(async (text: string, imageUrl?: string) => {
        if (isDemoMode) {
            // Demo mode - just add locally
            const newMessage: ChatMessage = {
                id: Date.now().toString(),
                text,
                sender: MessageSender.Customer,
                timestamp: new Date(),
                imageUrl,
            };
            addChatMessage(newMessage);
            return;
        }

        try {
            const response = await chatService.sendMessage(jobId, { text, imageUrl });
            if (response.success && response.data) {
                addChatMessage(response.data);
            }
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    }, [jobId, addChatMessage]);

    const submitDesignApproval = useCallback(async (messageId: string, approved: boolean, feedback?: string) => {
        if (isDemoMode) {
            // Demo mode - just add approval message locally
            const approvalMessage: ChatMessage = {
                id: Date.now().toString(),
                text: approved
                    ? '✅ Design Approved! Looking forward to the final version.'
                    : `📝 Feedback on design:\n\n${feedback}`,
                sender: MessageSender.Customer,
                timestamp: new Date(),
            };
            addChatMessage(approvalMessage);
            return;
        }

        try {
            await chatService.submitDesignApproval(jobId, { messageId, approved, feedback });
            // Optionally refresh messages after approval
            await fetchChatMessages(jobId);
        } catch (err) {
            console.error('Failed to submit approval:', err);
        }
    }, [jobId, addChatMessage, fetchChatMessages]);

    const refreshAll = useCallback(async () => {
        if (isDemoMode) return;

        await Promise.all([
            fetchJobData(jobId),
            fetchChatMessages(jobId),
            fetchPayments(jobId),
            fetchNotifications(),
        ]);
    }, [jobId, fetchJobData, fetchChatMessages, fetchPayments, fetchNotifications]);

    // Set auth token when available
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            apiClient.setToken(token);
        }
    }, []);

    const value: AppStateContextType = {
        user,
        setUser,
        jobSummary,
        features,
        progressSteps,
        paymentSummary,
        paymentHistory,
        notifications,
        chatMessages,
        jobId,
        isDarkMode,
        toggleDarkMode,
        loading,
        errors,
        addChatMessage,
        fetchJobData,
        fetchChatMessages,
        fetchPayments,
        fetchNotifications,
        sendChatMessage,
        submitDesignApproval,
        refreshAll,
    };

    return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};

export default AppStateContext;

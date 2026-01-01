// User types
export interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    avatar?: string;
}

export interface UserProfile {
    name: string;
    phone: string;
}

// Chat types
export enum MessageSender {
    Customer = 'customer',
    Designer = 'designer',
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: MessageSender;
    timestamp: Date;
    imageUrl?: string;
    isDesignPreview?: boolean;
}

// Progress types
export enum ProgressStatus {
    Done = 'done',
    InProgress = 'inprogress',
    Pending = 'pending',
}

export interface ProgressStep {
    label: string;
    date: string;
    status: ProgressStatus;
    description?: string;
    estimatedDuration?: number; // days
}

// Payment types
export enum PaymentStatus {
    Paid = 'paid',
    Due = 'due',
}

export interface PaymentEntry {
    date: string;
    amount: number;
    status: PaymentStatus;
}

export interface PaymentSummary {
    total: number;
    paid: number;
    due: number;
}

// Notification types
export interface NotificationEntry {
    icon: string; // icon name from react-icons
    message: string;
    date: string;
}

// Job types
export interface JobSummary {
    status: string;
    estimatedDelivery: string;
}

// Feature card types
export interface FeatureCard {
    icon: string; // icon name from react-icons
    label: string;
    route: string;
}

// App State type
export interface AppStateType {
    user: UserProfile | null;
    jobSummary: JobSummary | null;
    features: FeatureCard[];
    progressSteps: ProgressStep[];
    paymentSummary: PaymentSummary | null;
    paymentHistory: PaymentEntry[];
    notifications: NotificationEntry[];
    chatMessages: ChatMessage[];
    jobId: string;
}

// Auth State type
export interface AuthStateType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    errorMessage: string | null;
    token: string | null;
}

import {
    signInWithEmailAndPassword as firebaseSignInWithEmail,
    createUserWithEmailAndPassword,
    signInWithPhoneNumber,
    signInWithCredential,
    RecaptchaVerifier,
    ConfirmationResult,
    updateProfile,
    signOut,
    User as FirebaseUser,
    PhoneAuthCredential,
    Auth,
} from 'firebase/auth';
import { auth, isDemoMode } from './firebase';
import { User } from '@/types';

const USER_KEY = 'elite_customer_user';
const TOKEN_KEY = 'elite_customer_token';

// Initialize reCAPTCHA verifier for phone auth
let recaptchaVerifier: RecaptchaVerifier | null = null;

export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
    if (typeof window !== 'undefined' && auth) {
        recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            size: 'invisible',
            callback: () => {
                // reCAPTCHA solved
            },
            'expired-callback': () => {
                // Reset reCAPTCHA
                recaptchaVerifier = null;
            },
        });
    }
    return recaptchaVerifier!;
};

export const getRecaptchaVerifier = (): RecaptchaVerifier | null => recaptchaVerifier;

// Check if user is logged in
export const isLoggedIn = (): boolean => {
    if (isDemoMode || !auth) {
        return getStoredUser() !== null;
    }
    return auth.currentUser !== null;
};

// Get current Firebase user
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
    if (!auth) return null;
    return auth.currentUser;
};

// Save user session to localStorage
export const saveUserSession = (user: User, token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    }
};

// Get stored user from localStorage
export const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    try {
        return JSON.parse(userJson) as User;
    } catch {
        return null;
    }
};

// Get stored token from localStorage
export const getStoredToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
};

// Clear stored session
export const clearSession = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }
};

// Logout
export const logout = async (): Promise<void> => {
    if (auth) {
        await signOut(auth);
    }
    clearSession();
};

// Email/Password Authentication
export const signInWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<FirebaseUser> => {
    if (!auth) {
        throw new Error('Firebase auth not initialized. Running in demo mode.');
    }
    const userCredential = await firebaseSignInWithEmail(auth, email, password);
    return userCredential.user;
};

export const createUserWithEmailAndPasswordAndName = async (
    email: string,
    password: string,
    name: string
): Promise<FirebaseUser> => {
    if (!auth) {
        throw new Error('Firebase auth not initialized. Running in demo mode.');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
};

// Phone Authentication
export const verifyPhoneNumber = async (
    phoneNumber: string,
    recaptcha: RecaptchaVerifier
): Promise<ConfirmationResult> => {
    if (!auth) {
        throw new Error('Firebase auth not initialized. Running in demo mode.');
    }
    return signInWithPhoneNumber(auth, phoneNumber, recaptcha);
};

export const confirmOtp = async (
    confirmationResult: ConfirmationResult,
    otp: string
): Promise<FirebaseUser> => {
    const userCredential = await confirmationResult.confirm(otp);
    return userCredential.user;
};

export const signInWithPhoneCredential = async (
    credential: PhoneAuthCredential
): Promise<FirebaseUser> => {
    if (!auth) {
        throw new Error('Firebase auth not initialized. Running in demo mode.');
    }
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
};

// Create User object from Firebase user
export const createUserFromFirebase = async (firebaseUser: FirebaseUser): Promise<User> => {
    const token = await firebaseUser.getIdToken();
    const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        phone: firebaseUser.phoneNumber || '',
    };
    saveUserSession(user, token);
    return user;
};

// Update user display name
export const updateUserDisplayName = async (name: string): Promise<void> => {
    if (!auth) return;
    const user = auth.currentUser;
    if (user) {
        await updateProfile(user, { displayName: name });
    }
};

// Demo mode login - bypasses Firebase for testing
export const demoLogin = (): User => {
    const demoUser: User = {
        id: 'demo-user-123',
        name: 'Demo User',
        email: 'demo@elite.com',
        phone: '+91 9876543210',
    };
    saveUserSession(demoUser, 'demo-token');
    return demoUser;
};

export default {
    isLoggedIn,
    getCurrentFirebaseUser,
    saveUserSession,
    getStoredUser,
    getStoredToken,
    clearSession,
    logout,
    signInWithEmailAndPassword,
    createUserWithEmailAndPasswordAndName,
    verifyPhoneNumber,
    confirmOtp,
    signInWithPhoneCredential,
    createUserFromFirebase,
    updateUserDisplayName,
    setupRecaptcha,
    getRecaptchaVerifier,
    demoLogin,
    isDemoMode,
};

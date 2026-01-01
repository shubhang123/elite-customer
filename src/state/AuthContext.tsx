'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, ConfirmationResult, User as FirebaseUser } from 'firebase/auth';
import { auth, isDemoMode } from '@/services/firebase';
import authService from '@/services/authService';
import { User, AuthStateType } from '@/types';

interface AuthContextType extends AuthStateType {
    login: (user: User, token: string) => void;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    registerWithEmailAndPasswordAndName: (email: string, password: string, name: string) => Promise<void>;
    signInWithPhone: (phoneNumber: string, recaptchaContainerId: string) => Promise<ConfirmationResult | null>;
    confirmOtp: (confirmationResult: ConfirmationResult, otp: string, userName?: string) => Promise<void>;
    updateUserFromFirebase: (firebaseUser: FirebaseUser) => Promise<void>;
    demoLogin: () => void;
    clearError: () => void;
    isDemoMode: boolean;
}

const initialState: AuthStateType = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    errorMessage: null,
    token: null,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthStateType>(initialState);
    const router = useRouter();

    // Listen for auth state changes
    useEffect(() => {
        // Check for stored user first (works in demo mode)
        const storedUser = authService.getStoredUser();
        const storedToken = authService.getStoredToken();

        if (storedUser && storedToken) {
            setState({
                user: storedUser,
                isLoggedIn: true,
                isLoading: false,
                errorMessage: null,
                token: storedToken,
            });
        }

        // If we have Firebase auth, also listen for Firebase changes
        if (auth && !isDemoMode) {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken();
                    const user: User = {
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || 'User',
                        email: firebaseUser.email || '',
                        phone: firebaseUser.phoneNumber || '',
                    };
                    authService.saveUserSession(user, token);
                    setState({
                        user,
                        isLoggedIn: true,
                        isLoading: false,
                        errorMessage: null,
                        token,
                    });
                } else if (!storedUser) {
                    authService.clearSession();
                    setState({
                        ...initialState,
                        isLoading: false,
                    });
                }
            });

            return () => unsubscribe();
        } else {
            // In demo mode, just mark loading as false if no stored user
            if (!storedUser) {
                setState((prev) => ({ ...prev, isLoading: false }));
            }
        }
    }, []);

    // Login with user and token
    const login = useCallback((user: User, token: string) => {
        authService.saveUserSession(user, token);
        setState({
            user,
            isLoggedIn: true,
            isLoading: false,
            errorMessage: null,
            token,
        });
    }, []);

    // Demo login - bypasses Firebase
    const demoLogin = useCallback(() => {
        const demoUser = authService.demoLogin();
        setState({
            user: demoUser,
            isLoggedIn: true,
            isLoading: false,
            errorMessage: null,
            token: 'demo-token',
        });
        router.push('/home');
    }, [router]);

    // Logout
    const logout = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            await authService.logout();
            setState({
                ...initialState,
                isLoading: false,
            });
            router.push('/');
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                errorMessage: 'Failed to logout',
            }));
        }
    }, [router]);

    // Check auth status
    const checkAuthStatus = useCallback(async () => {
        const isAuthenticated = authService.isLoggedIn();
        if (isAuthenticated) {
            const storedUser = authService.getStoredUser();
            const storedToken = authService.getStoredToken();
            if (storedUser && storedToken) {
                setState({
                    user: storedUser,
                    isLoggedIn: true,
                    isLoading: false,
                    errorMessage: null,
                    token: storedToken,
                });
            }
        } else {
            setState({
                ...initialState,
                isLoading: false,
            });
        }
    }, []);

    // Update user from Firebase user
    const updateUserFromFirebase = useCallback(async (firebaseUser: FirebaseUser) => {
        const user = await authService.createUserFromFirebase(firebaseUser);
        const token = await firebaseUser.getIdToken();
        setState({
            user,
            isLoggedIn: true,
            isLoading: false,
            errorMessage: null,
            token,
        });
    }, []);

    // Sign in with email and password
    const signInWithEmailAndPassword = useCallback(async (email: string, password: string) => {
        setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));

        if (isDemoMode) {
            // Demo mode: simulate login
            demoLogin();
            return;
        }

        try {
            const firebaseUser = await authService.signInWithEmailAndPassword(email, password);
            await updateUserFromFirebase(firebaseUser);
            router.push('/home');
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                errorMessage: error.message || 'Sign in failed',
            }));
            throw error;
        }
    }, [router, updateUserFromFirebase, demoLogin]);

    // Register with email, password, and name
    const registerWithEmailAndPasswordAndName = useCallback(async (
        email: string,
        password: string,
        name: string
    ) => {
        setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));

        if (isDemoMode) {
            // Demo mode: simulate registration
            const demoUser: User = {
                id: 'demo-user-' + Date.now(),
                name: name,
                email: email,
                phone: '',
            };
            authService.saveUserSession(demoUser, 'demo-token');
            setState({
                user: demoUser,
                isLoggedIn: true,
                isLoading: false,
                errorMessage: null,
                token: 'demo-token',
            });
            router.push('/home');
            return;
        }

        try {
            const firebaseUser = await authService.createUserWithEmailAndPasswordAndName(email, password, name);
            await updateUserFromFirebase(firebaseUser);
            router.push('/home');
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                errorMessage: error.message || 'Registration failed',
            }));
            throw error;
        }
    }, [router, updateUserFromFirebase]);

    // Sign in with phone number
    const signInWithPhone = useCallback(async (
        phoneNumber: string,
        recaptchaContainerId: string
    ): Promise<ConfirmationResult | null> => {
        setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));

        if (isDemoMode) {
            // Demo mode: simulate phone auth - go directly to demo login
            setState((prev) => ({ ...prev, isLoading: false }));
            demoLogin();
            return null;
        }

        try {
            const recaptcha = authService.setupRecaptcha(recaptchaContainerId);
            const confirmationResult = await authService.verifyPhoneNumber(phoneNumber, recaptcha);
            setState((prev) => ({ ...prev, isLoading: false }));
            return confirmationResult;
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                errorMessage: error.message || 'Phone verification failed',
            }));
            return null;
        }
    }, [demoLogin]);

    // Confirm OTP
    const confirmOtp = useCallback(async (
        confirmationResult: ConfirmationResult,
        otp: string,
        userName?: string
    ) => {
        setState((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
        try {
            const firebaseUser = await authService.confirmOtp(confirmationResult, otp);
            if (userName) {
                await authService.updateUserDisplayName(userName);
                await firebaseUser.reload();
            }
            await updateUserFromFirebase(firebaseUser);
            router.push('/home');
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                errorMessage: error.message || 'OTP verification failed',
            }));
            throw error;
        }
    }, [router, updateUserFromFirebase]);

    // Clear error
    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, errorMessage: null }));
    }, []);

    const contextValue: AuthContextType = {
        ...state,
        login,
        logout,
        checkAuthStatus,
        signInWithEmailAndPassword,
        registerWithEmailAndPasswordAndName,
        signInWithPhone,
        confirmOtp,
        updateUserFromFirebase,
        demoLogin,
        clearError,
        isDemoMode,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;

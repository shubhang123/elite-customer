/** @jsxImportSource @emotion/react */
import React, { useState, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdArrowBack, MdDesignServices } from 'react-icons/md';
import { useAuth } from '@/state/AuthContext';
import { LoadingSpinner } from '@/components/StyledWidgets';
import * as styles from '@/styles/pages/login';

type LoginMode = 'email' | 'phone';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const { signInWithEmailAndPassword, signInWithPhone, isLoading, errorMessage, clearError } = useAuth();

    const [loginMode, setLoginMode] = useState<LoginMode>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; phone?: string }>({});

    const validateForm = (): boolean => {
        const errors: { email?: string; password?: string; phone?: string } = {};

        if (loginMode === 'email') {
            if (!email.trim()) {
                errors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.email = 'Please enter a valid email';
            }
            if (!password) {
                errors.password = 'Password is required';
            }
        } else {
            if (!phone.trim()) {
                errors.phone = 'Phone number is required';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) return;

        try {
            if (loginMode === 'email') {
                await signInWithEmailAndPassword(email, password);
            } else {
                const confirmationResult = await signInWithPhone(phone, 'recaptcha-container');
                if (confirmationResult) {
                    // Store confirmation result for OTP page
                    sessionStorage.setItem('phoneAuthConfirmation', JSON.stringify({
                        phoneNumber: phone,
                    }));
                    router.push(`/otp?phone=${encodeURIComponent(phone)}`);
                }
            }
        } catch (error) {
            // Error is handled by AuthContext
            console.error('Login error:', error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>Sign In - Elite Customer</title>
            </Head>
            <div css={styles.container}>
                <header css={styles.header}>
                    <button css={styles.backButton} onClick={handleBack} aria-label="Go back">
                        <MdArrowBack />
                    </button>
                </header>

                <div css={styles.content}>
                    <div css={styles.logoContainer}>
                        <MdDesignServices />
                    </div>

                    <h1 css={styles.title}>Sign In</h1>
                    <p css={styles.subtitle}>Welcome! Sign in or register to continue.</p>

                    {/* Login Mode Toggle */}
                    <div css={styles.segmentedControl}>
                        <button
                            css={[styles.segmentButton, loginMode === 'email' && styles.segmentButtonActive]}
                            onClick={() => setLoginMode('email')}
                            type="button"
                        >
                            Email
                        </button>
                        <button
                            css={[styles.segmentButton, loginMode === 'phone' && styles.segmentButtonActive]}
                            onClick={() => setLoginMode('phone')}
                            type="button"
                        >
                            Phone
                        </button>
                    </div>

                    <form css={styles.form} onSubmit={handleSubmit}>
                        {loginMode === 'email' ? (
                            <>
                                <div css={styles.inputGroup}>
                                    <label css={styles.label} htmlFor="email">Email</label>
                                    <input
                                        css={styles.input}
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                    />
                                    {formErrors.email && <span css={styles.errorText}>{formErrors.email}</span>}
                                </div>

                                <div css={styles.inputGroup}>
                                    <label css={styles.label} htmlFor="password">Password</label>
                                    <input
                                        css={styles.input}
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    {formErrors.password && <span css={styles.errorText}>{formErrors.password}</span>}
                                </div>
                            </>
                        ) : (
                            <div css={styles.inputGroup}>
                                <label css={styles.label} htmlFor="phone">Phone Number</label>
                                <input
                                    css={styles.input}
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 9876543210"
                                />
                                {formErrors.phone && <span css={styles.errorText}>{formErrors.phone}</span>}
                            </div>
                        )}

                        {errorMessage && <span css={styles.errorText}>{errorMessage}</span>}

                        <button
                            css={styles.submitButton}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <LoadingSpinner size={20} /> : loginMode === 'phone' ? 'Continue' : 'Login'}
                        </button>
                    </form>

                    <div css={styles.registerLink}>
                        <span>Don&apos;t have an account?</span>
                        <Link href="/register">Register</Link>
                    </div>

                    <p css={styles.privacyText}>
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>

                {/* reCAPTCHA container for phone auth */}
                <div id="recaptcha-container" />
            </div>
        </>
    );
};

export default LoginPage;

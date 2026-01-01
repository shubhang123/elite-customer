/** @jsxImportSource @emotion/react */
import React, { useState, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdArrowBack, MdDesignServices } from 'react-icons/md';
import { useAuth } from '@/state/AuthContext';
import { LoadingSpinner } from '@/components/StyledWidgets';
import * as styles from '@/styles/pages/login';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const { registerWithEmailAndPasswordAndName, signInWithPhone, isLoading, errorMessage, clearError } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();

        if (!validateForm()) return;

        try {
            await registerWithEmailAndPasswordAndName(email, password, name);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>Register - Elite Customer</title>
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

                    <h1 css={styles.title}>Create Account</h1>
                    <p css={styles.subtitle}>Sign up to get started with Elite.</p>

                    <form css={styles.form} onSubmit={handleSubmit}>
                        <div css={styles.inputGroup}>
                            <label css={styles.label} htmlFor="name">Name</label>
                            <input
                                css={styles.input}
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                            />
                            {formErrors.name && <span css={styles.errorText}>{formErrors.name}</span>}
                        </div>

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
                                placeholder="Create a password"
                            />
                            {formErrors.password && <span css={styles.errorText}>{formErrors.password}</span>}
                        </div>

                        <div css={styles.inputGroup}>
                            <label css={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                css={styles.input}
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                            />
                            {formErrors.confirmPassword && <span css={styles.errorText}>{formErrors.confirmPassword}</span>}
                        </div>

                        {errorMessage && <span css={styles.errorText}>{errorMessage}</span>}

                        <button css={styles.submitButton} type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner size={20} /> : 'Create Account'}
                        </button>
                    </form>

                    <div css={styles.registerLink}>
                        <span>Already have an account?</span>
                        <Link href="/login">Sign In</Link>
                    </div>

                    <p css={styles.privacyText}>
                        By creating an account, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;

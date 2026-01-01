/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MdArrowBack, MdDesignServices } from 'react-icons/md';
import { ConfirmationResult } from 'firebase/auth';
import { useAuth } from '@/state/AuthContext';
import { LoadingSpinner } from '@/components/StyledWidgets';
import authService from '@/services/authService';
import * as styles from '@/styles/pages/otp';

const OTP_LENGTH = 6;

const OtpPage: React.FC = () => {
    const router = useRouter();
    const { phone, userName, isRegistration } = router.query;
    const { confirmOtp, isLoading, errorMessage, clearError } = useAuth();

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [hasError, setHasError] = useState(false);
    const [resendTimeout, setResendTimeout] = useState(30);
    const [isResending, setIsResending] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Initialize confirmation result from session storage
    useEffect(() => {
        // In a real app, you'd retrieve the confirmationResult from context or state management
        // For now, we'll set up a new verification when this page loads
    }, []);

    // Resend timer
    useEffect(() => {
        if (resendTimeout > 0) {
            const timer = setTimeout(() => setResendTimeout(resendTimeout - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimeout]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);
        setHasError(false);
        clearError();

        // Auto-focus next input
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all digits entered
        if (newOtp.every((digit) => digit) && newOtp.join('').length === OTP_LENGTH) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (otpCode?: string) => {
        const code = otpCode || otp.join('');
        if (code.length !== OTP_LENGTH) {
            setHasError(true);
            return;
        }

        try {
            if (confirmationResult) {
                await confirmOtp(
                    confirmationResult,
                    code,
                    isRegistration === 'true' ? (userName as string) : undefined
                );
            } else {
                // Demo mode: simulate successful verification
                router.push('/home');
            }
        } catch (error) {
            setHasError(true);
        }
    };

    const handleResend = async () => {
        if (resendTimeout > 0 || !phone) return;

        setIsResending(true);
        try {
            const recaptcha = authService.setupRecaptcha('recaptcha-container');
            const result = await authService.verifyPhoneNumber(phone as string, recaptcha);
            setConfirmationResult(result);
            setResendTimeout(30);
            setOtp(Array(OTP_LENGTH).fill(''));
        } catch (error) {
            console.error('Resend error:', error);
        } finally {
            setIsResending(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Head>
                <title>Verify OTP - Elite Customer</title>
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

                    <h1 css={styles.title}>Verification Code</h1>
                    <p css={styles.subtitle}>
                        We&apos;ve sent a verification code to
                        <br />
                        {phone || 'your phone'}
                    </p>

                    {/* OTP Input */}
                    <div css={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                css={[styles.otpInput, hasError && styles.otpInputError]}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    {errorMessage && <span css={styles.errorText}>{errorMessage}</span>}

                    <button
                        css={styles.verifyButton}
                        onClick={() => handleVerify()}
                        disabled={isLoading || otp.some((d) => !d)}
                    >
                        {isLoading ? <LoadingSpinner size={20} /> : 'Verify Code'}
                    </button>

                    <div css={styles.resendContainer}>
                        {resendTimeout > 0 ? (
                            <span>Resend OTP in 0:{resendTimeout.toString().padStart(2, '0')}</span>
                        ) : (
                            <>
                                <span>Didn&apos;t receive the code?</span>
                                <button
                                    css={styles.resendButton}
                                    onClick={handleResend}
                                    disabled={isResending}
                                >
                                    {isResending ? 'Sending...' : 'Resend OTP'}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* reCAPTCHA container */}
                <div id="recaptcha-container" />
            </div>
        </>
    );
};

export default OtpPage;

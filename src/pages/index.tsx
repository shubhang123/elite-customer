/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    MdPhone,
    MdStarOutline,
    MdAccessTime,
    MdChatBubbleOutline,
} from 'react-icons/md';
import { useAuth } from '@/state/AuthContext';
import * as styles from '@/styles/pages/index';

const WelcomePage: React.FC = () => {
    const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            router.replace('/home');
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return (
            <div css={styles.container}>
                <div css={styles.background} />
                <div css={styles.content}>
                    <div css={styles.logoSection}>
                        <div css={{ color: 'white' }}>Loading...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (isLoggedIn) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Elite Customer - Your Premium Design Partner</title>
            </Head>
            <div css={styles.container}>
                <div css={styles.background} />
                <div css={styles.content}>
                    {/* Logo Section */}
                    <div css={styles.logoSection}>
                        <Image
                            src="/logo.png"
                            alt="Elite Logo"
                            width={180}
                            height={180}
                            css={styles.logo}
                            priority
                        />
                        <h1 css={styles.title}>Welcome to Elite</h1>
                        <p css={styles.subtitle}>Your Premium Design Partner</p>
                    </div>

                    {/* Features Section */}
                    <div css={styles.featuresSection}>
                        <div css={styles.featureItem}>
                            <MdStarOutline />
                            <span>Premium Design Service</span>
                        </div>
                        <div css={styles.featureItem}>
                            <MdAccessTime />
                            <span>Real-time Progress Tracking</span>
                        </div>
                        <div css={styles.featureItem}>
                            <MdChatBubbleOutline />
                            <span>Direct Designer Communication</span>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div css={styles.actionsSection}>
                        <Link href="/login" css={styles.primaryButton}>
                            <MdPhone />
                            Continue with Phone
                        </Link>
                        <button css={styles.helpButton}>Need Help?</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WelcomePage;

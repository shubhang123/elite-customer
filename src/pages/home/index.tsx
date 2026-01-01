/** @jsxImportSource @emotion/react */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
    MdLocalShipping,
    MdTimeline,
    MdChatBubbleOutline,
    MdPayment,
    MdNotifications,
    MdSchedule,
    MdArrowForward,
} from 'react-icons/md';
import Layout from '@/components/Layout';
import AppBar from '@/components/AppBar';
import AuthWrapper from '@/components/AuthWrapper';
import { useAppState } from '@/state/AppStateContext';
import * as styles from '@/styles/pages/home';

const iconMap: Record<string, React.ReactNode> = {
    MdTimeline: <MdTimeline css={styles.featureIcon} />,
    MdChatBubbleOutline: <MdChatBubbleOutline css={styles.featureIcon} />,
    MdPayment: <MdPayment css={styles.featureIcon} />,
    MdNotifications: <MdNotifications css={styles.featureIcon} />,
};

const HomePage: React.FC = () => {
    const { user, jobSummary, features, progressSteps, paymentSummary, notifications } = useAppState();

    // Calculate progress
    const completedSteps = progressSteps.filter((s) => s.status === 'done').length;
    const progress = progressSteps.length > 0
        ? Math.round((completedSteps / progressSteps.length) * 100)
        : 0;

    return (
        <AuthWrapper>
            <Head>
                <title>Home - Elite Customer</title>
            </Head>
            <Layout>
                <div css={styles.pageWrapper}>
                    <AppBar
                        title=""
                        showBackButton={false}
                        additionalActions={
                            <div css={styles.logoContainer}>
                                <Image src="/logo.png" alt="Elite Logo" width={28} height={28} />
                            </div>
                        }
                    />

                    <div css={styles.container}>
                        {/* Header */}
                        <div css={styles.header}>
                            <div css={styles.greeting}>Welcome back,</div>
                            {user && <div css={styles.userName}>{user.name}</div>}
                        </div>

                        {/* Job Status Hero Card */}
                        {jobSummary && (
                            <div css={styles.jobCard}>
                                <div css={styles.jobCardBackground} />
                                <div css={styles.jobCardContent}>
                                    <div css={styles.jobInfo}>
                                        <div css={styles.jobStatusBadge}>
                                            <span css={styles.statusDot} />
                                            Active Order
                                        </div>
                                        <div css={styles.jobStatus}>{jobSummary.status}</div>
                                        <div css={styles.jobDelivery}>
                                            <MdSchedule />
                                            Est. Delivery: {jobSummary.estimatedDelivery}
                                        </div>
                                    </div>
                                    <div css={styles.jobIconContainer}>
                                        <MdLocalShipping />
                                    </div>
                                </div>
                                <div css={styles.progressContainer}>
                                    <div css={styles.progressBar}>
                                        <div css={styles.progressFill} style={{ width: `${progress}%` }} />
                                    </div>
                                    <div css={styles.progressLabel}>
                                        <span>{completedSteps} of {progressSteps.length} steps completed</span>
                                        <span>{progress}%</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Stats */}
                        <div css={styles.statsRow}>
                            <div css={styles.statCard}>
                                <div css={styles.statValue}>
                                    {paymentSummary?.due ? `€${paymentSummary.due.toLocaleString()}` : '€0'}
                                </div>
                                <div css={styles.statLabel}>Amount Due</div>
                            </div>
                            <div css={styles.statCard}>
                                <div css={styles.statValue}>{notifications.length}</div>
                                <div css={styles.statLabel}>Notifications</div>
                            </div>
                            <div css={styles.statCard}>
                                <div css={styles.statValue}>{progress}%</div>
                                <div css={styles.statLabel}>Progress</div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <h2 css={styles.sectionTitle}>Quick Actions</h2>

                        {features.length > 0 && (
                            <div css={styles.featuresGrid}>
                                {features.map((feature, index) => (
                                    <Link
                                        key={index}
                                        href={feature.route}
                                        css={styles.featureCard}
                                    >
                                        <div css={styles.featureIconWrapper}>
                                            {iconMap[feature.icon] || <MdTimeline css={styles.featureIcon} />}
                                            {feature.icon === 'MdNotifications' && notifications.length > 0 && (
                                                <span css={styles.notificationBadge}>{notifications.length}</span>
                                            )}
                                        </div>
                                        <span css={styles.featureLabel}>{feature.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </AuthWrapper>
    );
};

export default HomePage;

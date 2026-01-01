/** @jsxImportSource @emotion/react */
import React from 'react';
import Head from 'next/head';
import {
    MdDesignServices,
    MdPayment,
    MdLocalShipping,
    MdNotifications,
} from 'react-icons/md';
import Layout from '@/components/Layout';
import AppBar from '@/components/AppBar';
import AuthWrapper from '@/components/AuthWrapper';
import { useAppState } from '@/state/AppStateContext';
import * as styles from '@/styles/pages/notifications';

const iconMap: Record<string, React.ReactNode> = {
    MdDesignServices: <MdDesignServices />,
    MdPayment: <MdPayment />,
    MdLocalShipping: <MdLocalShipping />,
};

const NotificationsPage: React.FC = () => {
    const { notifications } = useAppState();

    return (
        <AuthWrapper>
            <Head>
                <title>Notifications - Elite Customer</title>
            </Head>
            <Layout>
                <AppBar title="Notifications" />

                <div css={styles.container}>
                    {notifications.length === 0 ? (
                        <div css={styles.emptyState}>
                            <MdNotifications />
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        <div css={styles.list}>
                            {notifications.map((notification, index) => (
                                <div key={index} css={styles.card}>
                                    <div css={styles.iconContainer}>
                                        {iconMap[notification.icon] || <MdNotifications />}
                                    </div>
                                    <div css={styles.content}>
                                        <div css={styles.message}>{notification.message}</div>
                                        <div css={styles.date}>{notification.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Layout>
        </AuthWrapper>
    );
};

export default NotificationsPage;

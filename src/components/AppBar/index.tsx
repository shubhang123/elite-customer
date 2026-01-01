/** @jsxImportSource @emotion/react */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdArrowBack, MdNotifications } from 'react-icons/md';
import { useAppState } from '@/state/AppStateContext';
import * as styles from './styles';

interface AppBarProps {
    title?: string;
    showBackButton?: boolean;
    additionalActions?: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({
    title = '',
    showBackButton = true,
    additionalActions,
}) => {
    const router = useRouter();
    const { notifications } = useAppState();
    const hasNotifications = notifications.length > 0;

    const handleBack = () => {
        router.push('/home');
    };

    return (
        <header css={styles.appBarContainer}>
            <div css={styles.appBarLeft}>
                {showBackButton && (
                    <button css={styles.backButton} onClick={handleBack} aria-label="Go back">
                        <MdArrowBack />
                    </button>
                )}
                {additionalActions}
                {title && <h1 css={styles.appBarTitle}>{title}</h1>}
            </div>
            <div css={styles.appBarRight}>
                <Link href="/notifications" css={styles.notificationButton} aria-label="Notifications">
                    <MdNotifications />
                    {hasNotifications && <span css={styles.notificationBadge} />}
                </Link>
            </div>
        </header>
    );
};

export default AppBar;

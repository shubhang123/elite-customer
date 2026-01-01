/** @jsxImportSource @emotion/react */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    MdHome,
    MdTimeline,
    MdChatBubble,
    MdPayment,
    MdPerson,
} from 'react-icons/md';
import { useAppState } from '@/state/AppStateContext';
import * as styles from './styles';

interface NavItem {
    path: string;
    label: string;
    icon: React.ReactNode;
    showBadge?: boolean;
}

const navItems: NavItem[] = [
    { path: '/home', label: 'Home', icon: <MdHome /> },
    { path: '/progress', label: 'Progress', icon: <MdTimeline /> },
    { path: '/chat', label: 'Chat', icon: <MdChatBubble />, showBadge: true },
    { path: '/payments', label: 'Payments', icon: <MdPayment /> },
    { path: '/profile', label: 'Profile', icon: <MdPerson /> },
];

const BottomNavBar: React.FC = () => {
    const router = useRouter();
    const { notifications } = useAppState();
    const hasNotifications = notifications.length > 0;

    return (
        <nav css={styles.navContainer}>
            <div css={styles.navInner}>
                {navItems.map((item) => {
                    const isActive = router.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            css={[styles.navItem, isActive && styles.navItemActive]}
                        >
                            <span css={[styles.navIndicator, isActive && styles.navIndicatorActive]} />
                            {item.icon}
                            <span css={styles.navLabel}>{item.label}</span>
                            {item.showBadge && hasNotifications && <span css={styles.notificationDot} />}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavBar;

/** @jsxImportSource @emotion/react */
import React from 'react';
import BottomNavBar from '@/components/BottomNavBar';
import * as styles from './styles';

interface LayoutProps {
    children: React.ReactNode;
    showBottomNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBottomNav = true }) => {
    return (
        <div css={styles.layoutContainer}>
            <main css={styles.layoutContent}>
                <div css={styles.pageContainer}>
                    {children}
                </div>
            </main>
            {showBottomNav && <BottomNavBar />}
        </div>
    );
};

export default Layout;

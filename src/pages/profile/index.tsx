/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Head from 'next/head';
import {
    MdPerson,
    MdNotifications,
    MdHelp,
    MdInfo,
    MdLogout,
    MdChevronRight,
    MdEdit,
    MdClose,
} from 'react-icons/md';
import Layout from '@/components/Layout';
import AppBar from '@/components/AppBar';
import AuthWrapper from '@/components/AuthWrapper';
import { useAuth } from '@/state/AuthContext';
import { useAppState } from '@/state/AppStateContext';
import * as styles from '@/styles/pages/profile';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const { notifications } = useAppState();
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [showFAQModal, setShowFAQModal] = useState(false);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <AuthWrapper>
            <Head>
                <title>Profile - Elite Customer</title>
            </Head>
            <Layout>
                <div css={styles.pageWrapper}>
                    <AppBar title="Profile" showBackButton={false} />

                    <div css={styles.container}>
                        {/* Profile Header */}
                        <div css={styles.profileHeader}>
                            <div css={styles.avatarContainer}>
                                <div css={styles.avatar}>
                                    <MdPerson />
                                </div>
                                <button css={styles.editAvatarButton}>
                                    <MdEdit />
                                </button>
                            </div>
                            <div css={styles.userName}>{user?.name || 'Guest'}</div>
                            <div css={styles.userEmail}>{user?.email || 'Not signed in'}</div>
                        </div>

                        {/* Account Section */}
                        <div css={styles.menuSection}>
                            <div css={styles.sectionTitle}>Account</div>
                            <div css={styles.menuCard}>
                                <div css={styles.menuItem}>
                                    <div css={styles.menuIcon}>
                                        <MdPerson />
                                    </div>
                                    <div css={styles.menuContent}>
                                        <div css={styles.menuLabel}>Edit Profile</div>
                                        <div css={styles.menuDescription}>Update your personal details</div>
                                    </div>
                                    <div css={styles.menuArrow}>
                                        <MdChevronRight />
                                    </div>
                                </div>
                                <div css={styles.menuItem}>
                                    <div css={styles.menuIcon}>
                                        <MdNotifications />
                                    </div>
                                    <div css={styles.menuContent}>
                                        <div css={styles.menuLabel}>Notifications</div>
                                        <div css={styles.menuDescription}>{notifications.length} unread</div>
                                    </div>
                                    <div css={styles.menuArrow}>
                                        <MdChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div css={styles.menuSection}>
                            <div css={styles.sectionTitle}>Support</div>
                            <div css={styles.menuCard}>
                                <div css={styles.menuItem} onClick={() => setShowSupportModal(true)}>
                                    <div css={styles.menuIcon}>
                                        <MdHelp />
                                    </div>
                                    <div css={styles.menuContent}>
                                        <div css={styles.menuLabel}>Contact Support</div>
                                        <div css={styles.menuDescription}>Get help with your order</div>
                                    </div>
                                    <div css={styles.menuArrow}>
                                        <MdChevronRight />
                                    </div>
                                </div>
                                <div css={styles.menuItem} onClick={() => setShowFAQModal(true)}>
                                    <div css={styles.menuIcon}>
                                        <MdInfo />
                                    </div>
                                    <div css={styles.menuContent}>
                                        <div css={styles.menuLabel}>FAQ</div>
                                        <div css={styles.menuDescription}>Frequently asked questions</div>
                                    </div>
                                    <div css={styles.menuArrow}>
                                        <MdChevronRight />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logout */}
                        <div css={styles.menuSection}>
                            <div css={styles.menuCard}>
                                <div css={styles.menuItem} onClick={handleLogout}>
                                    <div css={styles.dangerIcon}>
                                        <MdLogout />
                                    </div>
                                    <div css={styles.menuContent}>
                                        <div css={styles.dangerLabel}>Sign Out</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div css={styles.versionInfo}>
                            Elite Customer v1.0.0
                        </div>
                    </div>
                </div>
            </Layout>

            {/* Support Modal */}
            {showSupportModal && (
                <div css={styles.modal} onClick={() => setShowSupportModal(false)}>
                    <div css={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={styles.modalHeader}>
                            <div css={styles.modalTitle}>Contact Support</div>
                            <button css={styles.modalClose} onClick={() => setShowSupportModal(false)}>
                                <MdClose />
                            </button>
                        </div>
                        <div css={styles.modalBody}>
                            <p><strong>Email:</strong> support@elite.com</p>
                            <p><strong>Phone:</strong> +91 1800-123-4567</p>
                            <p><strong>Hours:</strong> Mon-Sat, 9 AM - 6 PM IST</p>
                            <p style={{ marginTop: 16 }}>
                                Our team typically responds within 24 hours. For urgent issues, please call us directly.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* FAQ Modal */}
            {showFAQModal && (
                <div css={styles.modal} onClick={() => setShowFAQModal(false)}>
                    <div css={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={styles.modalHeader}>
                            <div css={styles.modalTitle}>FAQ</div>
                            <button css={styles.modalClose} onClick={() => setShowFAQModal(false)}>
                                <MdClose />
                            </button>
                        </div>
                        <div css={styles.modalBody}>
                            <p><strong>How do I track my order?</strong></p>
                            <p>Go to the Progress tab to see your order status and timeline.</p>
                            <br />
                            <p><strong>How do I approve a design?</strong></p>
                            <p>When your designer sends a design, you'll see it in the Chat tab with approval buttons.</p>
                            <br />
                            <p><strong>How do I make a payment?</strong></p>
                            <p>Visit the Payments tab to view your balance and make payments securely.</p>
                        </div>
                    </div>
                </div>
            )}
        </AuthWrapper>
    );
};

export default ProfilePage;

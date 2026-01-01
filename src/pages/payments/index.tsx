/** @jsxImportSource @emotion/react */
import React from 'react';
import Head from 'next/head';
import {
    MdPayment,
    MdCheckCircle,
    MdPending,
    MdReceipt,
} from 'react-icons/md';
import Layout from '@/components/Layout';
import AppBar from '@/components/AppBar';
import AuthWrapper from '@/components/AuthWrapper';
import { useAppState } from '@/state/AppStateContext';
import { PaymentStatus } from '@/types';
import * as styles from '@/styles/pages/payments';

const PaymentsPage: React.FC = () => {
    const { paymentSummary, paymentHistory } = useAppState();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: string | Date) => {
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(dateObj.getTime())) return 'Date unavailable';
            return new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }).format(dateObj);
        } catch {
            return 'Date unavailable';
        }
    };

    return (
        <AuthWrapper>
            <Head>
                <title>Payments - Elite Customer</title>
            </Head>
            <Layout>
                <div css={styles.pageWrapper}>
                    <AppBar title="Payments" />

                    <div css={styles.container}>
                        {/* Summary Card */}
                        {paymentSummary && (
                            <div css={styles.summaryCard}>
                                <div css={styles.summaryRow}>
                                    <div>
                                        <div css={styles.summaryLabel}>Amount Due</div>
                                        <div css={styles.summaryValue}>
                                            {formatCurrency(paymentSummary.due)}
                                        </div>
                                    </div>
                                </div>
                                <div css={styles.summaryRow}>
                                    <div>
                                        <div css={styles.summaryLabel}>Total Paid</div>
                                        <div css={styles.summarySmallValue}>
                                            {formatCurrency(paymentSummary.paid)}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div css={styles.summaryLabel}>Order Total</div>
                                        <div css={styles.summarySmallValue}>
                                            {formatCurrency(paymentSummary.total)}
                                        </div>
                                    </div>
                                </div>
                                <button css={styles.payButton}>
                                    <MdPayment /> Pay Now
                                </button>
                            </div>
                        )}

                        {/* Payment History */}
                        <div css={styles.section}>
                            <h2 css={styles.sectionTitle}>Payment History</h2>

                            {paymentHistory.length > 0 ? (
                                <div css={styles.historyList}>
                                    {paymentHistory.map((payment, index) => (
                                        <div key={index} css={styles.historyItem}>
                                            <div css={[
                                                styles.historyIcon,
                                                payment.status === PaymentStatus.Paid
                                                    ? styles.historyIconSuccess
                                                    : styles.historyIconPending
                                            ]}>
                                                {payment.status === PaymentStatus.Paid
                                                    ? <MdCheckCircle />
                                                    : <MdPending />
                                                }
                                            </div>
                                            <div css={styles.historyContent}>
                                                <div css={styles.historyTitle}>
                                                    {payment.status === PaymentStatus.Paid ? 'Payment Received' : 'Payment Due'}
                                                </div>
                                                <div css={styles.historyDate}>
                                                    {formatDate(payment.date)}
                                                </div>
                                            </div>
                                            <div css={styles.historyAmount}>
                                                {formatCurrency(payment.amount)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div css={styles.emptyState}>
                                    <div css={styles.emptyIcon}>
                                        <MdReceipt />
                                    </div>
                                    <div css={styles.emptyTitle}>No payments yet</div>
                                    <div css={styles.emptyText}>
                                        Your payment history will appear here
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </AuthWrapper>
    );
};

export default PaymentsPage;

/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MdCheck } from 'react-icons/md';
import Layout from '@/components/Layout';
import AppBar from '@/components/AppBar';
import AuthWrapper from '@/components/AuthWrapper';
import { useAppState } from '@/state/AppStateContext';
import { LoadingSpinner } from '@/components/StyledWidgets';
import { supabaseJobsService, Job, TimelineEntry } from '@/services/supabaseJobsService';
import * as styles from '@/styles/pages/progress';

const ProgressPage: React.FC = () => {
    const { progressSteps, jobSummary, jobId } = useAppState();
    const [job, setJob] = useState<Job | null>(null);
    const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load job and timeline from Supabase
    useEffect(() => {
        const loadJobData = async () => {
            if (supabaseJobsService.isConfigured()) {
                setIsLoading(true);
                const { data, error } = await supabaseJobsService.getJob(jobId);
                if (data && !error) {
                    setJob(data);
                    setTimeline(data.timeline || []);
                }
                setIsLoading(false);
            } else {
                // Use demo data
                setIsLoading(false);
            }
        };
        loadJobData();
    }, [jobId]);

    // Calculate progress from timeline
    const getProgressFromTimeline = () => {
        if (timeline.length === 0) return { completed: 0, total: 0, percentage: 0 };

        // Define expected stages
        const stages = ['receptionist', 'salesperson', 'design', 'production', 'printing', 'accounts', 'completed'];
        const currentStatus = job?.status?.toLowerCase() || '';
        const currentIndex = stages.findIndex(s => currentStatus.includes(s));

        return {
            completed: currentIndex >= 0 ? currentIndex + 1 : 0,
            total: stages.length,
            percentage: currentIndex >= 0 ? Math.round(((currentIndex + 1) / stages.length) * 100) : 0
        };
    };

    const progress = supabaseJobsService.isConfigured()
        ? getProgressFromTimeline()
        : {
            completed: progressSteps.filter((s) => s.status === 'done').length,
            total: progressSteps.length,
            percentage: progressSteps.length > 0
                ? Math.round((progressSteps.filter((s) => s.status === 'done').length / progressSteps.length) * 100)
                : 0
        };

    const formatDate = (date: string | Date | undefined) => {
        if (!date) return 'Pending';
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(dateObj.getTime())) return 'Pending';
            return new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }).format(dateObj);
        } catch {
            return 'Pending';
        }
    };

    if (isLoading) {
        return (
            <AuthWrapper>
                <Head>
                    <title>Progress - Elite Customer</title>
                </Head>
                <Layout>
                    <div css={styles.pageWrapper}>
                        <AppBar title="Order Progress" />
                        <div css={styles.container}>
                            <div css={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                                <LoadingSpinner size={40} />
                            </div>
                        </div>
                    </div>
                </Layout>
            </AuthWrapper>
        );
    }

    // Use Supabase timeline if available, else use demo data
    const displayTimeline = timeline.length > 0 ? timeline : progressSteps.map(step => ({
        status: step.label,
        timestamp: step.date,
        note: step.description
    }));

    return (
        <AuthWrapper>
            <Head>
                <title>Progress - Elite Customer</title>
            </Head>
            <Layout>
                <div css={styles.pageWrapper}>
                    <AppBar title="Order Progress" />

                    <div css={styles.container}>
                        {/* Status Overview Card */}
                        <div css={styles.statusCard}>
                            <div css={styles.statusRow}>
                                <div>
                                    <div css={styles.statusLabel}>Current Status</div>
                                    <div css={styles.statusValue}>
                                        {job?.status || jobSummary?.status || 'Processing'}
                                    </div>
                                </div>
                                <div css={styles.statusBadge}>
                                    <span css={styles.statusDot} />
                                    {job?.status || 'In Progress'}
                                </div>
                            </div>

                            {job?.job_code && (
                                <div css={styles.jobCodeRow}>
                                    <span css={styles.jobCodeLabel}>Job Code:</span>
                                    <span css={styles.jobCodeValue}>{job.job_code}</span>
                                </div>
                            )}

                            <div css={styles.progressContainer}>
                                <div css={styles.progressBar}>
                                    <div css={styles.progressFill} style={{ width: `${progress.percentage}%` }} />
                                </div>
                                <div css={styles.progressLabel}>
                                    <span>{progress.completed} of {progress.total} completed</span>
                                    <span>{progress.percentage}%</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div css={styles.section}>
                            <h2 css={styles.sectionTitle}>Timeline</h2>

                            <div css={styles.timeline}>
                                {displayTimeline.map((entry, index) => {
                                    const isCompleted = index < progress.completed;
                                    const isCurrent = index === progress.completed - 1;

                                    return (
                                        <div key={index} css={styles.timelineItem}>
                                            <div css={[
                                                styles.timelineDot,
                                                isCompleted && styles.timelineDotDone,
                                                isCurrent && styles.timelineDotActive,
                                            ]}>
                                                <MdCheck />
                                            </div>
                                            <div css={[
                                                styles.timelineContent,
                                                isCurrent && styles.timelineContentActive,
                                            ]}>
                                                <div css={styles.timelineTitle}>
                                                    {'status' in entry ? entry.status : (entry as any).label}
                                                </div>
                                                <div css={styles.timelineDate}>
                                                    {formatDate('timestamp' in entry ? entry.timestamp : (entry as any).date)}
                                                </div>
                                                {('note' in entry && entry.note) && (
                                                    <div css={styles.timelineDescription}>
                                                        {entry.note}
                                                    </div>
                                                )}
                                                {('description' in entry && (entry as any).description) && (
                                                    <div css={styles.timelineDescription}>
                                                        {(entry as any).description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </AuthWrapper>
    );
};

export default ProgressPage;

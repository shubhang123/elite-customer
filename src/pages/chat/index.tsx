/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
    MdSend,
    MdDesignServices,
    MdChatBubble,
    MdDoneAll,
    MdImage,
    MdFolder,
    MdClose,
    MdZoomIn,
    MdThumbUp,
    MdThumbDown,
} from 'react-icons/md';
import AuthWrapper from '@/components/AuthWrapper';
import BottomNavBar from '@/components/BottomNavBar';
import { useAppState } from '@/state/AppStateContext';
import { useAuth } from '@/state/AuthContext';
import { MessageSender, ChatMessage } from '@/types';
import { supabaseChatService } from '@/services/supabaseChatService';
import { LoadingSpinner } from '@/components/StyledWidgets';
import * as styles from '@/styles/pages/chat';

const QUICK_REPLIES = [
    '👍 Looks great!',
    'When will it be ready?',
    'Can we schedule a call?',
];

const ChatPage: React.FC = () => {
    const { chatMessages, addChatMessage, jobId } = useAppState();
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
    const messageListRef = useRef<HTMLDivElement>(null);

    // Load messages from Supabase on mount
    useEffect(() => {
        const loadMessages = async () => {
            if (supabaseChatService.isConfigured()) {
                setIsLoading(true);
                const { data, error } = await supabaseChatService.getMessages(jobId);
                if (data && !error) {
                    setMessages(data);
                } else {
                    setMessages(chatMessages);
                }
                setIsLoading(false);
            } else {
                setMessages(chatMessages);
                setIsLoading(false);
            }
        };
        loadMessages();
    }, [jobId, chatMessages]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!supabaseChatService.isConfigured()) return;

        const unsubscribe = supabaseChatService.subscribeToMessages(jobId, (newMessage) => {
            if (newMessage.sender !== MessageSender.Customer) {
                setMessages(prev => [...prev, newMessage]);
            }
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [jobId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTo({
                top: messageListRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSend = async (e?: FormEvent, quickReply?: string) => {
        e?.preventDefault();
        const textToSend = quickReply || message.trim();
        if (!textToSend || isSending) return;

        setIsSending(true);

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            text: textToSend,
            sender: MessageSender.Customer,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage('');

        if (supabaseChatService.isConfigured()) {
            const { error } = await supabaseChatService.sendMessage(
                jobId,
                user?.id || 'guest',
                user?.name || 'Guest',
                textToSend
            );
            if (error) {
                console.error('Failed to send message:', error);
            }
        } else {
            addChatMessage(newMessage);
        }

        setIsSending(false);
    };

    const handleQuickReply = (reply: string) => {
        handleSend(undefined, reply);
    };

    const handleApprove = async (msgId: string) => {
        const approvalText = '✅ Design Approved! Looking forward to the final version.';

        const approvalMessage: ChatMessage = {
            id: Date.now().toString(),
            text: approvalText,
            sender: MessageSender.Customer,
            timestamp: new Date(),
        };

        // Add locally immediately
        setMessages(prev => [...prev, approvalMessage]);

        // Send to Supabase
        if (supabaseChatService.isConfigured()) {
            const { error } = await supabaseChatService.sendMessage(
                jobId,
                user?.id || 'guest',
                user?.name || 'Guest',
                approvalText
            );
            if (error) {
                console.error('Failed to save approval to Supabase:', error);
            }
        }
    };

    const handleRequestChanges = (msgId: string) => {
        setSelectedDesignId(msgId);
        setShowFeedbackModal(true);
    };

    const handleSubmitFeedback = async () => {
        if (!feedbackText.trim()) return;

        const feedbackTextContent = `📝 Feedback on design:\n\n${feedbackText}`;

        const feedbackMessage: ChatMessage = {
            id: Date.now().toString(),
            text: feedbackTextContent,
            sender: MessageSender.Customer,
            timestamp: new Date(),
        };

        // Add locally immediately
        setMessages(prev => [...prev, feedbackMessage]);
        setShowFeedbackModal(false);
        setFeedbackText('');
        setSelectedDesignId(null);

        // Send to Supabase
        if (supabaseChatService.isConfigured()) {
            const { error } = await supabaseChatService.sendMessage(
                jobId,
                user?.id || 'guest',
                user?.name || 'Guest',
                feedbackTextContent
            );
            if (error) {
                console.error('Failed to save feedback to Supabase:', error);
            }
        }
    };

    const renderMessage = (msg: ChatMessage, index: number) => {
        const isCustomer = msg.sender === MessageSender.Customer;
        const showDesignApproval = msg.isDesignPreview && msg.imageUrl && !isCustomer;

        // Render design preview as a premium card
        if (showDesignApproval) {
            return (
                <div key={msg.id || index} css={styles.designPreviewCard}>
                    {/* Header */}
                    <div css={styles.designPreviewHeader}>
                        <div css={styles.designPreviewHeaderLeft}>
                            <div css={styles.designPreviewIcon}>
                                <MdDesignServices />
                            </div>
                            <div css={styles.designPreviewTitleWrapper}>
                                <div css={styles.designPreviewTitle}>Design Preview</div>
                                <div css={styles.designPreviewSubtitle}>Ready for review</div>
                            </div>
                        </div>
                        <div css={styles.designVersionBadge}>v1.0</div>
                    </div>

                    {/* Image */}
                    <div css={styles.designImageContainer} onClick={() => setExpandedImage(msg.imageUrl!)}>
                        <Image
                            src={msg.imageUrl!}
                            alt="Design preview"
                            width={340}
                            height={200}
                            style={{ objectFit: 'cover', width: '100%' }}
                        />
                        <div css={styles.zoomOverlay} className="zoom-overlay">
                            <MdZoomIn />
                            <span>Click to expand</span>
                        </div>
                    </div>

                    {/* Info row */}
                    <div css={styles.designPreviewInfo}>
                        <div css={styles.designInfoRow}>
                            <span css={styles.designInfoLabel}>Sent</span>
                            <span css={styles.designInfoValue}>
                                {formatTime(msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp))}
                            </span>
                        </div>
                        <div css={styles.pendingBadge}>
                            ⏳ Pending Approval
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div css={styles.designPreviewFooter}>
                        <button css={styles.approveButton} onClick={() => handleApprove(msg.id)}>
                            <MdThumbUp /> Approve Design
                        </button>
                        <button css={styles.requestChangesButton} onClick={() => handleRequestChanges(msg.id)}>
                            <MdThumbDown /> Request Changes
                        </button>
                    </div>
                </div>
            );
        }

        // Regular message bubble
        return (
            <div
                key={msg.id || index}
                css={[styles.messageRow, isCustomer && styles.messageRowCustomer]}
            >
                {!isCustomer && (
                    <div css={styles.avatarSmall}>
                        <MdDesignServices />
                    </div>
                )}
                <div css={[styles.messageBubble, isCustomer ? styles.messageBubbleCustomer : styles.messageBubbleDesigner]}>
                    {msg.imageUrl && !msg.isDesignPreview && (
                        <div css={styles.messageImage} onClick={() => setExpandedImage(msg.imageUrl!)}>
                            <Image
                                src={msg.imageUrl}
                                alt="Shared image"
                                width={240}
                                height={180}
                                style={{ objectFit: 'cover', borderRadius: '12px' }}
                            />
                            <div css={styles.imageOverlay}>
                                <MdZoomIn />
                            </div>
                        </div>
                    )}
                    {msg.text && <div css={styles.messageText}>{msg.text}</div>}
                    <div css={styles.messageTime}>
                        {formatTime(msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp))}
                        {isCustomer && <MdDoneAll css={styles.readReceipt} />}
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <AuthWrapper>
                <Head>
                    <title>Chat - Elite Customer</title>
                </Head>
                <div css={styles.pageWrapper}>
                    <div css={styles.loadingContainer}>
                        <LoadingSpinner size={40} />
                    </div>
                </div>
            </AuthWrapper>
        );
    }

    return (
        <AuthWrapper>
            <Head>
                <title>Chat - Elite Customer</title>
            </Head>
            <div css={styles.pageWrapper}>
                {/* Header */}
                <div css={styles.chatHeader}>
                    <div css={styles.designerAvatar}>
                        <MdDesignServices />
                    </div>
                    <div css={styles.headerInfo}>
                        <div css={styles.designerName}>Designer</div>
                        <div css={styles.designerStatus}>
                            <span css={styles.statusIndicator} />
                            Online
                        </div>
                    </div>
                    <div css={styles.headerActions}>
                        <button css={styles.headerAction}>
                            <MdFolder />
                        </button>
                    </div>
                </div>

                {/* Message Area */}
                <div css={styles.chatBody}>
                    {messages.length === 0 ? (
                        <div css={styles.emptyState}>
                            <div css={styles.emptyIcon}>
                                <MdChatBubble />
                            </div>
                            <div css={styles.emptyTitle}>Start the conversation</div>
                            <div css={styles.emptyText}>
                                Send a message to your designer
                            </div>
                        </div>
                    ) : (
                        <div css={styles.messageList} ref={messageListRef}>
                            <div css={styles.dateDivider}>
                                <span css={styles.dateLabel}>Today</span>
                            </div>
                            {messages.map((msg, index) => renderMessage(msg, index))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div css={styles.inputArea}>
                    {messages.length < 2 && (
                        <div css={styles.quickActions}>
                            {QUICK_REPLIES.map((reply) => (
                                <button
                                    key={reply}
                                    css={styles.quickReply}
                                    onClick={() => handleQuickReply(reply)}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}
                    <form css={styles.inputForm} onSubmit={handleSend}>
                        <button type="button" css={styles.attachButton}>
                            <MdImage />
                        </button>
                        <input
                            css={styles.textInput}
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            css={[styles.sendButton, (!message.trim() || isSending) && styles.sendButtonDisabled]}
                            disabled={!message.trim() || isSending}
                        >
                            <MdSend />
                        </button>
                    </form>
                </div>

                <BottomNavBar />
            </div>

            {/* Image Modal */}
            {expandedImage && (
                <div css={styles.imageModal} onClick={() => setExpandedImage(null)}>
                    <button css={styles.imageModalClose} onClick={() => setExpandedImage(null)}>
                        <MdClose />
                    </button>
                    <Image
                        src={expandedImage}
                        alt="Expanded view"
                        width={600}
                        height={450}
                        css={styles.modalImage}
                        style={{ objectFit: 'contain', maxWidth: '90vw', maxHeight: '80vh' }}
                    />
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div css={styles.feedbackModal} onClick={() => setShowFeedbackModal(false)}>
                    <div css={styles.feedbackModalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={styles.feedbackModalHeader}>
                            <h3 css={styles.feedbackModalTitle}>Request Changes</h3>
                            <button css={styles.feedbackModalClose} onClick={() => setShowFeedbackModal(false)}>
                                <MdClose />
                            </button>
                        </div>

                        <div css={styles.feedbackModalBody}>
                            <p css={styles.feedbackModalText}>
                                Let us know what changes you'd like to see in the design.
                            </p>
                            <textarea
                                css={styles.feedbackTextarea}
                                placeholder="Describe the changes you'd like..."
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                rows={4}
                            />

                            <div css={styles.feedbackSuggestions}>
                                <span css={styles.suggestionLabel}>Quick suggestions:</span>
                                <div css={styles.suggestionChips}>
                                    <button css={styles.suggestionChip} onClick={() => setFeedbackText(prev => prev + 'Change the color scheme. ')}>
                                        Color scheme
                                    </button>
                                    <button css={styles.suggestionChip} onClick={() => setFeedbackText(prev => prev + 'Adjust the layout. ')}>
                                        Layout
                                    </button>
                                    <button css={styles.suggestionChip} onClick={() => setFeedbackText(prev => prev + 'Update the typography. ')}>
                                        Typography
                                    </button>
                                    <button css={styles.suggestionChip} onClick={() => setFeedbackText(prev => prev + 'Add more details. ')}>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div css={styles.feedbackModalFooter}>
                            <button css={styles.feedbackCancelBtn} onClick={() => setShowFeedbackModal(false)}>
                                Cancel
                            </button>
                            <button
                                css={styles.feedbackSubmitBtn}
                                onClick={handleSubmitFeedback}
                                disabled={!feedbackText.trim()}
                            >
                                <MdSend /> Send Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthWrapper>
    );
};

export default ChatPage;

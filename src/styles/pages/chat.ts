import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, shadows, typography, transitions, gradients } from '@/styles/theme';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Page Layout - Full height with fixed header, scrollable body, fixed input
export const pageWrapper = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  background: linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%);
  overflow: hidden;
`;

// Chat Header - Fixed at top
export const chatHeader = css`
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: ${colors.white};
  border-bottom: 1px solid ${colors.grey[100]};
  flex-shrink: 0;
  z-index: 10;
`;

export const designerAvatar = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 22px;
  position: relative;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
`;

export const onlineIndicator = css`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #22C55E;
  border-radius: 50%;
  border: 2px solid ${colors.white};
`;

export const designerInfo = css`
  flex: 1;
`;

export const designerName = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[900]};
`;

export const designerStatus = css`
  font-size: ${typography.fontSize.xs}px;
  color: #22C55E;
  font-weight: ${typography.fontWeight.medium};
`;

export const jobBadge = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: ${colors.grey[100]};
  border-radius: ${radii.full};
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[600]};

  svg {
    font-size: 14px;
  }
`;

// Chat Body - Scrollable area
export const chatBody = css`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.grey[300]};
    border-radius: 2px;
  }
`;

// Message List
export const messageList = css`
  padding: ${spacing.md}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

// Date divider
export const dateDivider = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sm}px 0 ${spacing.md}px;
`;

export const dateLabel = css`
  background: ${colors.grey[200]};
  padding: 4px 12px;
  border-radius: ${radii.full};
  font-size: 11px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[600]};
`;

// Message Bubbles
export const messageWrapper = css`
  display: flex;
  flex-direction: column;
  max-width: 85%;
`;

export const messageWrapperCustomer = css`
  align-self: flex-end;
  animation: ${slideInRight} 0.3s ease-out;
`;

export const messageWrapperDesigner = css`
  align-self: flex-start;
  animation: ${slideInLeft} 0.3s ease-out;
`;

export const messageBubble = css`
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: 18px;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const messageBubbleCustomer = css`
  background: ${gradients.primary};
  color: ${colors.white};
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
`;

export const messageBubbleDesigner = css`
  background: ${colors.white};
  color: ${colors.grey[900]};
  border-bottom-left-radius: 4px;
  box-shadow: ${shadows.small};
`;

export const messageText = css`
  font-size: ${typography.fontSize.md}px;
  line-height: 1.5;
`;

export const messageMeta = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

export const messageTime = css`
  font-size: 11px;
  opacity: 0.7;
`;

export const messageStatus = css`
  font-size: 14px;
  opacity: 0.8;
`;

// Design Preview Card
export const designPreviewCard = css`
  background: ${colors.white};
  border-radius: ${radii.xlarge}px;
  overflow: hidden;
  box-shadow: ${shadows.large};
  align-self: flex-start;
  max-width: 95%;
  width: 340px;
  animation: ${fadeInUp} 0.4s ease-out;
  border: 1px solid ${colors.grey[100]};
`;

export const designPreviewHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%);
  border-bottom: 1px solid ${colors.grey[100]};
`;

export const designPreviewHeaderLeft = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const designPreviewIcon = css`
  width: 40px;
  height: 40px;
  background: ${gradients.primary};
  border-radius: ${radii.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.25);

  svg {
    font-size: 20px;
  }
`;

export const designPreviewTitleWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const designPreviewTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
`;

export const designPreviewSubtitle = css`
  font-size: 11px;
  color: ${colors.grey[500]};
`;

export const designVersionBadge = css`
  padding: 4px 10px;
  background: ${gradients.primary};
  color: ${colors.white};
  border-radius: ${radii.full};
  font-size: 11px;
  font-weight: ${typography.fontWeight.semibold};
`;

// Design Image
export const designImageContainer = css`
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover > div {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.02);
  }

  img {
    transition: transform 0.3s ease;
  }
`;

export const zoomOverlay = css`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs}px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;
  color: ${colors.white};
  pointer-events: none;

  svg {
    font-size: 32px;
  }

  span {
    font-size: ${typography.fontSize.sm}px;
    font-weight: ${typography.fontWeight.medium};
  }
`;

export const designImage = css`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
`;

// Design Info
export const designPreviewInfo = css`
  padding: ${spacing.sm}px ${spacing.md}px;
  background: ${colors.grey[50]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const designInfoRow = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const designInfoLabel = css`
  font-size: 11px;
  color: ${colors.grey[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const designInfoValue = css`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[700]};
`;

export const pendingBadge = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  color: #92400E;
  border-radius: ${radii.small}px;
  font-size: 11px;
  font-weight: ${typography.fontWeight.semibold};
`;

// Design Actions
export const designPreviewFooter = css`
  padding: ${spacing.md}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm}px;
`;

export const approveButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  color: ${colors.white};
  border: none;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  transition: all ${transitions.fast};
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
  }

  svg {
    font-size: 18px;
  }
`;

export const requestChangesButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background: transparent;
  color: ${colors.grey[600]};
  border: 1.5px solid ${colors.grey[300]};
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    border-color: #EF4444;
    color: #EF4444;
    background: rgba(239, 68, 68, 0.05);
  }

  svg {
    font-size: 18px;
  }
`;

export const footerNote = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11px;
  color: ${colors.grey[400]};

  svg {
    font-size: 12px;
  }
`;

// Input Area - Fixed at bottom
export const inputArea = css`
  flex-shrink: 0;
  padding: ${spacing.sm}px ${spacing.md}px;
  padding-bottom: calc(${spacing.sm}px + 80px); /* Space for bottom nav */
  background: ${colors.white};
  border-top: 1px solid ${colors.grey[100]};
`;

export const quickActions = css`
  display: flex;
  gap: ${spacing.xs}px;
  margin-bottom: ${spacing.sm}px;
  flex-wrap: wrap;
`;

export const quickAction = css`
  padding: 6px 12px;
  background: ${colors.grey[50]};
  border: 1px solid ${colors.grey[200]};
  border-radius: ${radii.full};
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[700]};
  cursor: pointer;
  transition: all ${transitions.fast};
  white-space: nowrap;

  &:hover {
    border-color: ${colors.seed};
    color: ${colors.seed};
    background: rgba(37, 99, 235, 0.05);
  }
`;

export const inputContainer = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: 4px;
  background: ${colors.grey[50]};
  border-radius: ${radii.xlarge}px;
  border: 1px solid ${colors.grey[200]};

  &:focus-within {
    border-color: ${colors.seed};
    background: ${colors.white};
  }
`;

export const attachButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: ${colors.grey[500]};
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background: ${colors.grey[100]};
    color: ${colors.seed};
  }

  svg {
    font-size: 20px;
  }
`;

export const messageInput = css`
  flex: 1;
  padding: ${spacing.sm}px;
  border: none;
  background: transparent;
  font-size: ${typography.fontSize.md}px;
  outline: none;
  color: ${colors.grey[900]};
  min-width: 0;

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;

export const sendButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${gradients.primary};
  color: ${colors.white};
  cursor: pointer;
  border-radius: 50%;
  transition: all ${transitions.fast};
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.25);

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:disabled {
    background: ${colors.grey[300]};
    box-shadow: none;
    cursor: not-allowed;
  }

  svg {
    font-size: 18px;
    margin-left: 2px;
  }
`;

// Empty State
export const emptyState = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl}px;
  text-align: center;
`;

export const emptyIcon = css`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md}px;

  svg {
    font-size: 32px;
    color: ${colors.seed};
  }
`;

export const emptyTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.xs}px;
`;

export const emptyText = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
  max-width: 260px;
`;

// Image Modal
export const imageModal = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.lg}px;
`;

export const imageModalClose = css`
  position: absolute;
  top: ${spacing.lg}px;
  right: ${spacing.lg}px;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    font-size: 24px;
  }
`;

export const modalImage = css`
  max-width: 90%;
  max-height: 80vh;
  border-radius: ${radii.large}px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

// Feedback Modal
export const feedbackModal = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md}px;
`;

export const feedbackModalContent = css`
  background: ${colors.white};
  border-radius: ${radii.xlarge}px ${radii.xlarge}px 0 0;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const feedbackModalHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px ${spacing.lg}px;
  border-bottom: 1px solid ${colors.grey[100]};
`;

export const feedbackModalTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin: 0;
`;

export const feedbackModalClose = css`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${colors.grey[100]};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: ${colors.grey[200]};
  }

  svg {
    font-size: 18px;
    color: ${colors.grey[600]};
  }
`;

export const feedbackModalBody = css`
  padding: ${spacing.lg}px;
`;

export const feedbackModalText = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[600]};
  margin-bottom: ${spacing.md}px;
`;

export const feedbackTextarea = css`
  width: 100%;
  padding: ${spacing.md}px;
  border: 1.5px solid ${colors.grey[200]};
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.md}px;
  font-family: ${typography.fontFamily.primary};
  resize: none;
  outline: none;

  &:focus {
    border-color: ${colors.seed};
  }

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;

export const feedbackSuggestions = css`
  margin-top: ${spacing.md}px;
`;

export const suggestionLabel = css`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[500]};
  margin-bottom: ${spacing.sm}px;
  display: block;
`;

export const suggestionChips = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs}px;
`;

export const suggestionChip = css`
  padding: 6px 12px;
  background: ${colors.grey[100]};
  border: none;
  border-radius: ${radii.full};
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[700]};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background: ${colors.seed};
    color: ${colors.white};
  }
`;

export const feedbackModalFooter = css`
  display: flex;
  gap: ${spacing.sm}px;
  padding: ${spacing.md}px ${spacing.lg}px;
  border-top: 1px solid ${colors.grey[100]};
`;

export const feedbackCancelBtn = css`
  flex: 1;
  padding: ${spacing.sm}px ${spacing.md}px;
  background: transparent;
  color: ${colors.grey[600]};
  border: 1.5px solid ${colors.grey[200]};
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;

  &:hover {
    background: ${colors.grey[50]};
  }
`;

export const feedbackSubmitBtn = css`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background: ${gradients.primary};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.25);

  &:disabled {
    background: ${colors.grey[300]};
    box-shadow: none;
    cursor: not-allowed;
  }

  svg {
    font-size: 16px;
  }
`;

// Additional styles used by chat page

export const messageRow = css`
  display: flex;
  gap: ${spacing.sm}px;
  align-items: flex-end;
`;

export const messageRowCustomer = css`
  flex-direction: row-reverse;
`;

export const avatarSmall = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  font-size: 14px;
  flex-shrink: 0;
`;

export const messageImage = css`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: ${spacing.xs}px;
`;

export const imageOverlay = css`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;

  svg {
    font-size: 28px;
  }

  &:hover {
    opacity: 1;
  }
`;

export const readReceipt = css`
  font-size: 14px;
  margin-left: 4px;
`;

export const designActions = css`
  display: flex;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.sm}px;
  padding-top: ${spacing.sm}px;
  border-top: 1px solid ${colors.grey[100]};
`;

export const changesButton = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: ${spacing.xs}px ${spacing.sm}px;
  background: transparent;
  color: ${colors.grey[600]};
  border: 1px solid ${colors.grey[300]};
  border-radius: ${radii.small}px;
  font-size: ${typography.fontSize.xs}px;
  cursor: pointer;

  &:hover {
    border-color: #EF4444;
    color: #EF4444;
  }
`;

export const loadingContainer = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const headerInfo = css`
  flex: 1;
`;

export const statusIndicator = css`
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
`;

export const headerActions = css`
  display: flex;
  gap: ${spacing.sm}px;
`;

export const headerAction = css`
  width: 40px;
  height: 40px;
  border: none;
  background: ${colors.grey[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey[600]};
  cursor: pointer;

  &:hover {
    background: ${colors.grey[200]};
  }

  svg {
    font-size: 20px;
  }
`;

export const quickReply = css`
  padding: 8px 16px;
  background: ${colors.white};
  border: 1px solid ${colors.grey[200]};
  border-radius: ${radii.full}px;
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[700]};
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    border-color: ${colors.seed};
    color: ${colors.seed};
  }
`;

export const inputForm = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: 4px;
  background: ${colors.grey[50]};
  border-radius: ${radii.xlarge}px;
  border: 1px solid ${colors.grey[200]};
`;

export const textInput = css`
  flex: 1;
  padding: ${spacing.sm}px;
  border: none;
  background: transparent;
  font-size: ${typography.fontSize.md}px;
  outline: none;
  color: ${colors.grey[900]};

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;

export const sendButtonDisabled = css`
  background: ${colors.grey[300]};
  box-shadow: none;
  cursor: not-allowed;
`;

export const closeZoom = css`
  position: absolute;
  top: ${spacing.lg}px;
  right: ${spacing.lg}px;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  cursor: pointer;

  svg {
    font-size: 24px;
  }
`;

export const modalOverlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.md}px;
`;

export const modalHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.md}px;

  h3 {
    font-size: ${typography.fontSize.lg}px;
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.grey[900]};
    margin: 0;
  }
`;

export const modalClose = css`
  width: 32px;
  height: 32px;
  border: none;
  background: ${colors.grey[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 18px;
    color: ${colors.grey[600]};
  }
`;

export const feedbackInput = css`
  width: 100%;
  padding: ${spacing.md}px;
  border: 1px solid ${colors.grey[200]};
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.md}px;
  resize: none;
  outline: none;
  margin-bottom: ${spacing.md}px;

  &:focus {
    border-color: ${colors.seed};
  }
`;

export const submitFeedback = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  background: ${gradients.primary};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;

  &:disabled {
    background: ${colors.grey[300]};
    cursor: not-allowed;
  }
`;

export const backButton = css`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey[700]};
`;

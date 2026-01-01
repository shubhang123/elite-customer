import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, shadows, typography, transitions, gradients } from '@/styles/theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pageWrapper = css`
  min-height: 100vh;
  background: linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%);
`;

export const container = css`
  padding: ${spacing.lg}px;
  padding-bottom: 120px;
  max-width: 600px;
  margin: 0 auto;
`;

export const header = css`
  margin-bottom: ${spacing.lg}px;
`;

export const title = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['2xl']}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.xs}px;
`;

export const subtitle = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
`;

// Chat List
export const chatList = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm}px;
`;

export const chatCard = css`
  background: ${colors.white};
  border-radius: ${radii.large}px;
  padding: ${spacing.md}px;
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
  box-shadow: ${shadows.small};
  border: 1px solid ${colors.grey[100]};
  cursor: pointer;
  transition: all ${transitions.fast};
  animation: ${fadeInUp} 0.4s ease-out both;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
    border-color: ${colors.seed};
  }
`;

export const chatAvatar = css`
  width: 52px;
  height: 52px;
  background: ${gradients.primary};
  border-radius: ${radii.large}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 24px;
    color: ${colors.white};
  }
`;

export const chatContent = css`
  flex: 1;
  min-width: 0;
`;

export const chatTitle = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[900]};
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const chatStatus = css`
  font-size: ${typography.fontSize.xs}px;
  padding: 2px 8px;
  background: rgba(34, 197, 94, 0.1);
  color: #22C55E;
  border-radius: ${radii.full}px;
  font-weight: ${typography.fontWeight.medium};
`;

export const chatPreview = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const chatMeta = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

export const chatTime = css`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[400]};
`;

export const chatArrow = css`
  color: ${colors.grey[400]};
  
  svg {
    font-size: 20px;
  }
`;

// Empty State
export const emptyState = css`
  text-align: center;
  padding: ${spacing.xxl}px;
`;

export const emptyIcon = css`
  width: 80px;
  height: 80px;
  background: ${colors.grey[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.lg}px;

  svg {
    font-size: 36px;
    color: ${colors.grey[400]};
  }
`;

export const emptyTitle = css`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[700]};
  margin-bottom: ${spacing.sm}px;
`;

export const emptyText = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
`;

// Loading
export const loadingContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxl}px;
`;

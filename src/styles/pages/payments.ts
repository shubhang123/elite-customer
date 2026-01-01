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

// Header with summary card
export const header = css`
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const headerTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['2xl']}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.md}px;
`;

// Summary Card
export const summaryCard = css`
  background: ${gradients.primary};
  border-radius: ${radii.xlarge}px;
  padding: ${spacing.xl}px;
  color: ${colors.white};
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.25);
  animation: ${fadeInUp} 0.5s ease-out 0.1s both;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 80%;
    height: 150%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  }
`;

export const summaryRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const summaryLabel = css`
  font-size: ${typography.fontSize.sm}px;
  opacity: 0.9;
`;

export const summaryValue = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['3xl']}px;
  font-weight: ${typography.fontWeight.bold};
`;

export const summarySmallValue = css`
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semibold};
`;

// Pay Button
export const payButton = css`
  width: 100%;
  padding: ${spacing.md}px;
  background: ${colors.white};
  color: ${colors.seed};
  border: none;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.bold};
  cursor: pointer;
  transition: all ${transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.lg}px;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${shadows.medium};
  }

  svg {
    font-size: 20px;
  }
`;

// Section
export const section = css`
  margin-top: ${spacing.xl}px;
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.5s ease-out 0.2s both;
`;

export const sectionTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.md}px;
  padding-top: ${spacing.md}px;
`;

// Payment History List
export const historyList = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm}px;
`;

export const historyItem = css`
  background: ${colors.white};
  border-radius: ${radii.large}px;
  padding: ${spacing.md}px;
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
  box-shadow: ${shadows.small};
  border: 1px solid ${colors.grey[100]};
  transition: all ${transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }
`;

export const historyIcon = css`
  width: 44px;
  height: 44px;
  border-radius: ${radii.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 22px;
  }
`;

export const historyIconSuccess = css`
  background: rgba(34, 197, 94, 0.1);
  
  svg {
    color: #22C55E;
  }
`;

export const historyIconPending = css`
  background: rgba(245, 158, 11, 0.1);
  
  svg {
    color: #F59E0B;
  }
`;

export const historyContent = css`
  flex: 1;
`;

export const historyTitle = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[900]};
  margin-bottom: 2px;
`;

export const historyDate = css`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[500]};
`;

export const historyAmount = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
`;

// Empty state
export const emptyState = css`
  text-align: center;
  padding: ${spacing.xl}px;
  color: ${colors.grey[500]};
`;

export const emptyIcon = css`
  width: 64px;
  height: 64px;
  background: ${colors.grey[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${spacing.md}px;

  svg {
    font-size: 28px;
    color: ${colors.grey[400]};
  }
`;

export const emptyTitle = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[700]};
  margin-bottom: ${spacing.xs}px;
`;

export const emptyText = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
`;

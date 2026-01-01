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

// Status Card
export const statusCard = css`
  background: ${gradients.primary};
  border-radius: ${radii.xlarge}px;
  padding: ${spacing.xl}px;
  color: ${colors.white};
  margin-bottom: ${spacing.xl}px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.25);
  animation: ${fadeInUp} 0.5s ease-out;

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

export const statusRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

export const statusLabel = css`
  font-size: ${typography.fontSize.sm}px;
  opacity: 0.9;
`;

export const statusValue = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
`;

export const statusBadge = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${radii.full};
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.semibold};
`;

export const jobCodeRow = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
  padding: ${spacing.sm}px 0;
  margin-top: ${spacing.sm}px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

export const jobCodeLabel = css`
  font-size: ${typography.fontSize.sm}px;
  opacity: 0.8;
`;

export const jobCodeValue = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.bold};
`;

export const statusDot = css`
  width: 8px;
  height: 8px;
  background: #4ADE80;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.9); }
  }
`;

// Progress bar
export const progressContainer = css`
  margin-top: ${spacing.lg}px;
`;

export const progressBar = css`
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${radii.full};
  overflow: hidden;
`;

export const progressFill = css`
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${radii.full};
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const progressLabel = css`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.sm}px;
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.medium};
  opacity: 0.9;
`;

// Section
export const section = css`
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.5s ease-out 0.1s both;
`;

export const sectionTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.md}px;
`;

// Timeline
export const timeline = css`
  position: relative;
  padding-left: ${spacing.xl}px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 24px;
    bottom: 24px;
    width: 2px;
    background: ${colors.grey[200]};
  }
`;

export const timelineItem = css`
  position: relative;
  padding-bottom: ${spacing.lg}px;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const timelineDot = css`
  position: absolute;
  left: -17px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${colors.grey[200]};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 10px;
    color: ${colors.white};
    opacity: 0;
  }
`;

export const timelineDotDone = css`
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);

  svg {
    opacity: 1;
  }
`;

export const timelineDotActive = css`
  background: ${gradients.primary};
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3); }
    50% { box-shadow: 0 2px 16px rgba(37, 99, 235, 0.5); }
  }
`;

export const timelineContent = css`
  background: ${colors.white};
  border-radius: ${radii.large}px;
  padding: ${spacing.md}px;
  box-shadow: ${shadows.small};
  border: 1px solid ${colors.grey[100]};
  margin-left: ${spacing.sm}px;
`;

export const timelineContentActive = css`
  border-color: ${colors.seed};
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
`;

export const timelineTitle = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[900]};
  margin-bottom: 2px;
`;

export const timelineDate = css`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[500]};
  margin-bottom: ${spacing.xs}px;
`;

export const timelineDescription = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[600]};
  line-height: 1.5;
`;

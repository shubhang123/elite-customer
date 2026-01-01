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

// Logo Container
export const logoContainer = css`
  width: 44px;
  height: 44px;
  background: ${gradients.primary};
  border-radius: ${radii.large}px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-4px) rotate(1deg); }
  75% { transform: translateY(-2px) rotate(-1deg); }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Page wrapper
export const pageWrapper = css`
  min-height: 100vh;
  background: linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 100%;
    background: radial-gradient(ellipse, rgba(37, 99, 235, 0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const container = css`
  padding: ${spacing.lg}px;
  padding-top: ${spacing.md}px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

// Header Section
export const header = css`
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export const greeting = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[500]};
  margin-bottom: ${spacing.xs}px;
  letter-spacing: 0.02em;
`;

export const userName = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['4xl']}px;
  font-weight: ${typography.fontWeight.extrabold};
  background: ${gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

// Hero Job Card
export const jobCard = css`
  position: relative;
  overflow: hidden;
  border-radius: ${radii['2xlarge']}px;
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.6s ease-out 0.1s both;
  box-shadow: 0 20px 40px -12px rgba(37, 99, 235, 0.25);
`;

export const jobCardBackground = css`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #EC4899 100%);
  background-size: 200% 200%;
  animation: ${gradientMove} 8s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

export const jobCardContent = css`
  position: relative;
  padding: ${spacing.xl}px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const jobInfo = css`
  color: ${colors.white};
  flex: 1;
`;

export const jobStatusBadge = css`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${radii.full};
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.semibold};
  margin-bottom: ${spacing.md}px;
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

export const statusDot = css`
  width: 8px;
  height: 8px;
  background: #4ADE80;
  border-radius: 50%;
  animation: pulse 2s infinite;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.5);

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.9); }
  }
`;

export const jobStatus = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['2xl']}px;
  font-weight: ${typography.fontWeight.bold};
  margin-bottom: ${spacing.sm}px;
  letter-spacing: -0.01em;
`;

export const jobDelivery = css`
  font-size: ${typography.fontSize.sm}px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: ${typography.fontWeight.medium};

  svg {
    font-size: 16px;
    opacity: 0.8;
  }
`;

export const jobIconContainer = css`
  width: 72px;
  height: 72px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: ${radii.xlarge}px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 4s ease-in-out infinite;
  border: 1px solid rgba(255, 255, 255, 0.1);

  svg {
    font-size: 36px;
    color: ${colors.white};
  }
`;

// Progress Bar
export const progressContainer = css`
  position: relative;
  padding: 0 ${spacing.xl}px ${spacing.lg}px;
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
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

export const progressLabel = css`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.sm}px;
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.medium};
  color: rgba(255, 255, 255, 0.85);
`;

// Quick Stats Row
export const statsRow = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing.md}px;
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.6s ease-out 0.15s both;
`;

export const statCard = css`
  background: ${colors.white};
  border-radius: ${radii.large}px;
  padding: ${spacing.md}px;
  text-align: center;
  box-shadow: ${shadows.small};
  border: 1px solid ${colors.grey[100]};
  transition: all ${transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }
`;

export const statValue = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: 2px;
`;

export const statLabel = css`
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[500]};
  letter-spacing: 0.02em;
`;

// Section Title
export const sectionTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.md}px;
  letter-spacing: -0.01em;
  animation: ${fadeInUp} 0.6s ease-out 0.2s both;
`;

// Feature Cards Grid
export const featuresGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md}px;
`;

export const featureCard = css`
  position: relative;
  background: ${colors.white};
  border-radius: ${radii.xlarge}px;
  padding: ${spacing.lg}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
  transition: all ${transitions.normal};
  box-shadow: ${shadows.small};
  border: 1px solid ${colors.grey[100]};
  animation: ${fadeInUp} 0.6s ease-out both;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${gradients.primary};
    opacity: 0;
    transition: opacity ${transitions.fast};
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${shadows.xl};
    border-color: transparent;
  }

  &:hover::before {
    opacity: 0.04;
  }

  &:hover .feature-icon-wrapper {
    transform: scale(1.08);
    box-shadow: ${shadows.glow};
  }

  &:nth-of-type(1) { animation-delay: 0.25s; }
  &:nth-of-type(2) { animation-delay: 0.3s; }
  &:nth-of-type(3) { animation-delay: 0.35s; }
  &:nth-of-type(4) { animation-delay: 0.4s; }
`;

export const featureIconWrapper = css`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  border-radius: ${radii.large}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all ${transitions.fast};
`;

export const featureIcon = css`
  font-size: 28px;
  color: ${colors.seed};
`;

export const featureLabel = css`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[800]};
  text-align: center;
  position: relative;
  letter-spacing: -0.01em;
`;

export const featureArrow = css`
  position: absolute;
  top: ${spacing.md}px;
  right: ${spacing.md}px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.grey[400]};
  opacity: 0;
  transform: translateX(-8px);
  transition: all ${transitions.fast};

  ${featureCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const notificationBadge = css`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, ${colors.error} 0%, #F97316 100%);
  border-radius: ${radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
`;

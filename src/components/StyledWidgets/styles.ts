import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, shadows, gradients, transitions, typography } from '@/styles/theme';

// StyledCard styles
export const styledCard = css`
  background: ${colors.white};
  border-radius: ${radii.medium}px;
  box-shadow: ${shadows.small};
  padding: ${spacing.md}px;
  transition: transform ${transitions.fast}, box-shadow ${transitions.fast};
`;

export const styledCardClickable = css`
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.medium};
  }
`;

export const styledCardAnimated = css`
  animation: fadeInUp 0.3s ease-out;
`;

// GradientButton styles
export const gradientButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  background: ${gradients.primary};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.large}px;
  padding: ${spacing.md}px ${spacing.lg}px;
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: transform ${transitions.fast}, box-shadow ${transitions.fast};
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 117, 252, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const gradientButtonDisabled = css`
  background: ${colors.grey[300]};
`;

// AnimatedBackground styles
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const animatedBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(-45deg, #6A11CB, #2575FC, #6A11CB, #2575FC);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  z-index: -1;
`;

// ShimmerLoading styles
const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const shimmerLoading = css`
  background: linear-gradient(
    90deg,
    ${colors.grey[200]} 25%,
    ${colors.grey[100]} 50%,
    ${colors.grey[200]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmerAnimation} 1.5s infinite;
  border-radius: ${radii.medium}px;
`;

// LoadingSpinner styles
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const loadingSpinner = css`
  width: 24px;
  height: 24px;
  border: 3px solid ${colors.grey[200]};
  border-top-color: ${colors.seed};
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

export const loadingContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

// Keyframe for fade-in animations
export const fadeInUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

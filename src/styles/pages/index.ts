import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, typography, transitions } from '@/styles/theme';

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

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const background = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(-45deg, #6A11CB, #2575FC, #6A11CB, #2575FC);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  z-index: 0;
`;

export const content = css`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${spacing.lg}px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
`;

export const logoSection = css`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: ${fadeSlideUp} 1s ease-out;
`;

export const logo = css`
  width: 180px;
  height: 180px;
  margin-bottom: ${spacing.xl}px;
  object-fit: contain;
`;

export const title = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['3xl']}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.white};
  margin-bottom: ${spacing.md}px;
`;

export const subtitle = css`
  font-size: ${typography.fontSize.lg}px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1.2px;
`;

export const featuresSection = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px 0;
  animation: ${fadeSlideUp} 1s ease-out 0.2s both;
`;

export const featureItem = css`
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
  padding: ${spacing.sm}px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: ${typography.fontSize.md}px;

  svg {
    font-size: 24px;
  }
`;

export const actionsSection = css`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacing.md}px;
  animation: ${fadeSlideUp} 1s ease-out 0.4s both;
`;

export const primaryButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  width: 100%;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: ${colors.white};
  color: ${colors.seed};
  border: none;
  border-radius: ${radii.large}px;
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: transform ${transitions.fast}, box-shadow ${transitions.fast};
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 20px;
  }
`;

export const helpButton = css`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: ${typography.fontSize.md}px;
  cursor: pointer;
  padding: ${spacing.sm}px;
  transition: color ${transitions.fast};

  &:hover {
    color: ${colors.white};
  }
`;

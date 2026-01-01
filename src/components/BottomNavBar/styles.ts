import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, shadows, typography, transitions, gradients } from '@/styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Dark mode navbar - always dark
export const navContainer = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: ${spacing.sm}px ${spacing.md}px;
  padding-bottom: calc(${spacing.sm}px + env(safe-area-inset-bottom));
  background: transparent;
  z-index: 100;
`;

export const navInner = css`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: ${radii['2xlarge']}px;
  padding: ${spacing.xs}px ${spacing.sm}px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const navItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: ${spacing.sm}px ${spacing.md}px;
  border-radius: ${radii.large}px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all ${transitions.fast};
  position: relative;
  min-width: 56px;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  svg {
    font-size: 22px;
    transition: transform ${transitions.fast};
  }
`;

export const navItemActive = css`
  color: #FFFFFF;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%);
  
  &:hover {
    color: #FFFFFF;
  }

  svg {
    transform: scale(1.1);
  }
`;

export const navLabel = css`
  font-size: 10px;
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

export const navIndicator = css`
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 50%;
  opacity: 0;
  transition: opacity ${transitions.fast};
`;

export const navIndicatorActive = css`
  opacity: 1;
`;

export const notificationDot = css`
  position: absolute;
  top: 4px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: ${colors.error};
  border-radius: 50%;
  border: 2px solid rgba(15, 23, 42, 0.95);
  animation: ${fadeIn} 0.3s ease;
`;

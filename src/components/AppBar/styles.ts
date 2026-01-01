import { css } from '@emotion/react';
import { colors, spacing, radii, shadows, typography, transitions } from '@/styles/theme';

export const appBarContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const appBarLeft = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const backButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: ${radii.medium}px;
  cursor: pointer;
  color: ${colors.grey[800]};
  transition: background ${transitions.fast};

  &:hover {
    background: ${colors.grey[100]};
  }

  svg {
    font-size: 24px;
  }
`;

export const appBarTitle = css`
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[800]};
  margin: 0;
`;

export const appBarRight = css`
  display: flex;
  align-items: center;
  gap: ${spacing.sm}px;
`;

export const notificationButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: ${radii.medium}px;
  cursor: pointer;
  color: ${colors.grey[600]};
  transition: all ${transitions.fast};

  &:hover {
    background: ${colors.grey[100]};
    color: ${colors.seed};
  }

  svg {
    font-size: 24px;
  }
`;

export const notificationBadge = css`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: ${colors.error};
  border-radius: 50%;
  border: 2px solid ${colors.white};
`;

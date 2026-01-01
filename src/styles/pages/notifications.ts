import { css } from '@emotion/react';
import { colors, spacing, radii, shadows, typography } from '@/styles/theme';

export const container = css`
  padding: ${spacing.lg}px;
`;

export const list = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

export const card = css`
  background: ${colors.white};
  border-radius: ${radii.medium}px;
  box-shadow: ${shadows.small};
  padding: ${spacing.md}px;
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
`;

export const iconContainer = css`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(37, 117, 252, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.seed};
  flex-shrink: 0;

  svg {
    font-size: 24px;
  }
`;

export const content = css`
  flex: 1;
`;

export const message = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[800]};
  margin-bottom: ${spacing.xs}px;
`;

export const date = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
`;

export const emptyState = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxl}px;
  color: ${colors.grey[500]};
  text-align: center;

  svg {
    font-size: 48px;
    margin-bottom: ${spacing.md}px;
    opacity: 0.5;
  }
`;

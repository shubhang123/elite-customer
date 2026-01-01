import { css } from '@emotion/react';
import { colors, spacing, radii, typography, transitions } from '@/styles/theme';

export const container = css`
  min-height: 100vh;
  background: ${colors.white};
`;

export const header = css`
  display: flex;
  align-items: center;
  padding: ${spacing.md}px ${spacing.lg}px;
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

export const content = css`
  padding: ${spacing.lg}px;
  max-width: 480px;
  margin: 0 auto;
`;

export const logoContainer = css`
  width: 72px;
  height: 72px;
  background: ${colors.seed};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 117, 252, 0.3);
  margin-bottom: ${spacing.xl}px;

  svg {
    font-size: 36px;
    color: ${colors.white};
  }
`;

export const title = css`
  font-size: ${typography.fontSize['2xl']}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.sm}px;
`;

export const subtitle = css`
  font-size: ${typography.fontSize.md}px;
  color: ${colors.grey[600]};
  margin-bottom: ${spacing.xl}px;
`;

export const segmentedControl = css`
  display: flex;
  background: ${colors.grey[100]};
  border-radius: ${radii.large}px;
  padding: ${spacing.xs}px;
  margin-bottom: ${spacing.lg}px;
`;

export const segmentButton = css`
  flex: 1;
  padding: ${spacing.sm}px ${spacing.md}px;
  border: none;
  background: transparent;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[600]};
  cursor: pointer;
  transition: all ${transitions.fast};
`;

export const segmentButtonActive = css`
  background: ${colors.white};
  color: ${colors.seed};
  box-shadow: ${`0 2px 4px rgba(0, 0, 0, 0.1)`};
`;

export const form = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}px;
`;

export const inputGroup = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs}px;
`;

export const label = css`
  font-size: ${typography.fontSize.sm}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[700]};
`;

export const input = css`
  width: 100%;
  padding: ${spacing.md}px;
  font-size: ${typography.fontSize.md}px;
  border: 1px solid ${colors.grey[300]};
  border-radius: ${radii.medium}px;
  background: ${colors.grey[50]};
  transition: border-color ${transitions.fast}, box-shadow ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${colors.seed};
    box-shadow: 0 0 0 3px rgba(37, 117, 252, 0.1);
  }

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;

export const submitButton = css`
  width: 100%;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: ${colors.seed};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.medium}px;
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${transitions.fast};
  margin-top: ${spacing.md}px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #1e60d8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const registerLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs}px;
  margin-top: ${spacing.lg}px;
  font-size: ${typography.fontSize.md}px;
  color: ${colors.grey[600]};

  a, button {
    color: ${colors.seed};
    font-weight: ${typography.fontWeight.medium};
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const privacyText = css`
  text-align: center;
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
  margin-top: ${spacing.lg}px;
  line-height: ${typography.lineHeight.relaxed};
`;

export const errorText = css`
  color: ${colors.error};
  font-size: ${typography.fontSize.sm}px;
  margin-top: ${spacing.xs}px;
`;

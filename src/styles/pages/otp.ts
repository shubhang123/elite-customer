import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, typography, transitions } from '@/styles/theme';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  text-align: center;
  margin-bottom: ${spacing.xl}px;
  line-height: ${typography.lineHeight.relaxed};
`;

export const otpContainer = css`
  display: flex;
  gap: ${spacing.sm}px;
  margin-bottom: ${spacing.xl}px;
  width: 100%;
  max-width: 320px;
`;

export const otpInput = css`
  width: 44px;
  height: 56px;
  text-align: center;
  font-size: ${typography.fontSize.xl}px;
  font-weight: ${typography.fontWeight.semibold};
  border: 1px solid ${colors.grey[300]};
  border-radius: ${radii.medium}px;
  background: ${colors.grey[50]};
  transition: border-color ${transitions.fast}, box-shadow ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${colors.seed};
    box-shadow: 0 0 0 3px rgba(37, 117, 252, 0.1);
    background: ${colors.white};
  }
`;

export const otpInputError = css`
  border-color: ${colors.error};
  animation: ${shake} 0.4s ease;
`;

export const verifyButton = css`
  width: 100%;
  max-width: 320px;
  padding: ${spacing.md}px ${spacing.lg}px;
  background: ${colors.seed};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.large}px;
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${transitions.fast};
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

export const resendContainer = css`
  display: flex;
  align-items: center;
  gap: ${spacing.xs}px;
  margin-top: ${spacing.lg}px;
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[600]};
`;

export const resendButton = css`
  background: none;
  border: none;
  color: ${colors.seed};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    color: ${colors.grey[400]};
    cursor: not-allowed;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const errorText = css`
  color: ${colors.error};
  font-size: ${typography.fontSize.sm}px;
  margin-bottom: ${spacing.md}px;
`;

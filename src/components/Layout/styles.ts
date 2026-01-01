import { css } from '@emotion/react';
import { colors, spacing } from '@/styles/theme';

export const layoutContainer = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
`;

export const layoutContent = css`
  flex: 1;
  padding-bottom: 80px; /* Space for bottom nav */
  overflow-y: auto;
`;

export const pageContainer = css`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

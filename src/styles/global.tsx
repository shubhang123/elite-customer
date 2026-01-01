/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { colors, typography } from './theme';

const globalStyles = css`
  /* Premium Font Imports */
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root Variables */
  :root {
    --font-primary: ${typography.fontFamily.primary};
    --font-display: ${typography.fontFamily.display};
    --color-primary: ${colors.seed};
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.md}px;
    font-weight: ${typography.fontWeight.normal};
    line-height: ${typography.lineHeight.normal};
    color: ${colors.grey[900]};
    background-color: ${colors.grey[50]};
    letter-spacing: -0.01em;
  }

  /* Headings with display font */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontFamily.display};
    font-weight: ${typography.fontWeight.bold};
    line-height: ${typography.lineHeight.tight};
    letter-spacing: ${typography.letterSpacing.tight};
    color: ${colors.grey[900]};
  }

  h1 {
    font-size: ${typography.fontSize['4xl']}px;
    font-weight: ${typography.fontWeight.extrabold};
  }

  h2 {
    font-size: ${typography.fontSize['3xl']}px;
  }

  h3 {
    font-size: ${typography.fontSize['2xl']}px;
  }

  h4 {
    font-size: ${typography.fontSize.xl}px;
  }

  /* Links */
  a {
    color: ${colors.seed};
    text-decoration: none;
    transition: color 150ms ease;
  }

  a:hover {
    color: ${colors.seedDark};
  }

  /* Buttons */
  button {
    font-family: ${typography.fontFamily.primary};
    font-weight: ${typography.fontWeight.medium};
    cursor: pointer;
  }

  /* Inputs */
  input, textarea, select {
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize.md}px;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${colors.seed};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background: ${colors.seed};
    color: ${colors.white};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.grey[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.grey[300]};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey[400]};
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;

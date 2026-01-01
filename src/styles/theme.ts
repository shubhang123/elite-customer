import { css } from '@emotion/react';

// Premium Color Palette - Refined and Sophisticated
export const colors = {
  // Primary colors - Deep, rich tones
  primary: '#1E3A8A', // Deep navy blue
  primaryLight: '#3B82F6', // Bright blue
  accent: '#7C3AED', // Rich purple
  accentLight: '#A78BFA', // Light purple

  // Brand gradient colors
  seed: '#2563EB', // Trustworthy blue
  seedDark: '#1D4ED8',

  // Neutrals - Warm greys for a premium feel
  white: '#FFFFFF',
  black: '#0F172A', // Slate black
  grey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Semantic colors - Muted and refined
  success: '#059669', // Emerald
  successLight: '#10B981',
  error: '#DC2626', // Red
  errorLight: '#EF4444',
  warning: '#D97706', // Amber
  warningLight: '#F59E0B',
  info: '#0891B2', // Cyan
};

// Spacing - Consistent rhythm
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  '3xl': 64,
};

// Border Radius - Softer, more modern
export const radii = {
  small: 6,
  medium: 10,
  large: 14,
  xlarge: 20,
  '2xlarge': 28,
  round: '50%',
  full: '9999px',
};

// Shadows - Layered and subtle
export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  small: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
  glow: '0 0 15px rgba(37, 99, 235, 0.2)',
  glowStrong: '0 0 30px rgba(37, 99, 235, 0.3)',
};

// Gradients - Rich and vibrant
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.seed} 0%, ${colors.accent} 100%)`,
  primarySoft: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.accentLight} 100%)`,
  primaryReverse: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.seed} 100%)`,
  dark: `linear-gradient(135deg, ${colors.grey[800]} 0%, ${colors.grey[900]} 100%)`,
  light: `linear-gradient(135deg, ${colors.grey[50]} 0%, ${colors.grey[100]} 100%)`,
  shimmer: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
  // Premium gradient combinations
  ocean: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 50%, #7C3AED 100%)',
  sunset: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
  emerald: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  mesh: `radial-gradient(at 40% 20%, hsla(228, 87%, 60%, 0.15) 0px, transparent 50%),
         radial-gradient(at 80% 0%, hsla(262, 83%, 58%, 0.1) 0px, transparent 50%),
         radial-gradient(at 0% 50%, hsla(228, 87%, 60%, 0.1) 0px, transparent 50%)`,
};

// Typography - Premium font stack
export const typography = {
  fontFamily: {
    // Primary sans-serif for UI
    primary: "'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    // Display font for headings
    display: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    // Monospace for code/numbers
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  },
  fontSize: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Z-index
export const zIndex = {
  below: -1,
  base: 0,
  dropdown: 100,
  sticky: 150,
  modal: 200,
  overlay: 300,
  toast: 400,
  tooltip: 500,
};

// Transitions - Smooth and refined
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Breakpoints
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Media queries
export const media = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  dark: '@media (prefers-color-scheme: dark)',
  motion: '@media (prefers-reduced-motion: no-preference)',
};

// Common styles with premium feel
export const cardStyle = css`
  background: ${colors.white};
  border-radius: ${radii.large}px;
  box-shadow: ${shadows.medium};
  border: 1px solid ${colors.grey[100]};
`;

export const primaryButtonStyle = css`
  background: ${gradients.primary};
  color: ${colors.white};
  border: none;
  border-radius: ${radii.medium}px;
  padding: ${spacing.md}px ${spacing.xl}px;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.wide};
  cursor: pointer;
  transition: transform ${transitions.fast}, box-shadow ${transitions.fast};
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
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

export const inputStyle = css`
  width: 100%;
  padding: ${spacing.md}px;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.md}px;
  border: 1.5px solid ${colors.grey[200]};
  border-radius: ${radii.medium}px;
  background: ${colors.white};
  transition: border-color ${transitions.fast}, box-shadow ${transitions.fast};

  &:focus {
    outline: none;
    border-color: ${colors.seed};
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: ${colors.grey[400]};
  }
`;

// Glass effect
export const glassStyle = css`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

// Theme object for export
const theme = {
  colors,
  spacing,
  radii,
  shadows,
  gradients,
  typography,
  zIndex,
  transitions,
  breakpoints,
  media,
};

export default theme;

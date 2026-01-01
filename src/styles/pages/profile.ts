import { css, keyframes } from '@emotion/react';
import { colors, spacing, radii, shadows, typography, transitions, gradients } from '@/styles/theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pageWrapper = css`
  min-height: 100vh;
  background: linear-gradient(180deg, #FAFBFF 0%, #F1F5F9 100%);
`;

export const container = css`
  padding: ${spacing.lg}px;
  padding-bottom: 120px;
  max-width: 600px;
  margin: 0 auto;
`;

// Profile Header
export const profileHeader = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.xl}px 0;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const avatarContainer = css`
  position: relative;
  margin-bottom: ${spacing.md}px;
`;

export const avatar = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);

  svg {
    font-size: 48px;
    color: ${colors.white};
  }
`;

export const editAvatarButton = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: ${colors.white};
  border: 2px solid ${colors.grey[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.fast};
  box-shadow: ${shadows.small};

  &:hover {
    transform: scale(1.1);
    border-color: ${colors.seed};
  }

  svg {
    font-size: 16px;
    color: ${colors.grey[600]};
  }
`;

export const userName = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize['2xl']}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
  margin-bottom: ${spacing.xs}px;
`;

export const userEmail = css`
  font-size: ${typography.fontSize.sm}px;
  color: ${colors.grey[500]};
`;

// Menu Section
export const menuSection = css`
  margin-bottom: ${spacing.xl}px;
  animation: ${fadeInUp} 0.5s ease-out 0.1s both;
`;

export const sectionTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.xs}px;
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.grey[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: ${spacing.sm}px;
  padding-left: ${spacing.sm}px;
`;

export const menuCard = css`
  background: ${colors.white};
  border-radius: ${radii.xlarge}px;
  box-shadow: ${shadows.small};
  overflow: hidden;
  border: 1px solid ${colors.grey[100]};
`;

export const menuItem = css`
  display: flex;
  align-items: center;
  gap: ${spacing.md}px;
  padding: ${spacing.md}px ${spacing.lg}px;
  cursor: pointer;
  transition: all ${transitions.fast};
  border-bottom: 1px solid ${colors.grey[50]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${colors.grey[50]};
  }
`;

export const menuIcon = css`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
  border-radius: ${radii.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    color: ${colors.seed};
  }
`;

export const menuContent = css`
  flex: 1;
`;

export const menuLabel = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.grey[900]};
`;

export const menuDescription = css`
  font-size: ${typography.fontSize.xs}px;
  color: ${colors.grey[500]};
  margin-top: 2px;
`;

export const menuArrow = css`
  color: ${colors.grey[400]};

  svg {
    font-size: 20px;
  }
`;

// Danger menu item
export const menuItemDanger = css`
  ${menuItem};

  .menu-icon {
    background: rgba(239, 68, 68, 0.1);

    svg {
      color: ${colors.error};
    }
  }

  &:hover {
    background: rgba(239, 68, 68, 0.05);
  }
`;

export const dangerIcon = css`
  width: 40px;
  height: 40px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: ${radii.medium}px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 20px;
    color: ${colors.error};
  }
`;

export const dangerLabel = css`
  font-size: ${typography.fontSize.md}px;
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.error};
`;

// Version info
export const versionInfo = css`
  text-align: center;
  padding: ${spacing.xl}px;
  color: ${colors.grey[400]};
  font-size: ${typography.fontSize.xs}px;
`;

// Modal
export const modal = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: ${spacing.lg}px;
`;

export const modalContent = css`
  background: ${colors.white};
  border-radius: ${radii.xlarge}px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${shadows['2xl']};
`;

export const modalHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.lg}px;
  border-bottom: 1px solid ${colors.grey[100]};
`;

export const modalTitle = css`
  font-family: ${typography.fontFamily.display};
  font-size: ${typography.fontSize.lg}px;
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.grey[900]};
`;

export const modalClose = css`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${colors.grey[100]};
  border-radius: 50%;
  cursor: pointer;
  transition: all ${transitions.fast};

  &:hover {
    background: ${colors.grey[200]};
  }

  svg {
    font-size: 18px;
    color: ${colors.grey[600]};
  }
`;

export const modalBody = css`
  padding: ${spacing.lg}px;
  color: ${colors.grey[700]};
  font-size: ${typography.fontSize.sm}px;
  line-height: ${typography.lineHeight.relaxed};
`;

// Toggle Switch
export const toggleSwitch = css`
  display: flex;
  align-items: center;
`;

export const toggleTrack = css`
  width: 48px;
  height: 28px;
  background: ${colors.grey[300]};
  border-radius: 14px;
  padding: 2px;
  cursor: pointer;
  transition: all ${transitions.fast};
  position: relative;
`;

export const toggleTrackActive = css`
  background: ${gradients.primary};
`;

export const toggleThumb = css`
  width: 24px;
  height: 24px;
  background: ${colors.white};
  border-radius: 50%;
  box-shadow: ${shadows.small};
  transition: transform ${transitions.fast};

  ${toggleTrackActive} & {
    transform: translateX(20px);
  }
`;

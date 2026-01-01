/** @jsxImportSource @emotion/react */
import React from 'react';
import * as styles from './styles';

// StyledCard Component
interface StyledCardProps {
    children: React.ReactNode;
    onClick?: () => void;
    animate?: boolean;
    className?: string;
}

export const StyledCard: React.FC<StyledCardProps> = ({
    children,
    onClick,
    animate = true,
    className,
}) => {
    return (
        <div
            css={[
                styles.styledCard,
                onClick && styles.styledCardClickable,
                animate && styles.styledCardAnimated,
            ]}
            onClick={onClick}
            className={className}
        >
            {children}
        </div>
    );
};

// GradientButton Component
interface GradientButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    children,
    onClick,
    disabled = false,
    isLoading = false,
    icon,
    type = 'button',
    fullWidth = false,
}) => {
    return (
        <button
            type={type}
            css={[
                styles.gradientButton,
                disabled && styles.gradientButtonDisabled,
                fullWidth && { width: '100%' },
            ]}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
};

// AnimatedBackground Component
export const AnimatedBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div css={styles.animatedBackground} />
            {children}
        </>
    );
};

// ShimmerLoading Component
interface ShimmerLoadingProps {
    width?: string | number;
    height?: string | number;
}

export const ShimmerLoading: React.FC<ShimmerLoadingProps> = ({
    width = '100%',
    height = 20,
}) => {
    return (
        <div
            css={styles.shimmerLoading}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
            }}
        />
    );
};

// LoadingSpinner Component
export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
    return (
        <div
            css={styles.loadingSpinner}
            style={{ width: size, height: size }}
        />
    );
};

// LoadingIndicator Component (full page)
export const LoadingIndicator: React.FC = () => {
    return (
        <div css={styles.loadingContainer}>
            <LoadingSpinner size={40} />
        </div>
    );
};

export default {
    StyledCard,
    GradientButton,
    AnimatedBackground,
    ShimmerLoading,
    LoadingSpinner,
    LoadingIndicator,
};

import React from 'react';
import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { theme } from '../../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends SpaceProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const buttonSizes: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    height: 32px;
    padding: 0 ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  `,
  md: css`
    height: 40px;
    padding: 0 ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.md};
  `,
  lg: css`
    height: 48px;
    padding: 0 ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize.lg};
  `,
};

const buttonVariants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: #1976D2;
    color: ${theme.colors.text.white};
    border: none;

    &:hover:not(:disabled) {
      background-color: #1565C0;
    }

    &:active:not(:disabled) {
      background-color: #0D47A1;
    }
  `,
  secondary: css`
    background-color: transparent;
    color: #1976D2;
    border: 1px solid #1976D2;

    &:hover:not(:disabled) {
      background-color: rgba(25, 118, 210, 0.08);
    }

    &:active:not(:disabled) {
      background-color: rgba(25, 118, 210, 0.16);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.default};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.background.secondary};
      border-color: ${theme.colors.border.hover};
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.background.contrast};
    }
  `,
  text: css`
    background-color: transparent;
    color: #1976D2;
    border: none;
    padding: 0 ${theme.spacing.sm};

    &:hover:not(:disabled) {
      background-color: rgba(25, 118, 210, 0.08);
    }

    &:active:not(:disabled) {
      background-color: rgba(25, 118, 210, 0.16);
    }
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;

  ${({ $size }) => buttonSizes[$size]}
  ${({ $variant }) => buttonVariants[$variant]}
  
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #1976D2;
    outline-offset: 2px;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

  ${space}
`;

const LoaderIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderIcon /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </StyledButton>
  );
};

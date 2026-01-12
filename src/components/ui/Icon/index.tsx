import React from 'react';
import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { theme } from '../../../theme';

export type IconName =
  | 'search'
  | 'close'
  | 'eye'
  | 'eyeOff'
  | 'check'
  | 'error'
  | 'info'
  | 'warning'
  | 'chevronDown'
  | 'chevronUp'
  | 'calendar'
  | 'user'
  | 'mail'
  | 'phone'
  | 'lock'
  | 'currency'
  | 'loader'
  | 'success'
  | 'failure';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends SpaceProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const iconSizes: Record<IconSize, string> = {
  sm: '16px',
  md: '20px',
  lg: '24px',
};

const iconPaths: Record<IconName, string> = {
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  close: 'M6 18L18 6M6 6l12 12',
  eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  eyeOff: 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21',
  check: 'M5 13l4 4L19 7',
  error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  currency: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  loader: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  failure: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
};

const StyledIconWrapper = styled.span<{
  $size: IconSize;
  $color?: string;
  $clickable: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => iconSizes[$size]};
  height: ${({ $size }) => iconSizes[$size]};
  color: ${({ $color, $disabled }) =>
    $disabled ? theme.colors.icon.disabled : $color || theme.colors.icon.default};
  transition: color ${theme.transitions.fast};
  
  ${({ $clickable, $disabled }) =>
    $clickable &&
    !$disabled &&
    css`
      cursor: pointer;
      &:hover {
        color: ${theme.colors.icon.hover};
      }
    `}
  
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
  
  ${space}
`;

const StyledSvg = styled.svg<{ $isLoader: boolean }>`
  width: 100%;
  height: 100%;
  
  ${({ $isLoader }) =>
    $isLoader &&
    css`
      animation: spin 1s linear infinite;
      
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color,
  className,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  ...spaceProps
}) => {
  const path = iconPaths[name];
  const isLoader = name === 'loader';

  return (
    <StyledIconWrapper
      $size={size}
      $color={color}
      $clickable={!!onClick}
      $disabled={disabled}
      className={className}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel || name}
      aria-disabled={disabled}
      {...spaceProps}
    >
      <StyledSvg
        $isLoader={isLoader}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </StyledSvg>
    </StyledIconWrapper>
  );
};

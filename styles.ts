import styled, { css } from 'styled-components';
import { FlexBox, RelativeBox, Box } from '../ui/Box';
import { Typography } from '../ui/Typography';
import { theme } from '../../theme';
import { InputSize, InputMode, InputState } from './types';

interface StyledInputWrapperProps {
  $fullWidth: boolean;
}

interface StyledInputContainerProps {
  $size: InputSize;
  $mode: InputMode;
  $state: InputState;
  $error: boolean;
  $highlightBorder: boolean;
  $darkTheme: boolean;
  $hasLeftIcon: boolean;
  $hasRightZone: boolean;
  $labelInside: boolean;
}

interface StyledNativeInputProps {
  $size: InputSize;
  $labelInside: boolean;
  $darkTheme: boolean;
  $hasValue: boolean;
}

const getInputHeight = (size: InputSize): string => {
  switch (size) {
    case '48':
      return '48px';
    case '56':
      return '56px';
    case '64':
      return '64px';
  }
};

const getBackgroundColor = (
  mode: InputMode,
  state: InputState,
  darkTheme: boolean
): string => {
  const colors = darkTheme ? theme.colors.dark : theme.colors;
  
  if (state === 'disabled') {
    return colors.background.disabled;
  }
  
  switch (mode) {
    case 'border':
      return darkTheme ? colors.background.primary : 'transparent';
    case 'solidNormal':
      return colors.background.secondary;
    case 'solidContrast':
      return colors.background.contrast;
  }
};

const getBorderColor = (
  mode: InputMode,
  state: InputState,
  error: boolean,
  highlightBorder: boolean,
  darkTheme: boolean
): string => {
  const colors = darkTheme ? theme.colors.dark : theme.colors;
  
  if (error && state !== 'focus' && state !== 'disabled') {
    return colors.border.error;
  }
  
  if (state === 'disabled') {
    return colors.border.disabled;
  }
  
  if (state === 'focus' || state === 'active') {
    return colors.border.focus;
  }
  
  if (highlightBorder) {
    return error ? colors.border.error : colors.border.focus;
  }
  
  if (state === 'normalHover' || state === 'filledHover') {
    return colors.border.hover;
  }
  
  if (mode === 'border') {
    return colors.border.default;
  }
  
  return 'transparent';
};

const getBorderWidth = (
  state: InputState,
  highlightBorder: boolean
): string => {
  if (state === 'focus' || state === 'active' || highlightBorder) {
    return '2px';
  }
  return '1px';
};

const getBoxShadow = (
  state: InputState,
  error: boolean,
  highlightBorder: boolean
): string => {
  if (state === 'focus' || state === 'active') {
    return error ? theme.shadows.error : theme.shadows.focus;
  }
  return 'none';
};

export const InputWrapper = styled(FlexBox)<StyledInputWrapperProps>`
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: ${({ $fullWidth }) => ($fullWidth ? 'auto' : '200px')};
  max-width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    min-width: auto;
  }
`;

export const LabelWrapper = styled(FlexBox)`
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const StyledLabel = styled(Typography)<{ $darkTheme: boolean; $disabled: boolean }>`
  color: ${({ $darkTheme, $disabled }) => {
    if ($disabled) {
      return $darkTheme ? theme.colors.dark.text.disabled : theme.colors.text.disabled;
    }
    return $darkTheme ? theme.colors.dark.text.primary : theme.colors.text.primary;
  }};
`;

export const RequiredIndicator = styled.span<{ $darkTheme: boolean }>`
  color: ${({ $darkTheme }) =>
    $darkTheme ? theme.colors.dark.text.error : theme.colors.text.error};
`;

export const InputContainer = styled(RelativeBox)<StyledInputContainerProps>`
  display: flex;
  align-items: center;
  height: ${({ $size }) => getInputHeight($size)};
  background-color: ${({ $mode, $state, $darkTheme }) =>
    getBackgroundColor($mode, $state, $darkTheme)};
  border: ${({ $mode, $state, $error, $highlightBorder, $darkTheme }) =>
    `${getBorderWidth($state, $highlightBorder)} solid ${getBorderColor(
      $mode,
      $state,
      $error,
      $highlightBorder,
      $darkTheme
    )}`};
  border-radius: ${theme.borderRadius.md};
  padding: 0 ${theme.spacing.md};
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? theme.spacing.sm : theme.spacing.md)};
  padding-right: ${({ $hasRightZone }) => ($hasRightZone ? theme.spacing.sm : theme.spacing.md)};
  box-shadow: ${({ $state, $error, $highlightBorder }) =>
    getBoxShadow($state, $error, $highlightBorder)};
  transition: all ${theme.transitions.fast};
  cursor: ${({ $state }) => ($state === 'disabled' ? 'not-allowed' : 'text')};
  
  ${({ $labelInside, $size }) =>
    $labelInside &&
    ($size === '56' || $size === '64') &&
    css`
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-top: ${theme.spacing.xs};
    `}
  
  &:hover {
    ${({ $state, $mode, $error, $highlightBorder, $darkTheme }) =>
      $state !== 'disabled' &&
      $state !== 'focus' &&
      $state !== 'active' &&
      css`
        border-color: ${getBorderColor(
          $mode,
          'normalHover',
          $error,
          $highlightBorder,
          $darkTheme
        )};
      `}
  }
`;

export const InputContent = styled(FlexBox)<{ $labelInside: boolean }>`
  flex: 1;
  align-items: center;
  gap: ${theme.spacing.sm};
  min-width: 0;
  width: 100%;
  
  ${({ $labelInside }) =>
    $labelInside &&
    css`
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    `}
`;

export const InsideLabel = styled(Typography)<{ $darkTheme: boolean; $hasValue: boolean }>`
  font-size: ${theme.typography.fontSize.xs};
  color: ${({ $darkTheme }) =>
    $darkTheme ? theme.colors.dark.text.secondary : theme.colors.text.secondary};
  transition: all ${theme.transitions.fast};
  line-height: 1;
  
  ${({ $hasValue }) =>
    !$hasValue &&
    css`
      font-size: ${theme.typography.fontSize.sm};
    `}
`;

export const NativeInput = styled.input<StyledNativeInputProps>`
  flex: 1;
  width: 100%;
  min-width: 0;
  height: ${({ $labelInside, $size }) => {
    if ($labelInside && ($size === '56' || $size === '64')) {
      return 'auto';
    }
    return '100%';
  }};
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.regular};
  color: ${({ $darkTheme }) =>
    $darkTheme ? theme.colors.dark.text.primary : theme.colors.text.primary};
  
  &::placeholder {
    color: ${({ $darkTheme }) =>
      $darkTheme ? theme.colors.dark.text.placeholder : theme.colors.text.placeholder};
  }
  
  &:disabled {
    cursor: not-allowed;
    color: ${({ $darkTheme }) =>
      $darkTheme ? theme.colors.dark.text.disabled : theme.colors.text.disabled};
  }
  
  /* Hide default number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type='number'] {
    -moz-appearance: textfield;
  }
  
  /* Auto-scale text for long values */
  &[data-autoscale='true'] {
    font-size: clamp(50%, ${theme.typography.fontSize.md}, 100%);
  }
`;

export const CurrencySymbol = styled(Typography)<{ $darkTheme: boolean; $disabled: boolean }>`
  color: ${({ $darkTheme, $disabled }) => {
    if ($disabled) {
      return $darkTheme ? theme.colors.dark.text.disabled : theme.colors.text.disabled;
    }
    return $darkTheme ? theme.colors.dark.text.primary : theme.colors.text.primary;
  }};
  font-size: ${theme.typography.fontSize.md};
  margin-left: ${theme.spacing.xs};
  flex-shrink: 0;
`;

export const HiddenValue = styled(Box)<{ $darkTheme: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ $darkTheme, $disabled }) => {
    if ($disabled) {
      return $darkTheme ? theme.colors.dark.text.disabled : theme.colors.text.disabled;
    }
    return $darkTheme ? theme.colors.dark.text.primary : theme.colors.text.primary;
  }};
`;

export const HiddenDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
`;

export const LeftIconWrapper = styled(FlexBox)<{ $clickable: boolean }>`
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

export const RightZoneWrapper = styled(FlexBox)`
  align-items: center;
  gap: ${theme.spacing.xs};
  flex-shrink: 0;
  margin-left: ${theme.spacing.sm};
`;

export const IconButton = styled.button<{ $darkTheme: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  background: transparent;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  color: ${({ $darkTheme }) =>
    $darkTheme ? theme.colors.dark.icon.default : theme.colors.icon.default};
  
  &:hover {
    background-color: ${({ $darkTheme }) =>
      $darkTheme
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ $darkTheme }) =>
      $darkTheme ? theme.colors.dark.icon.hover : theme.colors.icon.hover};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const DescriptionWrapper = styled(FlexBox)`
  align-items: flex-start;
  gap: ${theme.spacing.xs};
`;

export const StyledDescription = styled(Typography)<{
  $darkTheme: boolean;
  $error: boolean;
  $disabled: boolean;
}>`
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  color: ${({ $darkTheme, $error, $disabled }) => {
    if ($disabled) {
      return $darkTheme ? theme.colors.dark.text.disabled : theme.colors.text.disabled;
    }
    if ($error) {
      return $darkTheme ? theme.colors.dark.text.error : theme.colors.text.error;
    }
    return $darkTheme ? theme.colors.dark.text.secondary : theme.colors.text.secondary;
  }};
`;

import React from 'react';
import { IconName } from '../ui/Icon';

export type InputSize = '48' | '56' | '64';
export type InputMode = 'border' | 'solidNormal' | 'solidContrast';
export type InputState = 'normal' | 'normalHover' | 'focus' | 'active' | 'filled' | 'filledHover' | 'disabled';

export type RightZoneIconType = 'standard' | 'neutral' | 'success' | 'failure';

export interface RightZoneConfig {
  showHint?: boolean;
  showDelete?: boolean;
  showLoader?: boolean;
  iconType?: RightZoneIconType;
  icon?: IconName;
  button?: React.ReactNode;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size: 48px, 56px, or 64px height */
  size?: InputSize;
  
  /** Input visual mode */
  mode?: InputMode;
  
  /** Label text */
  label?: string;
  
  /** Whether label is inside the input field (only for 56px and 64px sizes) */
  labelInside?: boolean;
  
  /** Required field indicator */
  required?: boolean;
  
  /** Pre-label text (displayed before label) */
  prelabel?: string;
  
  /** Icon next to label */
  labelIcon?: IconName;
  
  /** Description/helper text below input */
  description?: string;
  
  /** Icon next to description */
  descriptionIcon?: IconName;
  
  /** Error state */
  error?: boolean;
  
  /** Error message (replaces description when error is true) */
  errorMessage?: string;
  
  /** Highlight border (visual accent) */
  highlightBorder?: boolean;
  
  /** Left icon inside input */
  leftIcon?: IconName;
  
  /** Show currency symbol */
  showCurrency?: boolean;
  
  /** Currency symbol to display */
  currencySymbol?: string;
  
  /** Right zone configuration */
  rightZone?: RightZoneConfig;
  
  /** Hidden/password mode (shows dots instead of text) */
  hidden?: boolean;
  
  /** Callback when visibility toggle is clicked */
  onToggleVisibility?: () => void;
  
  /** Full width mode */
  fullWidth?: boolean;
  
  /** Dark theme */
  darkTheme?: boolean;
  
  /** Input value */
  value?: string;
  
  /** Default value */
  defaultValue?: string;
  
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Focus handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  
  /** Click handler for left icon */
  onLeftIconClick?: () => void;
  
  /** Click handler for right zone delete icon */
  onDelete?: () => void;
  
  /** Click handler for right zone hint icon */
  onHintClick?: () => void;
  
  /** Custom class name */
  className?: string;
  
  /** Unique ID for accessibility (auto-generated if not provided) */
  id?: string;
}

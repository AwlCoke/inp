export const theme = {
  colors: {
    // Text colors
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
      placeholder: '#999999',
      disabled: '#BDBDBD',
      error: '#E53935',
      white: '#FFFFFF',
    },
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      contrast: '#E8E8E8',
      disabled: '#FAFAFA',
      error: '#FFEBEE',
    },
    // Border colors
    border: {
      default: '#E0E0E0',
      hover: '#BDBDBD',
      focus: '#1976D2',
      active: '#1976D2',
      error: '#E53935',
      disabled: '#EEEEEE',
    },
    // Icon colors
    icon: {
      default: '#666666',
      hover: '#333333',
      disabled: '#BDBDBD',
      success: '#4CAF50',
      error: '#E53935',
    },
    // Dark theme
    dark: {
      text: {
        primary: '#FFFFFF',
        secondary: '#B0B0B0',
        placeholder: '#808080',
        disabled: '#606060',
        error: '#EF5350',
      },
      background: {
        primary: '#1E1E1E',
        secondary: '#2D2D2D',
        contrast: '#3D3D3D',
        disabled: '#252525',
        error: '#3D2020',
      },
      border: {
        default: '#404040',
        hover: '#606060',
        focus: '#42A5F5',
        active: '#42A5F5',
        error: '#EF5350',
        disabled: '#303030',
      },
      icon: {
        default: '#B0B0B0',
        hover: '#FFFFFF',
        disabled: '#606060',
        success: '#66BB6A',
        error: '#EF5350',
      },
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '18px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
  shadows: {
    focus: '0 0 0 2px rgba(25, 118, 210, 0.2)',
    error: '0 0 0 2px rgba(229, 57, 53, 0.2)',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
} as const;

export type Theme = typeof theme;

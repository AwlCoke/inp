import styled, { css } from 'styled-components';
import {
  typography,
  space,
  color,
  layout,
  TypographyProps as SSTypographyProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
} from 'styled-system';
import { theme } from '../../../theme';

type TypographyVariant = 
  | 'label'
  | 'labelSmall'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'placeholder'
  | 'value';

export interface TypographyProps
  extends SSTypographyProps,
    SpaceProps,
    ColorProps,
    LayoutProps {
  variant?: TypographyVariant;
  truncate?: boolean;
  maxLines?: number;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<TypographyVariant, ReturnType<typeof css>> = {
  label: css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
  `,
  labelSmall: css`
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.secondary};
  `,
  body: css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
  `,
  bodySmall: css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.secondary};
  `,
  caption: css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.relaxed};
    color: ${theme.colors.text.secondary};
  `,
  placeholder: css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.placeholder};
  `,
  value: css`
    font-size: ${theme.typography.fontSize.md};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
  `,
};

export const Typography = styled.span<TypographyProps>`
  font-family: ${theme.typography.fontFamily};
  margin: 0;
  padding: 0;
  
  ${({ variant = 'body' }) => variantStyles[variant]}
  
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  
  ${({ maxLines }) =>
    maxLines &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
  
  ${typography}
  ${space}
  ${color}
  ${layout}
`;

Typography.defaultProps = {
  variant: 'body',
};

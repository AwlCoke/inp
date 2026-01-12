import styled from 'styled-components';
import {
  space,
  layout,
  color,
  flexbox,
  grid,
  position,
  border,
  shadow,
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  PositionProps,
  BorderProps,
  ShadowProps,
} from 'styled-system';

export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    ColorProps,
    BorderProps,
    ShadowProps {
  as?: keyof JSX.IntrinsicElements;
}

export interface FlexBoxProps extends BoxProps, FlexboxProps {}

export interface GridBoxProps extends BoxProps, GridProps {}

export interface PositionBoxProps extends BoxProps, PositionProps {}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${layout}
  ${color}
  ${border}
  ${shadow}
`;

export const FlexBox = styled(Box)<FlexBoxProps>`
  display: flex;
  ${flexbox}
`;

export const GridBox = styled(Box)<GridBoxProps>`
  display: grid;
  ${grid}
`;

export const RelativeBox = styled(Box)<PositionBoxProps>`
  position: relative;
  ${position}
`;

export const AbsoluteBox = styled(Box)<PositionBoxProps>`
  position: absolute;
  ${position}
`;

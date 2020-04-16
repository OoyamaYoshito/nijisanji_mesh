import React, { FC, useRef, useEffect } from 'react';
import { LinkData } from './types';
import * as d3 from 'd3';
import styled from '@emotion/styled';
import theme from '../../style/theme';
import mixColor from 'mix-color';

export const Link: FC<{ data: LinkData; weight: number }> = ({
  data,
  weight,
}) => {
  const line = useRef(null);
  useEffect(() => {
    if (line.current === null) return;
    const root = d3.select(line.current);
    root.datum(data);
    return () => {
      root.datum();
    };
  });
  return (
    <StyledLineRoot
      className="link"
      ref={line}
      weight={weight}
    ></StyledLineRoot>
  );
};

const StyledLineRoot = styled.line<{ weight: number }>`
  stroke: ${({ weight }) =>
    mixColor(theme.colors.main, theme.colors.accent, weight)};
  stroke-width: ${({ weight }) => weight * 7 + 2};
  opacity: 1;
`;

export default Link;

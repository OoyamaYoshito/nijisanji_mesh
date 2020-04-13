import React, { FC, useRef, useEffect } from 'react';
import { LinkData } from './types';
import * as d3 from 'd3';
import styled from '@emotion/styled';
import theme from '../../style/theme';

export const Link: FC<{ data: LinkData }> = ({ data }) => {
  const line = useRef(null);
  useEffect(() => {
    if (line.current === null) return;
    const root = d3.select(line.current);
    root.datum(data);
    return () => {
      root.datum();
    };
  });
  return <StyledLineRoot className="link" ref={line}></StyledLineRoot>;
};

const StyledLineRoot = styled.line`
  stroke: ${theme.colors.accent};
  opacity: 1;
`;

export default Link;

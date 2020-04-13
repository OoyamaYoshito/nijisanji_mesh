import React, { FC, useRef, useEffect } from 'react';
import { NodeData, ForceSimulation } from './types';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import theme from '../../style/theme';

export const Node: FC<{
  data: NodeData;
  force_simulation: ForceSimulation;
}> = ({ data, force_simulation }) => {
  const root_element = useRef<SVGCircleElement | null>(null);
  useEffect(() => {
    if (root_element.current === null) return;
    const root = d3.select(root_element.current);

    root.datum(data);

    return () => {
      root.datum();
    };
  });

  //drag event
  useEffect(() => {
    if (root_element.current === null) return;
    d3.select(root_element.current as Element).call(
      d3
        .drag()
        .on('start', (d: any) => {
          force_simulation.alphaTarget(0.1).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (d: any) => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on('end', (d: any) => {
          d.fx = null;
          d.fy = null;
        })
    );
  });

  return (
    <StyledNodeRoot className="node" ref={root_element}>
      <circle r={15} />
      <text y={7}>{data.name}</text>
    </StyledNodeRoot>
  );
};

const StyledNodeRoot = styled.g`
  circle {
    stroke: #2a4b71;
    stroke-width: 2px;
    fill: ${theme.colors.base};
  }
`;

export default Node;

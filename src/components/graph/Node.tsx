import React, { FC, useRef, useEffect } from 'react';
import { NodeData } from './types';
import * as d3 from 'd3';

export const Node: FC<{
  data: NodeData;
}> = ({ data }) => {
  const root_element = useRef<SVGCircleElement | null>(null);
  useEffect(() => {
    if (root_element.current === null) return;
    const root = d3.select(root_element.current);

    root.datum(data);

    return () => {
      root.datum();
    };
  });

  return (
    <g className="node" ref={root_element}>
      <circle r={15} />
      <text y={7}>{data.name}</text>
    </g>
  );
};

export default Node;

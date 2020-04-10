import React, { FC, useRef, useEffect, useMemo } from 'react';
import { NodeData, LinkData } from './types';
import getInitializedForce from './forceSimulation';
import { useWindowSize } from '@react-hook/window-size';
import styled from '@emotion/styled';
import Link from './Link';
import Node from './Node';

export const Graph: FC<{ nodes: NodeData[]; links: LinkData[] }> = ({
  nodes,
  links,
}) => {
  const [width, height] = useWindowSize();
  const force = useMemo(
    () =>
      getInitializedForce(nodes, links, {
        classname: { node: 'node', link: 'link' },
        window_size: { width, height },
        link_distance: 100,
      }),
    [width, height, nodes, links]
  );
  const svg = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (svg.current === null) return;
    force.registerGraph(svg.current);
  });

  //components
  const link_components = links.map((x) => <Link data={x} key={x.id} />);
  const node_components = nodes.map((x) => <Node data={x} key={x.id} />);

  return (
    <GraphRoot ref={svg}>
      <g>
        {link_components}
        {node_components}
      </g>
    </GraphRoot>
  );
};

const GraphRoot = styled.svg`
  display: block;
  width: 100%;
  height: 100vh;

  * {
    transition: fill ease 0.5s, opacity ease 0.5s;
  }
`;

export default Graph;

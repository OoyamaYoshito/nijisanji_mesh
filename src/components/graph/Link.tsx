import React, { FC, useRef, useEffect } from 'react';
import { LinkData } from './types';
import * as d3 from 'd3';

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
  return <line className="link" ref={line} stroke="#000"></line>;
};

export default Link;

import React, { FC } from 'react';
import PairRanking from './PairRanking';
import { Global } from '@emotion/core';
import global_styles from '../style/global';
import Graph from './graph/Graph';
import { nodes, links, filterLinksByDegree } from './DataProcessingUtill';

const App: FC<{}> = () => (
  <div className="App">
    <Global styles={global_styles} />
    <Graph nodes={nodes} links={filterLinksByDegree(links, 4, 1)} />
    <PairRanking />
  </div>
);

export default App;

import React, { FC } from 'react';
import PairRanking from './PairRanking';
import { Global } from '@emotion/core';
import global_styles from '../style/global';
import Graph from './graph/Graph';
import styled from '@emotion/styled';
import { nodes, links, filterLinksByDegree } from './DataProcessingUtill';
import theme from '../style/theme';
import Menu from './Menu';

const App: FC<{}> = () => (
  <div className="App">
    <Global styles={global_styles} />
    <Graph nodes={nodes} links={filterLinksByDegree(links, 3, 1)} />
    <ShadowRoot>
      <PairRanking />
    </ShadowRoot>
    <Menu />
  </div>
);

const ShadowRoot = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

export default App;

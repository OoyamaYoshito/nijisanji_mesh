import React, { FC } from 'react';
import PairRanking from './PairRanking';
import { Global } from '@emotion/core';
import global_styles from '../style/global';
import Graph from './graph/graph';

const App: FC<{}> = () => (
  <div className="App">
    <Global styles={global_styles} />
    <Graph
      nodes={[
        { id: 0, name: '月ノ' },
        { id: 1, name: '樋口' },
        { id: 2, name: '静' },
      ]}
      links={[
        { id: 0, source: 0, target: 1, num: 1000 },
        { id: 1, source: 1, target: 2, num: 1500 },
      ]}
    />
    <PairRanking />
  </div>
);

export default App;

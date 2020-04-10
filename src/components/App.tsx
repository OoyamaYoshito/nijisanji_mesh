import React, { FC } from 'react';
import PairRanking from './PairRanking';
import { Global } from '@emotion/core';
import global_styles from '../style/global';

const App: FC<{}> = () => (
  <div className="App">
    <Global styles={global_styles} />
    <PairRanking />
  </div>
);

export default App;

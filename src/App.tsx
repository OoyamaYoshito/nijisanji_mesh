import React, { FC } from 'react';
import './App.css';

const Hello: FC<{}> = () => <div>hello</div>;

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;

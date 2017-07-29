import React from 'react';

// Components
import DropNotifier from '../DropNotifier/DropNotifier';
import Main from '../Main/Main';
import TopBar from '../TopBar/TopBar';

import './App.scss';

const App = () => (
  <div className='app full-dim'>
    <DropNotifier />
    <TopBar />
    <Main />
  </div>
);

export default App;

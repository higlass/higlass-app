import React from 'react';

// Components
import Icon from './Icon';

// Styles
import './BottomBar.scss';

const BottomBar = () => (
  <footer className='flex-c flex-jc-sb bottom-bar'>
    <ul className='flex-c flex-a-c no-list-style'>
      <li><button>Test</button></li>
    </ul>
    <ul className='flex-c flex-a-c flex-jc-e no-list-style'>
      <li><button>Test</button></li>
      <li><button><Icon iconId='info' /></button></li>
      <li>v1.0.0</li>
    </ul>
  </footer>
);

export default BottomBar;

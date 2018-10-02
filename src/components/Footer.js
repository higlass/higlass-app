import React from 'react';

import { NavLink } from 'react-router-dom';

// Components
import Icon from './Icon';

// Styles
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="wrap flex-c flex-a-c flex-jc-sb">
      <div className="flex-c flex-a-c flex-v">
        <div className="flex-c">
          <Icon iconId="logo-hms" title="Harvard Medical School" />
          <Icon iconId="logo-seas" title="Harvard John A. Paulson School of Engineering and Applied Sciences" />
          <Icon iconId="logo-mit" title="Massachusetts Institute of Technology" />
        </div>
        <p className="copyright">&copy; 2017 <NavLink to='/about#copyright'>Harvard College</NavLink>.</p>
      </div>

      <nav>
        <ul className='flex-c flex-jc-e flex-a-s no-list-style'>
          <li><NavLink exact to='/' activeClassName='is-active'>Home</NavLink></li>
          <li><NavLink exact to='/about' activeClassName='is-active'>About</NavLink></li>
          <li><NavLink exact to='/examples' activeClassName='is-active'>Examples</NavLink></li>
          <li><NavLink exact to='/plugins' activeClassName='is-active'>Plugins</NavLink></li>
          <li><NavLink exact to='/docs' activeClassName='is-active'>Docs</NavLink></li>
          <li><NavLink exact to='/help' activeClassName='is-active'>Help</NavLink></li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;

import React from 'react';

import { NavLink } from 'react-router-dom';

// Components
import Icon from '../Icon/Icon';

import './Footer.scss';

const Footer = () => (
  <footer className="footer m-t-2 p-t-2 p-b-2">
    <div className="wrap">
      <div className="flex-c flex-jc-c">
        <Icon iconId="logo-hms" title="Harvard Medical School" />
        <Icon iconId="logo-seas" title="Harvard John A. Paulson School of Engineering and Applied Sciences" />
        <Icon iconId="logo-mit" title="Massachusetts Institute of Technology" />
      </div>

      <nav>
        <ul className='flex-c flex-jc-c flex-a-s no-list-style'>
          <li><NavLink to='/' activeClassName='is-active'>Home</NavLink></li>
          <li><NavLink to='/about' activeClassName='is-active'>About</NavLink></li>
          <li><NavLink to='/examples' activeClassName='is-active'>Examples</NavLink></li>
          <li><NavLink to='/docs' activeClassName='is-active'>Docs</NavLink></li>
        </ul>
      </nav>

      <p className="copyright centered">Copyright &copy; 2017 the President and Fellows of Harvard College.<br/>All content on this website is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode" target="_blank" rel="noopener noreferrer">Creative Commons Attribution license (CC BY)</a>. Copyright of the linked papers is with the publishers.</p>
    </div>
  </footer>
)

export default Footer;

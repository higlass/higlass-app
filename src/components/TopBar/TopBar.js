import React from 'react';

import { Link } from 'react-router-dom';

// Components
import Icon from '../Icon/Icon';

import './TopBar.scss';

const TopBar = () => (
  <header className="top-bar">
    <div className="wrap flex-c flex-jc-sb">
      <div className="flex-c branding-launch">
        <Link to='/' className="branding">
          <span className="higlass"><span className="higlass-hi">Hi</span>Glass</span>
        </Link>
        <a
          href="app/"
          className="btn is-uppercased icon-only"
          title="Launch HiGlass in Full Screen">
          <Icon iconId="maximize" />
        </a>
      </div>
      <nav className="flex-c flex-jc-e flex-a-s is-toggable">
        <ul className="flex-c flex-jc-e flex-a-s no-list-style">
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/examples'>Examples</Link></li>
          <li><Link to='/docs'>Docs</Link></li>
          <li className="separated-left flex-c flex-jc-c">
            <a
              href="https://github.com/hms-dbmi?&q=higlass"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-only flex-c flex-a-c">
              <Icon iconId="github" />
            </a>
          </li>
        </ul>
        <button
          className="menu-toggler c-hamburger c-hamburger--htx"><span></span>
        </button>
      </nav>
    </div>
  </header>
)

export default TopBar;

import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

// Components
import Hamburger from './Hamburger';
import Icon from './Icon';

// Styles
import './TopBar.scss';

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsShown: false,
    };
  }

  render() {
    return (
      <header className='top-bar'>
        <div className={`flex-c flex-jc-sb top-bar-wrapper ${!new URLSearchParams(this.props.location.search).get('config') ? 'wrap' : 'wrap-basic'}`}>
          <div className='flex-c branding-launch'>
            <NavLink to='/' className='flex-c flex-a-c branding'>
              <Icon iconId='logo-two-tone' />
              <span className='higlass'><span className='higlass-hi'>Hi</span>Glass</span>
            </NavLink>
            <NavLink
              to='/?config=example'
              className='btn is-uppercased icon-only'
              title='Launch HiGlass in Full Screen'>
              <Icon iconId='maximize' />
            </NavLink>
          </div>
          <nav className={`flex-c flex-jc-e flex-a-s is-toggable ${this.state.menuIsShown ? 'is-shown' : ''}`}>
            <ul className='flex-c flex-jc-e flex-a-s no-list-style'>
              <li><NavLink to='/about' activeClassName='is-active'>About</NavLink></li>
              <li><NavLink to='/examples' activeClassName='is-active'>Examples</NavLink></li>
              <li><NavLink to='/docs' activeClassName='is-active'>Docs</NavLink></li>
              <li className='separated-left flex-c flex-jc-c'>
                <a
                  href='https://github.com/hms-dbmi?&q=higlass'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='icon-only flex-c flex-a-c flex-jc-c'>
                  <Icon iconId='github' />
                </a>
              </li>
            </ul>
            <Hamburger onClick={this.toggleMenu.bind(this)} />
          </nav>
        </div>
      </header>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  toggleMenu(isOpen) {
    this.setState({
      menuIsShown: isOpen,
    });
  }
}

TopBar.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(TopBar);

import PropTypes from 'prop-types';
import React from 'react';

import './SideBar.scss';

const SideBar = props => (
  <aside className='side-bar'>
    {props.children}
  </aside>
);

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideBar;

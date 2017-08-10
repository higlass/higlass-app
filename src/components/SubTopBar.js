import PropTypes from 'prop-types';
import React from 'react';

// Styles
import './SubTopBar.scss';

const SubTopBar = props => (
  <header className='flex-c flex-a-c flex-jc-sb sub-top-bar'>
    {props.children}
  </header>
);

SubTopBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubTopBar;

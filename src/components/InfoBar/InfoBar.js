import PropTypes from 'prop-types';
import React from 'react';

import './InfoBar.scss';

const InfoBar = props => (
  <header className='info-bar'>
    <div className={props.wrap && 'wrap'}>
      {props.children}
    </div>
  </header>
);

InfoBar.propTypes = {
  children: PropTypes.node.isRequired,
  wrap: PropTypes.bool,
};

export default InfoBar;

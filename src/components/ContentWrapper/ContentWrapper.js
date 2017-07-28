import PropTypes from 'prop-types';

import React from 'react';

import './ContentWrapper.scss';

const ContentWrapper = props => (
  <div className={`content-wrapper flex-c flex-v full-dim ${props.bottomBar ? 'content-wrapper-bottom-bar' : ''}`}>
    {props.children}
  </div>
);

ContentWrapper.defaultProps = {
  bottomBar: false,
};

ContentWrapper.propTypes = {
  bottomBar: PropTypes.node.bool,
  children: PropTypes.node,
};

export default ContentWrapper;

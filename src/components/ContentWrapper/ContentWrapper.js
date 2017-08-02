import PropTypes from 'prop-types';
import React from 'react';

const ContentWrapper = props => (
  <div
    className={`content-wrapper flex-c flex-v full-mdim ${props.bottomBar ? 'content-wrapper-bottom-bar' : ''}`}>
    {props.children}
  </div>
);

ContentWrapper.defaultProps = {
  bottomBar: false,
};

ContentWrapper.propTypes = {
  bottomBar: PropTypes.bool,
  children: PropTypes.node,
};

export default ContentWrapper;

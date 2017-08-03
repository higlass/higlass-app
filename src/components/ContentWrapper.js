import PropTypes from 'prop-types';
import React from 'react';

const ContentWrapper = props => (
  <div
    className={`flex-c flex-v full-mdim content-wrapper ${props.name} ${props.bottomBar ? 'content-wrapper-bottom-bar' : ''}`}>
    {props.children}
  </div>
);

ContentWrapper.defaultProps = {
  bottomBar: false,
};

ContentWrapper.propTypes = {
  bottomBar: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default ContentWrapper;

import PropTypes from 'prop-types';
import React from 'react';

// Services
import scroll from '../../services/scroll';

import './ContentWrapper.scss';

const ContentWrapper = props => (
  <div
    className={`content-wrapper flex-c flex-v full-dim ${props.bottomBar ? 'content-wrapper-bottom-bar' : ''}`}
    ref={el => scroll.register(el)}>
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

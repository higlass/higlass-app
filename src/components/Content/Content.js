import PropTypes from 'prop-types';
import React from 'react';

import './Content.scss';

const Content = props => (
  <main
    className={`flex-g-1 content ${props.name}-content ${props.wrap ? 'wrap' : ''} ${props.rel ? 'rel' : ''}`}>
    {props.children}
  </main>
);

Content.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  rel: PropTypes.bool,
  wrap: PropTypes.bool,
};

export default Content;

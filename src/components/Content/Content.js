import PropTypes from 'prop-types';

import React from 'react';

const Content = props => (
  <main className={`content flex-g-1 ${props.name}`}>
    {props.children}
  </main>
);

Content.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default Content;

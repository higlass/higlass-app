import PropTypes from 'prop-types';

import React from 'react';

const Content = props => (
  <main className={`flex-g-1 content ${props.name}`}>
    {props.children}
  </main>
);

Content.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default Content;

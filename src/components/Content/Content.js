import PropTypes from 'prop-types';

import React from 'react';

const Content = (props) => (
  <div className='content flex-g-1'>
    {props.children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node,
}

export default Content;

import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './ButtonLikeLink.scss';

const ButtonLikeLink = props => (
  <div className='button-like-link'>
    <Link to={props.to}>{props.children}</Link>
  </div>
);

ButtonLikeLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ButtonLikeLink;

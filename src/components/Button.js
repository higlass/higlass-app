import { PropTypes } from 'prop-types';
import React from 'react';

const classNames = (props) => {
  let className = 'button';

  className += ` ${props.className}`;
  className += props.isActive ? ' is-active' : '';

  return className;
};

const Button = props => (
  <button
    className={classNames(props)}
    title={props.title}
    onClick={props.onClick}>
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default Button;

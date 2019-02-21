import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './ButtonLikeLink.scss';

const isMailTo = url => url.substr(0, 7) === 'mailto:';

const ButtonLikeLink = props => (
  <div
    className={`flex-c flex-a-c button-like-link ${props.className}`}
    style={props.style}
  >
    {props.external ? (
      <a
        href={props.to}
        target={props.newWindow && !isMailTo(props.to) ? '_blank' : ''}
        rel={
          props.newWindow && !isMailTo(props.to) ? 'noopener noreferrer' : ''
        }
      >
        {props.children}
      </a>
    ) : (
      <Link to={props.to}>{props.children}</Link>
    )}
  </div>
);

ButtonLikeLink.defaultProps = {
  className: '',
  external: false,
  newWindow: false,
  style: {}
};

ButtonLikeLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  newWindow: PropTypes.bool,
  style: PropTypes.obj
};

export default ButtonLikeLink;

import PropTypes from 'prop-types';
import React from 'react';

const TopBarButtonLikeSpan = props => (
  <span
    className="topbar-button-like"
    onClick={props.onClick || null}
    onMouseEnter={props.onMouseEnter || null}
  >
    {props.children}
  </span>
);

TopBarButtonLikeSpan.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
}

export default TopBarButtonLikeSpan;

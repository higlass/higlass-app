import { PropTypes } from 'prop-types';
import React from 'react';

// Components
import Icon from './Icon';

// Styles
import './ButtonIcon.scss';

const ButtonIcon = props => (
  <button
    className={`flex-c flex-a-c flex-jc-c button-icon ${props.iconOnly ? 'button-icon-only' : ''} ${props.isActive ? 'is-active' : ''} ${props.className}`}
    title={props.title}
    onClick={props.onClick}>
    <Icon
      iconId={props.icon}
      mirrorH={props.iconMirrorH}
      mirrorV={props.iconMirrorV} />
    <span>{props.children}</span>
  </button>
);

ButtonIcon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconMirrorH: PropTypes.bool,
  iconMirrorV: PropTypes.bool,
  iconOnly: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default ButtonIcon;

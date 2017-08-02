import { PropTypes } from 'prop-types';
import React from 'react';

// Components
import Icon from '../Icon/Icon';

// Styles
import './ButtonIcon.scss';

const ButtonIcon = props => (
  <button
    className={`flex-c flex-a-c button-icon ${props.iconOnly ? 'button-icon-only' : ''}`}
    title={props.title}>
    <Icon iconId={props.icon} />
    <span>{props.children}</span>
  </button>
);

ButtonIcon.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string.isRequired,
  iconOnly: PropTypes.bool,
  title: PropTypes.string,
};

export default ButtonIcon;

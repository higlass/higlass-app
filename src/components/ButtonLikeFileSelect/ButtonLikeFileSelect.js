import { PropTypes } from 'prop-types';
import React from 'react';

import Icon from '../Icon/Icon';

// Styles
import './ButtonLikeFileSelect.scss';

let inputEl;

const ButtonLikeFileSelect = props => (
  <div className='flex-c button-like-file-select' onClick={() => inputEl.click()}>
    <span className='flex-g-1 button-like-select-text'>{props.children}</span>
    <Icon iconId='arrow-bottom' />
    <input
      type='file'
      accept='.json'
      ref={(el) => { inputEl = el; }}
      onChange={props.select} />
  </div>
);

ButtonLikeFileSelect.propTypes = {
  children: PropTypes.node.isRequired,
  select: PropTypes.func.isRequired,
};

export default ButtonLikeFileSelect;

import PropTypes from 'prop-types';
import React from 'react';

import Icon from './Icon';

import './HiGlassPlaceholder.scss';

const HiGlassPlaceholder = (props) => (
  <div
    className="full-dim flex-c flex-v higlass-placeholder"
    onClick={props.onClickToLoad}
    tabIndex="0"
  >
    <div className="flex-c top-track" />
    <div className="flex-c flex-g-1">
      <div className="left-track" />
      <div className="flex-g-1 flex-c flex-a-c flex-jc-c center-track">
        <div className="flex-c flex-v flex-a-c">
          <Icon iconId="logo" />
          <span>Click to load</span>
        </div>
      </div>
    </div>
  </div>
);

HiGlassPlaceholder.propTypes = {
  onClickToLoad: PropTypes.func.isRequired,
};

export default HiGlassPlaceholder;

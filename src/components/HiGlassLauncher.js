import PropTypes from 'prop-types';
import React from 'react';

// Components
import { createHgComponent } from 'higlass';
import deepClone from '../utils/deep-clone';

// Styles
import './HiGlassLauncher.scss';

const launchHgLib = (viewConfig, options) => (element) => {
  if (element && viewConfig) {
    createHgComponent(element, deepClone(viewConfig), options, (api) => {
      window.higlassApi = api;
    });
  }
};


const HiGlassLauncher = props => (
  <div
    className='full-wh rel'>
    <div
      className='higlass-launcher'
      ref={launchHgLib(props.viewConfig, props.options)}>
    </div>
  </div>
);

HiGlassLauncher.defaultProps = {
  options: {
    bounded: true,
  },
};

HiGlassLauncher.propTypes = {
  viewConfig: PropTypes.object,
  options: PropTypes.object,
};

export default HiGlassLauncher;

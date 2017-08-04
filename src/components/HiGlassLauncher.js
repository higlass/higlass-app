import PropTypes from 'prop-types';
import React from 'react';

// Components
import { createHgComponent } from 'higlass';
import deepClone from '../utils/deep-clone';

import Logger from '../utils/logger';

// Styles
import './HiGlassLauncher.scss';
import '../styles/bootstrap.less';

const logger = Logger('HiGlassLauncher');

const launchHgLib = (viewConfig, options, onError) => (element) => {
  if (element && viewConfig) {
    logger.debug(element, viewConfig, options);

    try {
      createHgComponent(element, deepClone(viewConfig), options, (api) => {
        window.higlassApi = api;
      });
    } catch (error) {
      logger.error(error);
      onError('HiGlass could not be launched.');
    }
  }
};


const HiGlassLauncher = props => (
  <div
    className='full-wh rel'>
    <div
      className='higlass-launcher twbs'
      ref={launchHgLib(props.viewConfig, props.options, props.onError)}>
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
  onError: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export default HiGlassLauncher;

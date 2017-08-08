import deepEqual from 'deep-equal';
import { createHgComponent } from 'higlass';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import deepClone from '../utils/deep-clone';

import Logger from '../utils/logger';

// Styles
import './HiGlassLauncher.scss';
import '../styles/bootstrap.less';

const logger = Logger('HiGlassLauncher');


class HiGlassLauncher extends React.Component {
  constructor(props) {
    super(props);

    this.hiGlassEventListeners = [];
  }

  componentWillUnmount() {
    this.removeHiGlassEventListeners();
  }

  shouldComponentUpdate(nextProps) {
    if (deepEqual(this.newViewConfig, nextProps.viewConfig)) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div
        className='full-wh rel'>
        <div
          className='higlass-launcher twbs'
          ref={this.launchHgLib(
            this.props.viewConfig,
            this.props.options,
            this.props.onError
          )}>
        </div>
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  addHiGlassEventListeners() {
    this.hiGlassEventListeners.push({
      event: 'view',
      id: this.api.on('view', (newViewConfig) => {
        this.newViewConfig = JSON.parse(newViewConfig);

        if (!deepEqual(this.newViewConfig, this.props.viewConfig)) {
          this.props.setViewConfig(this.newViewConfig);
        }
      }),
    });
  }

  launchHgLib(viewConfig, options, onError) {
    return (element) => {
      if (element && viewConfig) {
        logger.debug(viewConfig, options);

        try {
          createHgComponent(
            element,
            deepClone(viewConfig),
            options,
            this.registerHiGlassApi.bind(this)
          );
        } catch (error) {
          logger.error(error);
          onError('HiGlass could not be launched.');
        }
      }
    };
  }

  registerHiGlassApi(api) {
    if (this.api) {
      this.removeHiGlassEventListeners();
    }
    this.api = api;
    this.addHiGlassEventListeners();
  }

  removeHiGlassEventListeners() {
    this.hiGlassEventListeners.forEach((listener) => {
      this.api.off(listener.event, listener.id);
    });
    this.hiGlassEventListeners = [];
  }
}

HiGlassLauncher.defaultProps = {
  options: {
    bounded: true,
  },
};

HiGlassLauncher.propTypes = {
  onError: PropTypes.func.isRequired,
  options: PropTypes.object,
  setViewConfig: PropTypes.func,
  viewConfig: PropTypes.object,
};

export default HiGlassLauncher;

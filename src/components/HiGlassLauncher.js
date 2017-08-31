import deepEqual from 'deep-equal';
import { createHgComponent } from 'higlass';
import PropTypes from 'prop-types';
import React from 'react';

// Utils
import { deepClone, Logger } from '../utils';

// Utils
import { SELECT } from '../configs/mouse-tools';

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
    if (nextProps.mouseTool !== this.props.mouseTool) {
      this.setMouseTool(nextProps.mouseTool);
    }

    if (deepEqual(this.newViewConfig, nextProps.viewConfig)) {
      return false;
    }

    return true;
  }

  render() {
    const options = Object.assign({}, this.props.options);

    if (this.props.enableAltMouseTools) {
      options.mouseTool = this.props.mouseTool;
    }

    return (
      <div
        className='full-wh rel'>
        <div
          className='higlass-launcher twbs'
          ref={this.launchHgLib(
            this.props.viewConfig,
            options,
            this.props.onError
          )}>
        </div>
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  addHiGlassEventListeners() {
    this.hiGlassEventListeners.push({
      event: 'viewConfig',
      id: this.api.on('viewConfig', (newViewConfig) => {
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
    this.props.api(this.api);
  }

  removeHiGlassEventListeners() {
    this.hiGlassEventListeners.forEach((listener) => {
      this.api.off(listener.event, listener.id);
    });
    this.hiGlassEventListeners = [];
  }

  setMouseTool(mouseTool) {
    if (!this.props.enableAltMouseTools) return;

    switch (mouseTool) {
      case SELECT:
        this.api.activateTool('select');
        break;

      default:
        this.api.activateTool('move');
    }
  }
}

HiGlassLauncher.defaultProps = {
  options: {
    bounded: true,
  },
};

HiGlassLauncher.propTypes = {
  api: PropTypes.func,
  enableAltMouseTools: PropTypes.bool,
  onError: PropTypes.func.isRequired,
  options: PropTypes.object,
  mouseTool: PropTypes.string,
  setViewConfig: PropTypes.func,
  viewConfig: PropTypes.object,
};

export default HiGlassLauncher;

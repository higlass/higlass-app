import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import ErrorMsgCenter from './ErrorMsgCenter';
import SpinnerCenter from './SpinnerCenter';

// Containers
import HiGlassLoader from '../containers/HiGlassLoader';

// Actions
import { setViewConfig } from '../actions';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';
import Logger from '../utils/logger';

// Styles
import './HiGlassViewer.scss';

const logger = Logger('HiGlassViewer');

const fetchViewConfig = (configId, base = '') => fetch(
  `${base}/api/v1/viewconfs/?d=${configId}`
).then(response => response.json());

const defaultViewConfigId = 'default';


class HiGlassViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loadViewConfig();
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewConfigId !== prevProps.viewConfigId) {
      this.loadViewConfig();
    }
  }

  render() {
    let className = 'full-dim higlass-viewer';

    className += this.props.hasSubTopBar ? ' has-sub-top-bar' : '';

    return (
      <div className={className}>
        {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
        {!this.state.error && (
          this.state.isLoading ? (
              <SpinnerCenter />
            ) : (
              <HiGlassLoader
                api={this.props.api}
                onError={this.onError.bind(this)} />
            )
          )
        }
      </div>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  confirmViewConfigChange() {
    const dialog = new Deferred();
    pubSub.publish(
      'globalDialog',
      {
        message: 'You are about to override the existing view config.',
        request: dialog,
        rejectText: 'Cancel',
        resolveText: 'Okay',
      }
    );
  }

  loadViewConfig(viewConfigId = this.props.viewConfigId) {
    if (!viewConfigId && this.props.viewConfig) {
      this.setState({
        error: '',
        isLoading: false,
      });
      return;
    }

    this.setState({
      error: '',
      isLoading: true,
    });

    fetchViewConfig(viewConfigId || defaultViewConfigId)
      .then(this.setViewConfig.bind(this))
      .catch(() => {
        logger.warning('View config is not available locally!');

        // Try loading config from HiGlass.io
        return fetchViewConfig(
          viewConfigId || defaultViewConfigId, 'http://higlass.io'
        );
      })
      .then(this.setViewConfig.bind(this))
      .catch((error) => {
        logger.error('Could not load or parse config.', error);
        this.setState({
          error: 'Could not load config.',
          isLoading: false,
        });
      });
  }

  onError(error) {
    this.setState({
      error,
      isLoading: false,
    });
  }

  setViewConfig(viewConfig) {
    if (!viewConfig || viewConfig.error) {
      this.setState({
        error: viewConfig.error || 'View config broken.',
        isLoading: false,
      });
    } else {
      this.setState({
        error: '',
        isLoading: false,
      });
      this.props.setViewConfig(viewConfig);
    }
  }
}

HiGlassViewer.defaultProps = {
  api: () => {},
};

HiGlassViewer.propTypes = {
  api: PropTypes.func,
  hasSubTopBar: PropTypes.bool,
  setViewConfig: PropTypes.func.isRequired,
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
});

const mapDispatchToProps = dispatch => ({
  setViewConfig: (viewConfig) => {
    dispatch(setViewConfig(viewConfig));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HiGlassViewer);

import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import ErrorMsgCenter from './ErrorMsgCenter';
import HiGlassLauncher from './HiGlassLauncher';
import HiGlassPlaceholder from './HiGlassPlaceholder';
import SpinnerCenter from './SpinnerCenter';

// Containers
import HiGlassLoader from '../containers/HiGlassLoader';

// Actions
import { setViewConfig } from '../actions';

// Utils
import { Deferred, Logger } from '../utils';

// Styles
import './HiGlassViewer.scss';

const logger = Logger('HiGlassViewer');

const fetchViewConfig = (config, base = '') => typeof config !== 'string'
  ? new Promise(resolve => resolve(config))
  : fetch(
    `${base}/api/v1/viewconfs/?d=${config}`
  ).then(response => response.json());

const defaultViewConfigId = window.HGAC_DEFAULT_VIEW_CONFIG || 'default';


class HiGlassViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isLoading: true,
      isInitForced: false,
    };

    this.onClickToLoadBound = this.onClickToLoad.bind(this);
  }

  componentDidMount() {
    if (!this.props.isDeferred || this.props.isDeferredInit) {
      this.loadViewConfig();
    }
  }

  componentDidUpdate(prevProps, pervState) {
    const isInit = this.state.isInitForced || this.props.isDeferredInit;
    const isInitPref = pervState.isInitForced || prevProps.isDeferredInit;
    if (
      (!this.props.isDeferred || isInit)
      && (
        this.props.viewConfigId !== prevProps.viewConfigId
        || isInit !== isInitPref
      )
    ) {
      this.loadViewConfig();
    }
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  confirmViewConfigChange() {
    const dialog = new Deferred();
    this.props.pubSub.publish(
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

    fetchViewConfig(viewConfigId || defaultViewConfigId, this.props.server)
      .then(this.setViewConfig)
      .catch(() => {
        logger.info(
          'View config is not available locally! Try loading it from higlass.io.'
        );

        // Try loading config from HiGlass.io
        return fetchViewConfig(
          viewConfigId || defaultViewConfigId, '//higlass.io'
        )
          .then(this.setViewConfig)
          .catch((error) => {
            logger.error('Could not load or parse config.', error);
            this.setState({
              error: 'Could not load config.',
              isLoading: false,
            });
          });
      });
  }

  onError(error) {
    this.setState({
      error,
      isLoading: false,
    });
  }

  onClickToLoad() {
    this.setState({ isInitForced: true })
  }

  @boundMethod
  setViewConfig(viewConfig) {
    if (!viewConfig || viewConfig.error) {
      const errorMsg = viewConfig && viewConfig.error
        ? viewConfig.error
        : 'View config broken.';
      this.setState({
        error: errorMsg,
        isLoading: false,
      });
    } else if (this.props.isStatic) {
      this.setState({
        error: '',
        isLoading: false,
        viewConfigStatic: viewConfig,
      });
    } else {
      this.props.setViewConfig(viewConfig);
      this.setState({
        error: '',
        isLoading: false,
      });
    }
  }

  /* -------------------------------- Render -------------------------------- */

  render() {
    let className = 'higlass-viewer';

    className += this.props.hasSubTopBar ? ' has-sub-top-bar' : '';
    className += !this.props.autoExpand && !this.props.height ? ' full-dim' : '';
    className += this.props.height ? ' higlass-viewer-abs-height' : '';
    className += this.props.hasSubTopBar ? ' has-sub-top-bar' : '';

    const style = {
      height: this.props.height ? `${this.props.height}px` : 'auto',
    };

    const isInit = this.state.isInitForced || this.props.isDeferredInit;

    return (
      <div
        className={className}
        style={style}
      >
        {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
        {!this.state.error && (
          this.props.isDeferred && !isInit // eslint-disable-line no-nested-ternary
          ? <HiGlassPlaceholder onClickToLoad={this.onClickToLoadBound} />
          : this.state.isLoading // eslint-disable-line no-nested-ternary
              ? <SpinnerCenter />
              : this.props.isStatic
                  ? <HiGlassLauncher
                      api={this.props.api}
                      autoExpand={this.props.autoExpand}
                      enableAltMouseTools={this.props.enableAltMouseTools}
                      isPadded={this.props.isPadded}
                      isZoomFixed={this.props.isZoomFixed}
                      onError={this.onError.bind(this)}
                      viewConfig={this.state.viewConfigStatic}
                    />
                  : <HiGlassLoader
                      api={this.props.api}
                      enableAltMouseTools={this.props.enableAltMouseTools}
                      onError={this.onError.bind(this)}
                      isPadded={this.props.isPadded}
                      isZoomFixed={this.props.isZoomFixed}
                    />
        )}
      </div>
    );
  }
}

HiGlassViewer.defaultProps = {
  api: () => {},
  server: '',
};

HiGlassViewer.propTypes = {
  api: PropTypes.func,
  autoExpand: PropTypes.bool,
  className: PropTypes.string,
  enableAltMouseTools: PropTypes.bool,
  hasSubTopBar: PropTypes.bool,
  height: PropTypes.number,
  isDeferred: PropTypes.bool,
  isDeferredInit: PropTypes.bool,
  isPadded: PropTypes.bool,
  isStatic: PropTypes.bool,
  isZoomFixed: PropTypes.bool,
  pubSub: PropTypes.object.isRequired,
  server: PropTypes.string,
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

export default withPubSub(
  connect(mapStateToProps, mapDispatchToProps)(HiGlassViewer)
);

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import HiGlassViewer from '../components/HiGlassViewer';

// View components
import ViewerBottomBar from './ViewerBottomBar';
import ViewerRightBar from './ViewerRightBar';
import ViewerSubTopBar from './ViewerSubTopBar';

// Services
import pubSub from '../services/pub-sub';

// Actions
import { setViewerMouseTool, setViewerRightBarTab } from '../actions';

// Utils
import {
  downloadAsJson,
  Logger,
  removeHiGlassEventListeners,
  requestNextAnimationFrame
} from '../utils';

// Configs
import { HOLD_DOWN_DELAY, PAN_ZOOM, SELECT } from '../configs/mouse-tools';
import { ANNOTATIONS, INFO } from '../configs/viewer-right-bar-panels';

const logger = Logger('Viewer');

const resizeTrigger = () => requestNextAnimationFrame(() => {
  window.dispatchEvent(new Event('resize'));
});


class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.hiGlassEventListeners = [];
    this.pubSubs = [];

    this.state = {
      rangeSelection: [null, null],
    };
  }

  componentWillMount() {
    this.pubSubs.push(
      pubSub.subscribe('keydown', this.keyDownHandler.bind(this))
    );
    this.pubSubs.push(
      pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
    removeHiGlassEventListeners(this.hiGlassEventListeners, this.hgApi);
    this.hiGlassEventListeners = [];
  }

  render() {
    this.checkHiGlassEventListeners();

    return (
      <ContentWrapper name='viewer' bottomBar={true} isFullDimOnly={true}>
        <Content
          name='viewer'
          rel={true}
          hasRightBar={this.props.isAuthenticated}
          rightBarShow={this.props.rightBarShow}
          rightBarWidth={this.props.rightBarWidth}>
          {this.props.isAuthenticated &&
            <ViewerSubTopBar
              shareViewAsLink={this.callHgApi('shareViewConfigAsLink')}
            />
          }
          <HiGlassViewer
            api={(api) => { this.hgApi = api; }}
            enableAltMouseTools={this.props.isAuthenticated}
            hasSubTopBar={this.props.isAuthenticated}
            viewConfigId={this.props.viewConfigId} />
        </Content>
        {this.props.isAuthenticated &&
          <ViewerRightBar
            rangeSelection={this.state.rangeSelection}
            widthSetterFinal={resizeTrigger}
          />
        }
        <ViewerBottomBar isAuthenticated={this.props.isAuthenticated} />
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  /**
   * Wrapper for triggering a public function of HiGlass
   *
   * @description
   * We need an extra wrapper because the HiGlass's might not be available by
   * the time we pass props to a component.
   *
   * @param  {String}  method  Function name to be triggered.
   * @return  {Function}  Curried function calling the HiGlass API.
   */
  callHgApi(method) {
    return (...args) => {
      if (!this.hgApi) {
        logger.warn('HiGlass not available yet.');
        return undefined;
      }
      if (!this.hgApi[method]) {
        logger.warn(`Method (${method}) not available. Incompatible version of HiGlass?`);
        return undefined;
      }
      return this.hgApi[method](...args);
    };
  }

  checkHiGlassEventListeners() {
    if (!this.hgApi) return;

    // Remove all listeners before reassignment to be sure not to pile up any
    // event listeners, which could be a memory leak
    removeHiGlassEventListeners(this.hiGlassEventListeners, this.hgApi);
    this.hiGlassEventListeners = [];

    if (this.props.mouseTool === SELECT) {
      this.hiGlassEventListeners.push({
        name: 'rangeSelection',
        id: this.hgApi.on(
          'rangeSelection', this.rangeSelectionHandler.bind(this)
        ),
      });
    }
    if (this.props.rightBarTab === INFO) {
      this.hgApi.on('mouseMoveZoom', this.mouseMoveZoomHandler.bind(this));
      this.hiGlassEventListeners.push({
        name: 'mouseMoveZoom',
        id: this.mouseMoveZoomHandler,
      });
    }
  }

  mouseMoveZoomHandler(data) {
    pubSub.publish('viewer.mouseMoveZoom', data);
  }

  removeHiGlassEventListeners() {
    this.hiGlassEventListeners.forEach((event) => {
      this.hgApi.off(event.name, event.id);
    });
    this.hiGlassEventListeners = [];
  }

  downloadViewConfig() {
    downloadAsJson('viewConfig.json', this.props.viewConfig);
  }

  keyDownHandler(event) {
    if (event.keyCode === 83) {  // S
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {  // CMD + S
        this.downloadViewConfig();
      } else if (
        this.props.isAuthenticated && this.props.mouseTool !== SELECT
      ) {  // S
        this.props.setMouseTool(SELECT);
        this.keyDownS = performance.now();
      }
    }

    if (!this.props.isAuthenticated) return;

    if (event.keyCode === 90 && this.props.mouseTool !== PAN_ZOOM) {  // Z
      event.preventDefault();
      this.props.setMouseTool(PAN_ZOOM);
      this.keyDownZ = performance.now();
    }
  }

  keyUpHandler(event) {
    if (!this.props.isAuthenticated) return;

    if (event.keyCode === 65) {  // A
      event.preventDefault();
      this.props.setRightBarTab(ANNOTATIONS);
    }

    if (event.keyCode === 73) {  // I
      event.preventDefault();
      this.props.setRightBarTab(INFO);
    }

    if (
      event.keyCode === 83 &&  // S
      this.keyDownS &&
      (performance.now() - this.keyDownS) > HOLD_DOWN_DELAY
    ) {
      event.preventDefault();
      this.props.setMouseTool(PAN_ZOOM);
      this.keyDownS = undefined;
    }

    if (
      event.keyCode === 90 &&  // Z
      this.keyDownZ &&
      (performance.now() - this.keyDownZ) > HOLD_DOWN_DELAY
    ) {
      event.preventDefault();
      this.props.setMouseTool(SELECT);
      this.keyDownZ = undefined;
    }
  }

  rangeSelectionHandler(rangeSelection) {
    if (rangeSelection.genomicRange) {
      this.setState({
        rangeSelection.genomicRange,
      });
    } else {
      pubSub.publish(
        'globalError',
        'Range selection could not been translated from data location into ' +
        'genomic locations. Check your view config and the cooler file of ' +
        'the main heatmap.'
      );
    }
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  isAuthenticated: PropTypes.bool,
  setMouseTool: PropTypes.func,
  setRightBarTab: PropTypes.func,
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
  mouseTool: PropTypes.string,
  rightBarShow: PropTypes.bool,
  rightBarTab: PropTypes.string,
  rightBarWidth: PropTypes.number,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  mouseTool: state.present.viewerMouseTool,
  rightBarShow: state.present.viewerRightBarShow,
  rightBarTab: state.present.viewerRightBarTab,
  rightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = dispatch => ({
  setMouseTool: mouseTool =>
    dispatch(setViewerMouseTool(mouseTool)),
  setRightBarTab: viewerRightBarTab =>
    dispatch(setViewerRightBarTab(viewerRightBarTab)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer));

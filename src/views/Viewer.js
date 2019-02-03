import { boundMethod } from 'autobind-decorator';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import HiGlassViewer from '../components/HiGlassViewer';

// View components
import ViewerRightBar from './ViewerRightBar';
import ViewerSubTopBar from './ViewerSubTopBar';

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
import { IGNORED_FOCUS_ELEMENTS } from '../configs';
import { HOLD_DOWN_DELAY, PAN_ZOOM, SELECT } from '../configs/mouse-tools';
import { ANNOTATIONS, INFO } from '../configs/viewer-right-bar-panels';

const logger = Logger('Viewer');

const resizeTrigger = () => requestNextAnimationFrame(() => {
  window.dispatchEvent(new Event('resize'));
});

const server = typeof window.HGAC_SERVER !== 'undefined'
  ? window.HGAC_SERVER  // from compiled `config.js`
  : HGAC_SERVER;  // from webpack's DefinePlugin


class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.hiGlassEventListeners = [];
    this.pubSubs = [];

    this.state = {
      rangeSelection: [null, null],
    };
  }

  componentDidMount() {
    this.pubSubs.push(
      this.props.pubSub.subscribe('keydown', this.keyDownHandler)
    );
    this.pubSubs.push(
      this.props.pubSub.subscribe('keyup', this.keyUpHandler)
    );
  }

  componentWillUnmount() {
    this.pubSubs
      .forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
    removeHiGlassEventListeners(this.hiGlassEventListeners, this.hgApi);
    this.hiGlassEventListeners = [];
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
        logger.warn(
          `Method (${method}) not available. Incompatible version of HiGlass?`
        );
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
          'rangeSelection', this.rangeSelectionHandler
        ),
      });
    }
    if (this.props.rightBarTab === INFO) {
      this.hgApi.on('mouseMoveZoom', this.mouseMoveZoomHandler);
      this.hiGlassEventListeners.push({
        name: 'mouseMoveZoom',
        id: this.mouseMoveZoomHandler,
      });
    }
  }

  @boundMethod
  mouseMoveZoomHandler(data) {
    this.props.pubSub.publish('viewer.mouseMoveZoom', data);
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

  @boundMethod
  keyDownHandler(event) {
    if (
      IGNORED_FOCUS_ELEMENTS.indexOf(
        document.activeElement.tagName.toLowerCase()
      ) >= 0
    )
      return;

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

  @boundMethod
  keyUpHandler(event) {
    if (
      IGNORED_FOCUS_ELEMENTS.indexOf(
        document.activeElement.tagName.toLowerCase()
      ) >= 0
    )
      return;

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
      event.keyCode === 83  // S
      && this.keyDownS
      && (performance.now() - this.keyDownS) > HOLD_DOWN_DELAY
    ) {
      event.preventDefault();
      this.props.setMouseTool(PAN_ZOOM);
      this.keyDownS = undefined;
    }

    if (
      event.keyCode === 90  // Z
      && this.keyDownZ
      && (performance.now() - this.keyDownZ) > HOLD_DOWN_DELAY
    ) {
      event.preventDefault();
      this.props.setMouseTool(SELECT);
      this.keyDownZ = undefined;
    }
  }

  @boundMethod
  rangeSelectionHandler(rangeSelection) {
    if (rangeSelection.genomicRange) {
      // this.setState({
      //   rangeSelection: rangeSelection.genomicRange,
      // });
    } else {
      this.props.pubSub.publish(
        'globalError',
        'Range selection could not been translated from data location into '
        + 'genomic locations. Check your view config and the cooler file of '
        + 'the main heatmap.'
      );
    }
  }

  /* -------------------------------- Render -------------------------------- */

  render() {
    this.checkHiGlassEventListeners();

    return (
      <ContentWrapper name='viewer' isFullDimOnly={true}>
        <Content
          name='viewer'
          rel={true}
          hasRightBar={this.props.isAuthenticated}
          rightBarShow={this.props.rightBarShow}
          rightBarWidth={this.props.rightBarWidth}>
          {this.props.isAuthenticated
            && <ViewerSubTopBar
              shareViewAsLink={this.callHgApi('shareViewConfigAsLink')}
            />
          }
          <HiGlassViewer
            api={(api) => { this.hgApi = api; }}
            enableAltMouseTools={this.props.isAuthenticated}
            hasSubTopBar={this.props.isAuthenticated}
            server={server}
            viewConfigId={this.props.viewConfigId}
          />
        </Content>
        {this.props.isAuthenticated
          && <ViewerRightBar
            rangeSelection={this.state.rangeSelection}
            widthSetterFinal={resizeTrigger}
          />
        }
      </ContentWrapper>
    );
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  isAuthenticated: PropTypes.bool,
  mouseTool: PropTypes.string,
  pubSub: PropTypes.object.isRequired,
  rightBarShow: PropTypes.bool,
  rightBarTab: PropTypes.string,
  rightBarWidth: PropTypes.number,
  setMouseTool: PropTypes.func,
  setRightBarTab: PropTypes.func,
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
};

const mapStateToProps = state => ({
  mouseTool: state.present.viewerMouseTool,
  rightBarShow: state.present.viewerRightBarShow,
  rightBarTab: state.present.viewerRightBarTab,
  rightBarWidth: state.present.viewerRightBarWidth,
  viewConfig: state.present.viewConfig,
});

const mapDispatchToProps = dispatch => ({
  setMouseTool: mouseTool => dispatch(setViewerMouseTool(mouseTool)),
  setRightBarTab: viewerRightBarTab => dispatch(setViewerRightBarTab(viewerRightBarTab)),
});

export default withPubSub(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer)));

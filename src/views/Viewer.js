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
  removeHiGlassEventListeners,
  requestNextAnimationFrame
} from '../utils';

// Configs
import { HOLD_DOWN_DELAY, PAN_ZOOM, SELECT } from '../configs/mouse-tools';
import { ANNOTATIONS, INFO } from '../configs/viewer-right-bar-panels';

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
    removeHiGlassEventListeners(this.hiGlassEventListeners, this.api);
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
            <ViewerSubTopBar />
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
            widthSetterFinal={resizeTrigger} />
        }
        <ViewerBottomBar isAuthenticated={this.props.isAuthenticated} />
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  checkHiGlassEventListeners() {
    if (!this.hgApi) return;

    // Remove all listeners before reassignment to be sure not to pile up any
    // event listeners, which could be a memory leak
    removeHiGlassEventListeners(this.hiGlassEventListeners, this.hgApi);
    this.hiGlassEventListeners = [];

    if (this.props.mouseTool === SELECT) {
      this.hiGlassEventListeners.push({
        event: 'rangeSelection',
        id: this.hgApi.on(
          'rangeSelection', this.rangeSelectionHandler.bind(this)
        ),
      });
    }
  }

  removeHiGlassEventListeners() {
    this.hiGlassEventListeners.forEach((listener) => {
      this.api.off(listener.event, listener.id);
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
    this.setState({
      rangeSelection,
    });
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
  rightBarWidth: PropTypes.number,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  mouseTool: state.present.viewerMouseTool,
  rightBarShow: state.present.viewerRightBarShow,
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

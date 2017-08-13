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
import { setViewerMouseTool } from '../actions';

// Utils
import downloadAsJson from '../utils/download-as-json';
import { requestNextAnimationFrame } from '../utils/request-animation-frame';

const resizeTrigger = () => requestNextAnimationFrame(() => {
  window.dispatchEvent(new Event('resize'));
});


class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];
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
  }

  render() {
    return (
      <ContentWrapper name='viewer' bottomBar={true} isFullDimOnly={true}>
        <Content
          name='viewer'
          rel={true}
          hasRightBar={this.props.isAuthenticated}
          rightBarShow={this.props.viewerRightBarShow}
          rightBarWidth={this.props.viewerRightBarWidth}>
          {this.props.isAuthenticated &&
            <ViewerSubTopBar />
          }
          <HiGlassViewer
            api={(api) => { this.hgApi = api; }}
            hasSubTopBar={this.props.isAuthenticated}
            viewConfigId={this.props.viewConfigId} />
        </Content>
        {this.props.isAuthenticated &&
          <ViewerRightBar
            widthSetterFinal={resizeTrigger} />
        }
        <ViewerBottomBar isAuthenticated={this.props.isAuthenticated} />
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  downloadViewConfig() {
    downloadAsJson('viewConfig.json', this.props.viewConfig);
  }

  keyDownHandler(event) {
    if (event.keyCode === 83) {  // S
      event.preventDefault();

      if (event.ctrlKey || event.metaKey) {  // CMD + S
        this.downloadViewConfig();
      } else if (this.props.viewerMouseTool !== 'select') {  // S
        this.props.setViewerMouseTool('select');
        this.keyDownS = performance.now();
      }
    }

    if (event.keyCode === 90 && this.props.viewerMouseTool !== 'panZoom') {  // Z
      event.preventDefault();
      this.props.setViewerMouseTool('panZoom');
      this.keyDownZ = performance.now();
    }
  }

  keyUpHandler(event) {
    if (
      event.keyCode === 83 &&
      this.keyDownS &&
      (performance.now() - this.keyDownS) > 200
    ) {  // S
      event.preventDefault();
      this.props.setViewerMouseTool('panZoom');
      this.keyDownS = undefined;
    }

    if (
      event.keyCode === 90 &&
      this.keyDownZ &&
      (performance.now() - this.keyDownZ) > 200
    ) {  // Z
      event.preventDefault();
      this.props.setViewerMouseTool('select');
      this.keyDownZ = undefined;
    }
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  isAuthenticated: PropTypes.bool,
  setViewerMouseTool: PropTypes.func,
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
  viewerMouseTool: PropTypes.string,
  viewerRightBarShow: PropTypes.bool,
  viewerRightBarWidth: PropTypes.number,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  viewerMouseTool: state.present.viewerMouseTool,
  viewerRightBarShow: state.present.viewerRightBarShow,
  viewerRightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = dispatch => ({
  setViewerMouseTool: viewerMouseTool =>
    dispatch(setViewerMouseTool(viewerMouseTool)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer));

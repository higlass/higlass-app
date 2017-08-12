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
    if (event.keyCode === 83 && (event.ctrlKey || event.metaKey)) {  // CMD + S
      event.preventDefault();
      this.downloadViewConfig();
    }
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  isAuthenticated: PropTypes.bool,
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
  viewerRightBarShow: PropTypes.bool,
  viewerRightBarWidth: PropTypes.number,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  viewerRightBarShow: state.present.viewerRightBarShow,
  viewerRightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = () => ({});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer));

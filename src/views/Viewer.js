import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { setViewerRightBarShow, setViewerRightBarWidth } from '../actions';

// Components
import AppInfo from '../components/AppInfo';
import BottomBar from '../components/BottomBar';
import ButtonIcon from '../components/ButtonIcon';
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import HiGlassViewer from '../components/HiGlassViewer';
import RightBar from '../components/RightBar';
import RightBarSubTopBar from '../components/RightBarSubTopBar';
import RightBarContent from '../components/RightBarContent';
import SubTopBar from '../components/SubTopBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';
import downloadAsJson from '../utils/download-as-json';


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
          hasRightBar={true}
          rightBarShow={this.props.viewerRightBarShow}
          rightBarWidth={this.props.viewerRightBarWidth}>
          <SubTopBar>
            <SubTopBottomBarButtons
              className='flex-c flex-a-c no-list-style' />
            <SubTopBottomBarButtons
              className='flex-c flex-a-c flex-jc-e no-list-style'>
              <li>
                <ButtonIcon
                  icon='download'
                  iconOnly={true}
                  onClick={this.downloadViewConfig.bind(this)} />
              </li>
              <li>
                <ButtonIcon
                  icon='info'
                  iconOnly={true}
                  onClick={this.showInfo.bind(this)} />
              </li>
            </SubTopBottomBarButtons>
          </SubTopBar>
          <HiGlassViewer
            viewConfigId={this.props.viewConfigId}
            hasSubTopBar={true} />
        </Content>
        <RightBar
          show={this.props.viewerRightBarShow}
          toggle={this.rightBarWidthToggler.bind(this)}
          width={this.props.viewerRightBarWidth}>
          <RightBarSubTopBar>
            <span>Cool</span>
          </RightBarSubTopBar>
          <RightBarContent>
            <span>Wooord</span>
          </RightBarContent>
        </RightBar>
        <BottomBar>
          <SubTopBottomBarButtons
            className='flex-c flex-a-c no-list-style' />
          <SubTopBottomBarButtons
            className='flex-c flex-a-c flex-jc-e no-list-style'>
            <li>
              <ButtonIcon
                icon='download'
                iconOnly={true}
                onClick={this.downloadViewConfig.bind(this)} />
            </li>
            <li>
              <ButtonIcon
                icon='info'
                iconOnly={true}
                onClick={this.showInfo.bind(this)} />
            </li>
          </SubTopBottomBarButtons>
        </BottomBar>
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

  rightBarWidthToggler() {
    this.props.setViewerRightBarShow(!this.props.viewerRightBarShow);
  }

  showInfo() {
    const dialog = new Deferred();
    pubSub.publish(
      'globalDialog',
      {
        message: <AppInfo />,
        request: dialog,
        resolveOnly: true,
        resolveText: 'Close',
        icon: 'logo',
        headline: 'HiGlass',
      }
    );
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  viewConfig: PropTypes.object,
  viewConfigId: PropTypes.string,
  viewerRightBarShow: PropTypes.bool,
  viewerRightBarWidth: PropTypes.number,
  setViewerRightBarShow: PropTypes.func,
  setViewerRightBarWidth: PropTypes.func,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  viewerRightBarShow: state.present.viewerRightBarShow,
  viewerRightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = dispatch => ({
  setViewerRightBarShow: viewerRightBarShow =>
    dispatch(setViewerRightBarShow(viewerRightBarShow)),
  setViewerRightBarWidth: viewerRightBarWidth =>
    dispatch(setViewerRightBarWidth(viewerRightBarWidth)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer));

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import AppInfo from '../components/AppInfo';
import BottomBar from '../components/BottomBar';
import ButtonIcon from '../components/ButtonIcon';
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import HiGlassViewer from '../components/HiGlassViewer';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';
import downloadAsJson from '../utils/download-as-json';


class Viewer extends React.Component {
  render() {
    return (
      <ContentWrapper name='viewer' bottomBar={true}>
        <Content name='viewer' rel={true}>
          <HiGlassViewer viewConfigId={this.props.viewConfigId} />
        </Content>
        <BottomBar>
          <ul className='flex-c flex-a-c no-list-style bottom-bar-buttons' />
          <ul className='flex-c flex-a-c flex-jc-e no-list-style bottom-bar-buttons'>
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
          </ul>
        </BottomBar>
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  downloadViewConfig() {
    downloadAsJson('viewConfig.json', this.props.viewConfig);
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
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
});

const mapDispatchToProps = () => ({});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer));

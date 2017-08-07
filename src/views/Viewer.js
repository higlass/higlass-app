// import * as higlass from 'higlass';
import PropTypes from 'prop-types';
import React from 'react';
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


class Viewer extends React.Component {
  render() {
    return (
      <ContentWrapper name='viewer' bottomBar={true}>
        <Content name='viewer' rel={true}>
          <HiGlassViewer viewConfigId={this.props.viewConfigId} />
        </Content>
        <BottomBar>
          <ul className='flex-c flex-a-c no-list-style' />
          <ul className='flex-c flex-a-c flex-jc-e no-list-style'>
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
  viewConfigId: PropTypes.string,
};

export default withRouter(Viewer);

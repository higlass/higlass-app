import React from 'react';
import { connect } from 'react-redux';

// Components
import AppInfo from '../components/AppInfo';
import ButtonIcon from '../components/ButtonIcon';
import BottomBar from '../components/BottomBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';


const showInfo = () => {
  pubSub.publish(
    'globalDialog',
    {
      message: <AppInfo />,
      request: new Deferred(),
      resolveOnly: true,
      resolveText: 'Close',
      icon: 'logo',
      headline: 'HiGlass',
    }
  );
};

const ViewerBottomBar = () => (
  <BottomBar>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c no-list-style' />
    <SubTopBottomBarButtons
      className='flex-c flex-a-c flex-jc-e no-list-style'>
      <li>
        <ButtonIcon
          icon='info'
          iconOnly={true}
          onClick={showInfo} />
      </li>
    </SubTopBottomBarButtons>
  </BottomBar>
);

ViewerBottomBar.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerBottomBar);

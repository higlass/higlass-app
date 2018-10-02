import React from 'react';
import { connect } from 'react-redux';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import AppInfo from '../components/AppInfo';
import ButtonIcon from '../components/ButtonIcon';
import BottomBar from '../components/BottomBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';

// Utils
import Deferred from '../utils/deferred';


const showInfo = publish => () => {
  publish(
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
          onClick={showInfo(this.props.pubSub.publish)} />
      </li>
    </SubTopBottomBarButtons>
  </BottomBar>
);

ViewerBottomBar.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withPubSub(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerBottomBar));

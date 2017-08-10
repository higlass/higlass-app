import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import ButtonIcon from '../components/ButtonIcon';
import SubTopBar from '../components/SubTopBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';

// Utils
import downloadAsJson from '../utils/download-as-json';

const downloadViewConfig = props =>
  downloadAsJson('viewConfig.json', props.viewConfig);

const ViewerSubTopBar = props => (
  <SubTopBar>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c no-list-style' />
    <SubTopBottomBarButtons
      className='flex-c flex-a-c flex-jc-e no-list-style'>
      <li>
        <ButtonIcon
          icon='download'
          iconOnly={true}
          onClick={() => downloadViewConfig(props)} />
      </li>
    </SubTopBottomBarButtons>
  </SubTopBar>
);

ViewerSubTopBar.propTypes = {
  viewConfig: PropTypes.object,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerSubTopBar);

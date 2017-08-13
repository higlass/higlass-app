import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import ButtonIcon from '../components/ButtonIcon';
import SubTopBar from '../components/SubTopBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';
import ToolTip from '../components/ToolTip';

// Actions
import { setViewerMouseTool } from '../actions';

// Utils
import downloadAsJson from '../utils/download-as-json';

const downloadViewConfig = props =>
  downloadAsJson('viewConfig.json', props.viewConfig);

const ViewerSubTopBar = props => (
  <SubTopBar>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c no-list-style'>
      <li>
        <ToolTip
          align='left'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Pan & Zoom Tool</span>
              <span className='short-cut'>Z</span>
            </span>
          }>
          <ButtonIcon
            icon='drag'
            iconOnly={true}
            isActive={props.viewerMouseTool === 'panZoom'}
            onClick={() => props.setViewerMouseTool('panZoom')} />
        </ToolTip>
      </li>
      <li>
        <ToolTip
          align='left'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Select Tool</span>
              <span className='short-cut'>S</span>
            </span>
          }>
          <ButtonIcon
            icon='select'
            iconOnly={true}
            isActive={props.viewerMouseTool === 'select'}
            onClick={() => props.setViewerMouseTool('select')} />
        </ToolTip>
      </li>
    </SubTopBottomBarButtons>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c flex-jc-e no-list-style'>
      <li>
        <ToolTip
          align='right'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Download View Config</span>
              <span className='short-cut'>CMD + S</span>
            </span>
          }>
          <ButtonIcon
            icon='download'
            iconOnly={true}
            onClick={() => downloadViewConfig(props)} />
        </ToolTip>
      </li>
    </SubTopBottomBarButtons>
  </SubTopBar>
);

ViewerSubTopBar.propTypes = {
  setViewerMouseTool: PropTypes.func,
  viewConfig: PropTypes.object,
  viewerMouseTool: PropTypes.string,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  viewerMouseTool: state.present.viewerMouseTool,
});

const mapDispatchToProps = dispatch => ({
  setViewerMouseTool: viewerMouseTool =>
    dispatch(setViewerMouseTool(viewerMouseTool)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerSubTopBar);

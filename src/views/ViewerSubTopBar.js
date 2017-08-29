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

// Configs
import { PAN_ZOOM, SELECT } from '../configs/mouse-tools';

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
            isActive={props.mouseTool === PAN_ZOOM}
            onClick={() => props.setMouseTool(PAN_ZOOM)} />
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
            isActive={props.mouseTool === SELECT}
            onClick={() => props.setMouseTool(SELECT)} />
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
  setMouseTool: PropTypes.func,
  viewConfig: PropTypes.object,
  mouseTool: PropTypes.string,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  mouseTool: state.present.viewerMouseTool,
});

const mapDispatchToProps = dispatch => ({
  setMouseTool: mouseTool =>
    dispatch(setViewerMouseTool(mouseTool)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerSubTopBar);

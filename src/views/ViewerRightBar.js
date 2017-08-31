import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Actions
import {
  setViewerRightBarShow,
  setViewerRightBarTab,
  setViewerRightBarWidth
} from '../actions';

// Components
import Button from '../components/Button';
import RightBar from '../components/RightBar';
import RightBarSubTopBar from '../components/RightBarSubTopBar';
import RightBarContent from '../components/RightBarContent';
import TabContent from '../components/TabContent';
import TabTrigger from '../components/TabTrigger';
import ToolTip from '../components/ToolTip';
import ViewerRightBarAnnotations from './ViewerRightBarAnnotations';

// Configs
import { ANNOTATIONS, INFO } from '../configs/viewer-right-bar-panels';

const rightBarWidthToggler = props => () => {
  props.setViewerRightBarShow(!props.viewerRightBarShow);
};

const ViewerRightBar = props => (
  <RightBar
    isShown={props.viewerRightBarShow}
    show={props.setViewerRightBarShow}
    toggle={rightBarWidthToggler(props)}
    width={props.viewerRightBarWidth}
    widthSetter={props.setViewerRightBarWidth}
    widthSetterFinal={props.widthSetterFinal}>
    <RightBarSubTopBar>
      <ToolTip
        align='right'
        delayIn={1000}
        delayOut={500}
        title={
          <span className='flex-c'>
            <span>Show Information</span>
            <span className='short-cut'>I</span>
          </span>
        }>
        <TabTrigger
          for={INFO}
          tabChange={props.setViewerRightBarTab}
          tabOpen={props.viewerRightBarTab}>
          <Button>Info</Button>
        </TabTrigger>
      </ToolTip>
      <ToolTip
        align='right'
        delayIn={1000}
        delayOut={500}
        title={
          <span className='flex-c'>
            <span>Show Annotations</span>
            <span className='short-cut'>A</span>
          </span>
        }>
        <TabTrigger
          for={ANNOTATIONS}
          tabChange={props.setViewerRightBarTab}
          tabOpen={props.viewerRightBarTab}>
          <Button>Annotations</Button>
        </TabTrigger>
      </ToolTip>
    </RightBarSubTopBar>
    <RightBarContent>
      <TabContent
        className='full-dim flex-c flex-v'
        for={INFO}
        tabOpen={props.viewerRightBarTab}>
        <span>Info Content</span>
      </TabContent>
      <TabContent
        className='full-dim flex-c flex-v'
        for={ANNOTATIONS}
        tabOpen={props.viewerRightBarTab}>
        <ViewerRightBarAnnotations
          rangeSelection={props.rangeSelection}
        />
      </TabContent>
    </RightBarContent>
  </RightBar>
);

ViewerRightBar.propTypes = {
  rangeSelection: PropTypes.array,
  setViewerRightBarShow: PropTypes.func,
  setViewerRightBarTab: PropTypes.func,
  setViewerRightBarWidth: PropTypes.func,
  viewerRightBarShow: PropTypes.bool,
  viewerRightBarTab: PropTypes.string,
  viewerRightBarWidth: PropTypes.number,
  widthSetterFinal: PropTypes.func,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  viewerRightBarShow: state.present.viewerRightBarShow,
  viewerRightBarTab: state.present.viewerRightBarTab,
  viewerRightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = dispatch => ({
  setViewerRightBarShow: viewerRightBarShow =>
    dispatch(setViewerRightBarShow(viewerRightBarShow)),
  setViewerRightBarTab: viewerRightBarTab =>
    dispatch(setViewerRightBarTab(viewerRightBarTab)),
  setViewerRightBarWidth: viewerRightBarWidth =>
    dispatch(setViewerRightBarWidth(viewerRightBarWidth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRightBar);

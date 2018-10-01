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
import ViewerRightBarInfo from './ViewerRightBarInfo';

// Configs
import { ANNOTATIONS, INFO } from '../configs/viewer-right-bar-panels';

const rightBarWidthToggler = props => () => {
  props.setRightBarShow(!props.rightBarShow);
};

const ViewerRightBar = props => (
  <RightBar
    isShown={props.rightBarShow}
    show={props.setRightBarShow}
    toggle={rightBarWidthToggler(props)}
    width={props.rightBarWidth}
    widthSetter={props.setRightBarWidth}
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
          tabChange={props.setRightBarTab}
          tabOpen={props.rightBarTab}>
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
          tabChange={props.setRightBarTab}
          tabOpen={props.rightBarTab}>
          <Button>Annotations</Button>
        </TabTrigger>
      </ToolTip>
    </RightBarSubTopBar>
    <RightBarContent>
      <TabContent
        className='full-dim flex-c flex-v'
        for={INFO}
        tabOpen={props.rightBarTab}>
        <ViewerRightBarInfo />
      </TabContent>
      <TabContent
        className='full-dim flex-c flex-v'
        for={ANNOTATIONS}
        tabOpen={props.rightBarTab}>
        <ViewerRightBarAnnotations
          rangeSelection={props.rangeSelection}
        />
      </TabContent>
    </RightBarContent>
  </RightBar>
);

ViewerRightBar.propTypes = {
  rangeSelection: PropTypes.array,
  setRightBarShow: PropTypes.func,
  setRightBarTab: PropTypes.func,
  setRightBarWidth: PropTypes.func,
  rightBarShow: PropTypes.bool,
  rightBarTab: PropTypes.string,
  rightBarWidth: PropTypes.number,
  widthSetterFinal: PropTypes.func,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  rightBarShow: state.present.viewerRightBarShow,
  rightBarTab: state.present.viewerRightBarTab,
  rightBarWidth: state.present.viewerRightBarWidth,
});

const mapDispatchToProps = dispatch => ({
  setRightBarShow:
    rightBarShow => dispatch(setViewerRightBarShow(rightBarShow)),
  setRightBarTab:
    rightBarTab => dispatch(setViewerRightBarTab(rightBarTab)),
  setRightBarWidth:
    rightBarWidth => dispatch(setViewerRightBarWidth(rightBarWidth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRightBar);

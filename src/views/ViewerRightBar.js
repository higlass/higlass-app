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
      <TabTrigger
        for='info'
        tabChange={props.setViewerRightBarTab}
        tabOpen={props.viewerRightBarTab}>
        <Button>Info</Button>
      </TabTrigger>
      <TabTrigger
        for='annotations'
        tabChange={props.setViewerRightBarTab}
        tabOpen={props.viewerRightBarTab}>
        <Button>Annotations</Button>
      </TabTrigger>
    </RightBarSubTopBar>
    <RightBarContent>
      <TabContent
        className='full-dim'
        for='info'
        tabOpen={props.viewerRightBarTab}>
        <span>Info Content</span>
      </TabContent>
      <TabContent
        className='full-dim'
        for='annotations'
        tabOpen={props.viewerRightBarTab}>
        <span>Annotation Content</span>
      </TabContent>
    </RightBarContent>
  </RightBar>
);

ViewerRightBar.propTypes = {
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

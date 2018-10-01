import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Actions
import {
  setViewerRightBarAnnotationsEntryDetails,
  setViewerRightBarAnnotationsEntryList,
  setViewerRightBarAnnotationsEntrySelection,
} from '../actions';

// Components
import AnnotationDetails from '../components/AnnotationDetails';
import AnnotationList from '../components/AnnotationList';
import RangeSelectionViewer from '../components/RangeSelectionViewer';
import TabEntry from '../components/TabEntry';


const ViewerRightBarAnnotations = props => (
  <div className='right-bar-annotations flex-c flex-v full-wh'>
    <TabEntry
      isOpen={props.viewerRightBarAnnotationsEntrySelection}
      title='Selection'
      toggle={props.toggleViewerRightBarAnnotationsEntrySelection}
    >
      <RangeSelectionViewer rangeSelection={props.rangeSelection} />
    </TabEntry>
    <TabEntry
      isOpen={props.viewerRightBarAnnotationsEntryDetails}
      title='Details'
      toggle={props.toggleViewerRightBarAnnotationsEntryDetails}
    >
      <AnnotationDetails rangeSelection={props.rangeSelection} />
    </TabEntry>
    <TabEntry
      isHeightStretching={true}
      isOpen={props.viewerRightBarAnnotationsEntryList}
      title='All Annotations'
      toggle={props.toggleViewerRightBarAnnotationsEntryList}
    >
      <AnnotationList rangeSelection={props.rangeSelection} />
    </TabEntry>
  </div>
);

ViewerRightBarAnnotations.propTypes = {
  rangeSelection: PropTypes.array,
  toggleViewerRightBarAnnotationsEntryDetails: PropTypes.func,
  toggleViewerRightBarAnnotationsEntryList: PropTypes.func,
  toggleViewerRightBarAnnotationsEntrySelection: PropTypes.func,
  viewerRightBarAnnotationsEntryDetails: PropTypes.bool,
  viewerRightBarAnnotationsEntrySelection: PropTypes.bool,
  viewerRightBarAnnotationsEntryList: PropTypes.bool,
};

const mapStateToProps = state => ({
  viewerRightBarAnnotationsEntryDetails:
    state.present.viewerRightBarAnnotationsEntryDetails,
  viewerRightBarAnnotationsEntrySelection:
    state.present.viewerRightBarAnnotationsEntrySelection,
  viewerRightBarAnnotationsEntryList:
    state.present.viewerRightBarAnnotationsEntryList,
});

const mapDispatchToProps = dispatch => ({
  toggleViewerRightBarAnnotationsEntryDetails:
    isOpen => dispatch(setViewerRightBarAnnotationsEntryDetails(!isOpen)),
  toggleViewerRightBarAnnotationsEntryList:
    isOpen => dispatch(setViewerRightBarAnnotationsEntryList(!isOpen)),
  toggleViewerRightBarAnnotationsEntrySelection:
    isOpen => dispatch(setViewerRightBarAnnotationsEntrySelection(!isOpen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRightBarAnnotations);

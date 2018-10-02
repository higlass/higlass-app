/* eslint max-len: 0 */
import { ActionCreators } from 'redux-undo';

export const redo = ActionCreators.redo();

export const reset = () => ({
  type: 'RESET',
  payload: {},
});

export const setHomeInfoBarClose = homeInfoBarClose => ({
  type: 'SET_HOME_INFO_BAR_CLOSE',
  payload: { homeInfoBarClose },
});

export const setViewConfig = viewConfig => ({
  type: 'SET_VIEW_CONFIG',
  payload: { viewConfig },
});

export const setViewerMouseTool = viewerMouseTool => ({
  type: 'SET_VIEWER_MOUSE_TOOL',
  payload: { viewerMouseTool },
});

export const setViewerRightBarAnnotationsEntryDetails = viewerRightBarAnnotationsEntryDetails => ({
  type: 'SET_VIEWER_RIGHT_BAR_ANNOTATIONS_ENTRY_DETAILS',
  payload: { viewerRightBarAnnotationsEntryDetails },
});

export const setViewerRightBarAnnotationsEntryList = viewerRightBarAnnotationsEntryList => ({
  type: 'SET_VIEWER_RIGHT_BAR_ANNOTATIONS_ENTRY_LIST',
  payload: { viewerRightBarAnnotationsEntryList },
});

export const setViewerRightBarAnnotationsEntrySelection = viewerRightBarAnnotationsEntrySelection => ({
  type: 'SET_VIEWER_RIGHT_BAR_ANNOTATIONS_ENTRY_SELECTION',
  payload: { viewerRightBarAnnotationsEntrySelection },
});

export const setViewerRightBarInfoLensLocation = viewerRightBarInfoLensLocation => ({
  type: 'SET_VIEWER_RIGHT_BAR_INFO_LENS_LOCATION',
  payload: { viewerRightBarInfoLensLocation },
});

export const setViewerRightBarInfoLensValue = viewerRightBarInfoLensValue => ({
  type: 'SET_VIEWER_RIGHT_BAR_INFO_LENS_VALUE',
  payload: { viewerRightBarInfoLensValue },
});

export const setViewerRightBarShow = viewerRightBarShow => ({
  type: 'SET_VIEWER_RIGHT_BAR_SHOW',
  payload: { viewerRightBarShow },
});

export const setViewerRightBarTab = viewerRightBarTab => ({
  type: 'SET_VIEWER_RIGHT_BAR_TAB',
  payload: { viewerRightBarTab },
});

export const setViewerRightBarWidth = viewerRightBarWidth => ({
  type: 'SET_VIEWER_RIGHT_BAR_WIDTH',
  payload: { viewerRightBarWidth },
});

export const undo = ActionCreators.undo();

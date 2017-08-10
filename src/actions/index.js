import { ActionCreators } from 'redux-undo';

export const redo = ActionCreators.redo();

export const setHomeInfoBarClose = homeInfoBarClose => ({
  type: 'SET_HOME_INFO_BAR_CLOSE',
  payload: { homeInfoBarClose },
});

export const setViewConfig = viewConfig => ({
  type: 'SET_VIEW_CONFIG',
  payload: { viewConfig },
});

export const setViewerRightBarWidth = viewerRightBarWidth => ({
  type: 'SET_VIEWER_RIGHT_BAR_WIDTH',
  payload: { viewerRightBarWidth },
});

export const setViewerRightBarShow = viewerRightBarShow => ({
  type: 'SET_VIEWER_RIGHT_BAR_SHOW',
  payload: { viewerRightBarShow },
});

export const undo = ActionCreators.undo();

import { ActionCreators } from 'redux-undo';

export const redo = ActionCreators.redo();

export const setHomeInfoBarClose = homeInfoBarClose => ({
  type: 'SET_HOME_INFO_BAR_CLOSE',
  payload: { homeInfoBarClose, },
});

export const setViewConfig = viewConfig => ({
  type: 'SET_VIEW_CONFIG',
  payload: { viewConfig, },
});

export const undo = ActionCreators.undo();

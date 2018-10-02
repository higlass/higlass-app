import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import defaultSetReducer from '../utils/default-set-reducer';


export const homeInfoBarClose = defaultSetReducer(
  'homeInfoBarClose', false
);

export const viewConfig = defaultSetReducer(
  'viewConfig', null
);

export const viewerMouseTool = defaultSetReducer(
  'viewerMouseTool', 'panZoom'
);

export const viewerRightBarAnnotationsEntryDetails = defaultSetReducer(
  'viewerRightBarAnnotationsEntryDetails', true
);

export const viewerRightBarAnnotationsEntryList = defaultSetReducer(
  'viewerRightBarAnnotationsEntryList', true
);

export const viewerRightBarAnnotationsEntrySelection = defaultSetReducer(
  'viewerRightBarAnnotationsEntrySelection', true
);

export const viewerRightBarInfoLensLocation = defaultSetReducer(
  'viewerRightBarInfoLensLocation', true
);

export const viewerRightBarInfoLensValue = defaultSetReducer(
  'viewerRightBarInfoLensValue', true
);

export const viewerRightBarShow = defaultSetReducer(
  'viewerRightBarShow', false
);

export const viewerRightBarTab = defaultSetReducer(
  'viewerRightBarTab', 'info'
);

export const viewerRightBarWidth = defaultSetReducer(
  'viewerRightBarWidth', 200
);

const appReducer = combineReducers({
  routing,
  homeInfoBarClose,
  viewConfig,
  viewerMouseTool,
  viewerRightBarAnnotationsEntryDetails,
  viewerRightBarAnnotationsEntryList,
  viewerRightBarAnnotationsEntrySelection,
  viewerRightBarShow,
  viewerRightBarTab,
  viewerRightBarWidth,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;  // eslint-disable-line no-param-reassign
  }

  return appReducer(state, action);
};

export default rootReducer;

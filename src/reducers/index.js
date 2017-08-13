import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import defaultSetReducer from '../utils/default-set-reducer';


export const homeInfoBarClose = defaultSetReducer('homeInfoBarClose', false);

export const viewConfig = defaultSetReducer('viewConfig', null);

export const viewerMouseTool = defaultSetReducer('viewerMouseTool', 'panZoom');

export const viewerRightBarShow = defaultSetReducer('viewerRightBarShow', false);

export const viewerRightBarTab = defaultSetReducer('viewerRightBarTab', 'info');

export const viewerRightBarWidth = defaultSetReducer('viewerRightBarWidth', 200);


export default combineReducers({
  routing,
  homeInfoBarClose,
  viewConfig,
  viewerMouseTool,
  viewerRightBarShow,
  viewerRightBarTab,
  viewerRightBarWidth,
});

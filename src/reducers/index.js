import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import defaultSetReducer from '../utils/default-set-reducer';


export const homeInfoBarClose = defaultSetReducer('homeInfoBarClose', false);

export const viewConfig = defaultSetReducer('viewConfig', null);


export default combineReducers({
  routing,
  homeInfoBarClose,
  viewConfig,
});

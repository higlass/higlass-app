import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import viewConfig from './view-config';

export default combineReducers({
  routing,
  viewConfig,
});

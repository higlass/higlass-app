import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import viewConfig from './viewConfig';

export default combineReducers({
  routing,
  viewConfig,
});

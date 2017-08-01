import { setViewConfig } from '../actions';
import deepClone from '../utils/deep-clone';

const viewConfig = (state = null, action) => {
  switch (action.type) {
    case setViewConfig().type:
      return deepClone(action.payload.viewConfig);
    default:
      return state;
  }
};

export default viewConfig;

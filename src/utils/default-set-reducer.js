import camelToConst from './camel-to-const';
import deepClone from './deep-clone';

const clone = (value) => {
  switch (typeof value) {
    case 'object':
      return deepClone(value);
    default:
      return value;
  }
};

const defaultSetReducer =
  (key, defaultValue) =>
    (state = defaultValue, action) => {
      switch (action.type) {
        case `SET_${camelToConst(key)}`:
          return clone(action.payload[key]);
        default:
          return state;
      }
    };

export default defaultSetReducer;

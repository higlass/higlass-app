import createHistory from 'history/createBrowserHistory';
import localforage from 'localforage';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import freeze from 'redux-freeze';
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore, purgeStoredState } from 'redux-persist';
import { asyncSessionStorage } from 'redux-persist/storages';
import thunk from 'redux-thunk';
import undoable, { ActionCreators, groupByActionTypes } from 'redux-undo';

// Reducer
import rootReducer from '../reducers';

// Actions
import {
  setViewConfig,
  setViewerMouseTool,
  setViewerRightBarShow,
  setViewerRightBarWidth,
} from '../actions';

// Utils
import MultiStorage from '../utils/multi-storage';

const prefix = 'HiGlassApp.';

const prepareStore = MultiStorage([
  asyncSessionStorage,
  localforage,
], prefix);

const config = {
  debounce: 25,
  keyPrefix: prefix,
};

const history = createHistory();

const middleware = [
  autoRehydrate(),
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(history)),
];

if (process.env.NODE_ENV === 'development') {
  // Configure the logger middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middleware.push(applyMiddleware(freeze));
  middleware.push(applyMiddleware(logger));
}

const configure = (initialState) => {
  const store = createStore(
    undoable(enableBatching(rootReducer), {
      groupBy: groupByActionTypes([
        setViewConfig().type,
        setViewerMouseTool().type,
        setViewerRightBarShow().type,
        setViewerRightBarWidth().type,
      ]),
      limit: 20,
    }),
    initialState,
    compose(...middleware)
  );

  // Snippet to allow hot reload to work with reducers
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(rootReducer);
    });
  }

  return prepareStore.then((storage) => {
    config.storage = storage;

    return new Promise((resolve, reject) => {
      persistStore(store, config, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(store);
        }
      });
    });
  });
};

class State {
  configure(initialState) {
    this.store = configure(initialState);

    return this;
  }

  reset() {
    // Clear history
    this.store.dispatch(ActionCreators.clearHistory());

    // Purge persistent store
    return purgeStoredState(config);
  }
}

const state = new State();

export {
  configure,
  history,
  state,
};

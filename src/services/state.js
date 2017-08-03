import createHistory from 'history/createBrowserHistory';

import localforage from 'localforage';

import { routerMiddleware } from 'react-router-redux';

import { applyMiddleware, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import freeze from 'redux-freeze';
import { createLogger } from 'redux-logger';
import { autoRehydrate, persistStore, purgeStoredState } from 'redux-persist';
import thunk from 'redux-thunk';
import undoable, { ActionCreators } from 'redux-undo';

import rootReducer from '../reducers';

const config = {
  storage: localforage,
  debounce: 25,
  keyPrefix: 'HiGlassApp.',
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

  return new Promise((resolve, reject) => {
    persistStore(store, config, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(store);
      }
    });
  });
};

class State {
  configure(initialState) {
    this.store = configure(initialState);

    return this;
  }

  undo() {
    this.store.dispatch(ActionCreators.undo());

    return this;
  }

  redo() {
    this.store.dispatch(ActionCreators.redo());

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

import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { history, state } from './services/state';

// Components
import App from './components/App';
import AppFake from './components/AppFake';

// Services
import auth from './services/auth';

// Utils
import Logger from './utils/logger';
import registerServiceWorker from './registerServiceWorker';

// Styles
import './index.scss';

const logger = Logger('Index');

// Initialize store
let rehydratedStore;
const storeRehydrated = state.configure().store;

const render = (Component, store, error) => {
  if (!store) {
    ReactDOM.render(
      <AppFake error={error}/>,
      document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  }
};

render(AppFake);

auth
  .checkAuthentication()
  .then(() => storeRehydrated)
  .then((store) => {
    rehydratedStore = store;
    render(App, store);
  })
  .catch((error) => {
    logger.error('Failed to rehydrate the store! This is fatal!', error);
    render(undefined, undefined, 'Failed to initialize! This is bad, please contact an admin.');
  });

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;  // eslint-disable-line global-require
    render(NextApp, rehydratedStore);
  });
  storeRehydrated.then((store) => { window.store = store; });
}

registerServiceWorker();

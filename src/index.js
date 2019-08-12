import createPubSub from 'pub-sub-es';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './service-worker';

// HOCs
import { Provider as PubSubProvider } from './hocs/with-pub-sub';

// Components
import App from './components/App';
import AppFake from './components/AppFake';

// Services
import auth from './services/auth';

// Factories
import { createState } from './factories/state';

// Utils
import Logger from './utils/logger';
import pathify from './utils/pathify';

// Styles
import './index.scss';

const logger = Logger('Index');

// Initialize store
const state = createState();
let rehydratedStore;
const storeRehydrated = state.configure();

// Init pub-sub service
const pubSub = createPubSub();

const basename = pathify(
  typeof window.HGAC_BASEPATH === 'string'
    ? window.HGAC_BASEPATH // from compiled `config.js`
    : HGAC_BASEPATH // from webpack's DefinePlugin
);

const render = (Component, store, error) => {
  if (!store) {
    ReactDOM.render(
      <PubSubProvider value={pubSub}>
        <AppFake error={error} />
      </PubSubProvider>,
      document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <PubSubProvider value={pubSub}>
            <Component />
          </PubSubProvider>
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  }
};

render(AppFake);

auth
  .checkAuthentication()
  .then(() => storeRehydrated)
  .then(store => {
    rehydratedStore = store;
    render(App, store);
  })
  .catch(error => {
    logger.error('Failed to rehydrate the store! This is fatal!', error);
    render(
      undefined,
      undefined,
      'Failed to initialize! This is bad, please contact an admin.'
    );
  });

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default; // eslint-disable-line global-require
    render(NextApp, rehydratedStore);
  });
  storeRehydrated.then(store => {
    window.store = store;
  });
}

// Chnage to `serviceWorker.register();` to use the service worker
serviceWorker.unregisterAll();

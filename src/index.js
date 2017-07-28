import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { history, state } from './services/state';

import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

// Initialize store
const store = state.configure().store;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/App/App', () => {
        const NextApp = require('./components/App/App').default;
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <NextApp />
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
        );
    });
    window.store = store;
}

registerServiceWorker();

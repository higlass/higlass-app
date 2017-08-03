import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DropNotifier from './DropNotifier';
import Main from './Main';
import TopBar from './TopBar';

// Actions
import { setViewConfig } from '../actions';

// Services
import domEvent from '../services/dom-event';
import pubSub from '../services/pub-sub';

// Utils
import loadViewConfig from '../utils/load-view-config';
import Logger from '../utils/logger';

import './App.scss';

const logger = Logger('App');

const dropHandler = (event) => {
  loadViewConfig(event.dataTransfer.files[0])
    .then(() => {
      logger.log('JSON loaded');
    })
    .catch((error) => {
      logger.error(error);
      pubSub.publish('globalError', 'Only drop valid JSON view configs.');
    });
};


class App extends React.Component {
  componentDidMount() {
    domEvent.register('orientationchange', window);
    domEvent.register('resize', window);
    domEvent.register('scroll', document);
  }

  componentWillUnmount() {
    domEvent.unregister('orientationchange', window);
    domEvent.unregister('resize', window);
    domEvent.unregister('scroll', document);
  }

  render() {
    return (
      <div className='app full-mdim'>
        <DropNotifier
          drop={dropHandler} />
        <TopBar />
        <Main />
      </div>
    );
  }
}

App.propTypes = {
  setViewConfig: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setViewConfig: (viewConfig) => {
    dispatch(setViewConfig(viewConfig));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

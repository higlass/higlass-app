import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import DropNotifier from '../DropNotifier/DropNotifier';
import Main from '../Main/Main';
import TopBar from '../TopBar/TopBar';

// Actions
import { setViewConfig } from '../../actions';

// Services
import domEvent from '../../services/dom-event';

// Utils
import loadViewConfig from '../../utils/load-view-config';
import Logger from '../../utils/logger';

import './App.scss';

const logger = Logger('App');


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
          drop={this.dropHandler.bind(this)} />
        <TopBar />
        <Main />
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  dropHandler(event) {
    loadViewConfig(event.dataTransfer.files[0])
      .then(() => {
        logger.log('JSON loaded');
      })
      .catch((error) => {
        logger.error(error);
      });
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

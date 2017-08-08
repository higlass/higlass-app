import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Dialog from './Dialog';
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
  constructor(props) {
    super(props);

    this.pubSubs = [];

    this.state = {
      dialog: undefined,
    };
  }

  componentDidMount() {
    domEvent.register('orientationchange', window);
    domEvent.register('resize', window);
    domEvent.register('scroll', document);
    domEvent.register('keyup', document);

    this.pubSubs.push(
      pubSub.subscribe('globalDialog', this.dialogHandler.bind(this))
    );
  }

  componentWillUnmount() {
    domEvent.unregister('orientationchange', window);
    domEvent.unregister('resize', window);
    domEvent.unregister('scroll', document);
    domEvent.unregister('keyup', document);

    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  render() {
    return (
      <div className='app full-mdim'>
        <DropNotifier
          drop={dropHandler} />
        {this.state.dialog &&
          <Dialog
            headline={this.state.dialog.headline}
            icon={this.state.dialog.icon}
            message={this.state.dialog.message}
            reject={this.state.dialog.request.reject}
            rejectText={this.state.dialog.rejectText}
            resolve={this.state.dialog.request.resolve}
            resolveOnly={this.state.dialog.resolveOnly}
            resolveText={this.state.dialog.resolveText} />
        }
        <TopBar />
        <Main />
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  dialogHandler(dialog) {
    if (!dialog) { return; }

    this.setState({
      dialog,
    });

    dialog.request.finally(() => {
      this.setState({
        dialog: undefined,
      });
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

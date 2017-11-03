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
import { redo, setViewConfig, undo } from '../actions';

// Services
import auth from '../services/auth';
import domEvent from '../services/dom-event';
import pubSub from '../services/pub-sub';

// Utils
import loadViewConfig from '../utils/load-view-config';
import Logger from '../utils/logger';

import './App.scss';

const logger = Logger('App');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];

    this.state = {
      dialog: undefined,
      isAuthenticated: auth.isAuthenticated(),
    };
  }

  componentDidMount() {
    domEvent.register('click', document);
    domEvent.register('keydown', document);
    domEvent.register('keyup', document);
    domEvent.register('mousemove', document);
    domEvent.register('mouseup', document);
    domEvent.register('orientationchange', window);
    domEvent.register('resize', window);
    domEvent.register('scroll', document);

    this.pubSubs.push(
      pubSub.subscribe('globalDialog', this.dialogHandler.bind(this))
    );

    this.pubSubs.push(
      pubSub.subscribe('keydown', this.keyDownHandler.bind(this))
    );

    this.pubSubs.push(
      pubSub.subscribe('login', this.loginHandler.bind(this))
    );

    this.pubSubs.push(
      pubSub.subscribe('logout', this.logoutHandler.bind(this))
    );
  }

  componentWillUnmount() {
    domEvent.unregister('click', document);
    domEvent.unregister('keydown', document);
    domEvent.unregister('keyup', document);
    domEvent.unregister('mousemove', document);
    domEvent.unregister('mouseup', document);
    domEvent.unregister('orientationchange', window);
    domEvent.unregister('resize', window);
    domEvent.unregister('scroll', document);

    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isAuthenticated &&
      !prevState.isAuthenticated &&
      this.props.location.pathname.substr(0, 4) !== '/app'
    ) {
      this.props.history.push('/app');
    }
  }

  render() {
    return (
      <div className='app full-mdim'>
        <DropNotifier
          drop={this.dropHandler.bind(this)} />
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
        <TopBar
          isAuthenticated={this.state.isAuthenticated} />
        <Main
          isAuthenticated={this.state.isAuthenticated} />
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

  dropHandler(event) {
    loadViewConfig(event.dataTransfer.files[0])
      .then((viewConfig) => {
        logger.debug('ViewConfig JSON loaded');

        this.props.setViewConfig(viewConfig);

        if (this.props.location.pathname.substr(0, 4) !== '/app') {
          this.props.history.push('/app');
        }
      })
      .catch((error) => {
        logger.error(error);
        pubSub.publish('globalError', 'Only drop valid JSON view configs.');
      });
  }

  keyDownHandler(event) {
    if (event.keyCode === 89 && (event.ctrlKey || event.metaKey)) {  // CMD + Y
      event.preventDefault();
      this.props.redo();
    }

    if (event.keyCode === 90 && (event.ctrlKey || event.metaKey)) {  // CMD + Z
      event.preventDefault();
      this.props.undo();
    }
  }

  loginHandler() {
    this.setState({ isAuthenticated: true });
  }

  logoutHandler() {
    this.setState({ isAuthenticated: false });
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  redo: PropTypes.func.isRequired,
  setViewConfig: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  redo: () => dispatch(redo),
  setViewConfig: viewConfig => dispatch(setViewConfig(viewConfig)),
  undo: () => dispatch(undo),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import Dialog from './Dialog';
import DropNotifier from './DropNotifier';
import Main from './Main';
import TopBar from './TopBar';

// Actions
import { redo, setViewConfig, undo } from '../actions';

// Factories
import createDomEvent from '../factories/dom-event';

// Services
import auth from '../services/auth';

// Configs
import { IGNORED_FOCUS_ELEMENTS } from '../configs';

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
      higlassOptions: {
        sizeMode: 'bounded'
      },
      isAuthenticated: auth.isAuthenticated(),
    };

    this.domEvent = createDomEvent(props.pubSub);

    this.dialogHandlerBound = this.dialogHandler.bind(this);
    this.keyDownHandlerBound = this.keyDownHandler.bind(this);
    this.loginHandlerBound = this.loginHandler.bind(this);
    this.logoutHandlerBound = this.logoutHandler.bind(this);
    this.hgSizeModeHandlerBound = this.hgSizeModeHandler.bind(this);
  }

  componentDidMount() {
    this.domEvent.register('click', document);
    this.domEvent.register('keydown', document);
    this.domEvent.register('keyup', document);
    this.domEvent.register('mousemove', document);
    this.domEvent.register('mouseup', document);
    this.domEvent.register('orientationchange', window);
    this.domEvent.register('resize', window);
    this.domEvent.register('scroll', document);

    this.pubSubs.push(
      this.props.pubSub.subscribe('globalDialog', this.dialogHandlerBound)
    );

    this.pubSubs.push(
      this.props.pubSub.subscribe('keydown', this.keyDownHandlerBound)
    );

    this.pubSubs.push(
      this.props.pubSub.subscribe('login', this.loginHandlerBound)
    );

    this.pubSubs.push(
      this.props.pubSub.subscribe('logout', this.logoutHandlerBound)
    );

    this.pubSubs.push(
      this.props.pubSub.subscribe('hgSizeMode', this.hgSizeModeHandlerBound)
    );
  }

  componentWillUnmount() {
    this.domEvent.unregister('click', document);
    this.domEvent.unregister('keydown', document);
    this.domEvent.unregister('keyup', document);
    this.domEvent.unregister('mousemove', document);
    this.domEvent.unregister('mouseup', document);
    this.domEvent.unregister('orientationchange', window);
    this.domEvent.unregister('resize', window);
    this.domEvent.unregister('scroll', document);

    this.pubSubs.forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isAuthenticated
      && !prevState.isAuthenticated
      && this.props.location.pathname.substr(0, 4) !== '/app'
    ) {
      this.props.history.push('/app');
    }
  }

  render() {
    return (
      <div className='app full-mdim'>
        <DropNotifier
          drop={this.dropHandler.bind(this)} />
        {this.state.dialog
          && <Dialog
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
          isAuthenticated={this.state.isAuthenticated}
          higlassOptions={this.state.higlassOptions} />
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
        this.props.pubSub.publish('globalError', 'Only drop valid JSON view configs.');
      });
  }

  hgSizeModeHandler(sizeMode) {
    this.setState({
      higlassOptions: {
        ...this.state.higlassOptions,
        sizeMode,
      }
    });
  }

  keyDownHandler(event) {
    if (
      IGNORED_FOCUS_ELEMENTS.indexOf(
        document.activeElement.tagName.toLowerCase()
      ) >= 0
    )
      return;

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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  pubSub: PropTypes.object.isRequired,
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

export default withPubSub(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
);

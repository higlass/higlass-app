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
import scroll from '../../services/scroll';

// Utils
import Logger from '../../utils/logger';

import './App.scss';

const logger = Logger('App');


class App extends React.Component {
  componentDidMount() {
    scroll.register(document);
  }

  componentWillUnmount() {
    scroll.unregister(document);
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
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (fileEvent) => {
      try {
        this.props.setViewConfig(JSON.parse(fileEvent.target.result));
      } catch (e) {
        logger.error('Only drop valid JSON', e);
      }
    });

    reader.readAsText(file);
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

// import * as higlass from 'higlass';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import AppInfo from '../components/AppInfo';
import BottomBar from '../components/BottomBar';
import ButtonIcon from '../components/ButtonIcon';
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import ErrorMsgCenter from '../components/ErrorMsgCenter';
import SpinnerCenter from '../components/SpinnerCenter';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';

// Actions
import { setViewConfig } from '../actions';

// Containers
import HiGlassLoader from '../containers/HiGlassLoader';

// Utils
import Logger from '../utils/logger';

const logger = Logger('Viewer');

const fetchViewConfig = (configId, base = '') => fetch(
  `${base}/api/v1/viewconfs/?d=${configId}`
).then(response => response.json());


class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {},
      error: '',
      isLoading: false,
      options: {},
    };
  }

  componentDidMount() {
    this.loadViewConfig();
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewConfigId !== prevProps.viewConfigId) {
      this.loadViewConfig();
    }
  }

  render() {
    return (
      <ContentWrapper name='viewer' bottomBar={true}>
        <Content name='viewer' rel={true}>
          <div className='full-dim'>
            {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
            {!this.state.error && (
              this.state.isLoading ?
                <SpinnerCenter /> : <HiGlassLoader onError={this.onError.bind(this)} />
              )
            }
          </div>
        </Content>
        <BottomBar>
          <ul className='flex-c flex-a-c no-list-style' />
          <ul className='flex-c flex-a-c flex-jc-e no-list-style'>
            <li>
              <ButtonIcon
                icon='info'
                iconOnly={true}
                onClick={this.showInfo.bind(this)} />
            </li>
          </ul>
        </BottomBar>
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  loadViewConfig(viewConfigId = this.props.viewConfigId) {
    this.setState({
      error: '',
      isLoading: true,
    });

    fetchViewConfig(viewConfigId)
      .then(this.setViewConfig.bind(this))
      .catch(() => {
        logger.warning('View config is not available locally!');

        // Try loading config from HiGlass.io
        return fetchViewConfig(viewConfigId, 'http://higlass.io');
      })
      .then(this.setViewConfig.bind(this))
      .catch((error) => {
        logger.error('Could not load or parse config.', error);
        this.setState({
          error: 'Could not load config.',
          isLoading: false,
        });
      });
  }

  onError(error) {
    this.setState({
      error,
      isLoading: false,
    });
  }

  setViewConfig(viewConfig) {
    if (!viewConfig || viewConfig.error) {
      this.setState({
        error: viewConfig.error || 'View config broken.',
        isLoading: false,
      });
    } else {
      this.setState({
        error: '',
        isLoading: false,
      });
      this.props.setViewConfig(viewConfig);
    }
  }

  showInfo() {
    const dialog = new Deferred();
    pubSub.publish(
      'globalDialog',
      {
        message: <AppInfo />,
        request: dialog,
        resolveOnly: true,
        resolveText: 'Close',
        icon: 'logo',
        headline: 'HiGlass',
      }
    );
  }
}

Viewer.defaultProps = {
  viewConfigId: 'default',
};

Viewer.propTypes = {
  setViewConfig: PropTypes.func.isRequired,
  viewConfigId: PropTypes.string,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setViewConfig: (viewConfig) => {
    dispatch(setViewConfig(viewConfig));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Viewer));

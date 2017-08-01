import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Components
import BottomBar from '../../components/BottomBar/BottomBar';
import Content from '../../components/Content/Content';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import ErrorMsgCenter from '../../components/ErrorMsg/ErrorMsgCenter';
import SpinnerCenter from '../../components/Spinner/SpinnerCenter';

// Actions
import { setViewConfig } from '../../actions';

// Containers
import HiGlassLoader from '../../containers/HiGlassLoader';

// Utils
import Logger from '../../utils/logger';

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
      <ContentWrapper bottomBar={true}>
        <Content name='viewer'>
          <div className='full-wh'>
            {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
            {!this.state.error && (
              this.state.isLoading ?
                <SpinnerCenter /> : <HiGlassLoader />
              )
            }
          </div>
        </Content>
        <BottomBar />
      </ContentWrapper>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  setViewConfig(viewConfig) {
    this.setState({
      error: '',
      isLoading: false,
    });
    this.props.setViewConfig(viewConfig);
  }

  loadViewConfig(viewConfigId = this.props.viewConfigId) {
    this.setState({
      error: '',
      isLoading: true,
    });

    fetchViewConfig(viewConfigId)
      .then(this.setViewConfig.bind(this))
      .catch(() => {
        logger.warning('View config is not available locally!');
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

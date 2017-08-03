import PropTypes from 'prop-types';
import React from 'react';

// Components
import ErrorBar from './ErrorBar';

// Services
import pubSub from '../services/pub-sub';

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    this.pubSubs = [];
    this.pubSubs.push({
      event: 'globalError',
      id: pubSub.subscribe('globalError', this.errorHandler.bind(this)),
    });
  }

  componentWillUnmount() {
    this.pubSubs.forEach((subscription) => {
      pubSub.unsubscribe(subscription.event, undefined, subscription.id);
    });
  }

  render() {
    return (
      <div
        className={`flex-c flex-v full-mdim content-wrapper ${this.props.name} ${this.props.bottomBar ? 'content-wrapper-bottom-bar' : ''}`}>
        {this.state.error &&
          <ErrorBar
            autoClose={true}
            isClosable={true}
            msg={this.state.error}
            onClose={() => this.setState({ error: '', })}
            wrap={true} />
        }
        {this.props.children}
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  errorHandler(error) {
    console.log('handle error', error);
    this.setState({
      error,
    });
  }
}

ContentWrapper.defaultProps = {
  bottomBar: false,
};

ContentWrapper.propTypes = {
  bottomBar: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default ContentWrapper;

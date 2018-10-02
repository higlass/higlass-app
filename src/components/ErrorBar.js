import PropTypes from 'prop-types';
import React from 'react';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import ButtonIcon from './ButtonIcon';
import Icon from './Icon';

// Styles
import './ErrorBar.scss';

class ErrorBar extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];
  }

  componentDidMount() {
    this.pubSubs.push(
      this.props.pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs
      .forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  render() {
    return (
      <header className='error-bar rel'>
        <div className={`error-bar-content flex-c flex-a-c flex-jc-sb ${this.props.wrap ? 'wrap' : 'no-wrap'}`}>
          <div className='flex-c flex-a-c error-bar-content'>
            <Icon iconId='warning' />
            <p className='error-bar-msg'>{this.props.msg}</p>
          </div>
          {this.props.isClosable
            && <div className='flex-c flex-a-c flex-jc-c rel error-bar-close'>
              <ButtonIcon
                icon='cross'
                iconOnly={true}
                onClick={this.props.onClose} />
            </div>
          }
        </div>
      </header>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  keyUpHandler(event) {
    if (event.keyCode === 27) {  // ESC
      this.props.onClose();
    }
  }
}

ErrorBar.propTypes = {
  pubSub: PropTypes.object.isRequired,
  isClosable: PropTypes.bool,
  msg: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  wrap: PropTypes.bool,
};

export default withPubSub(ErrorBar);

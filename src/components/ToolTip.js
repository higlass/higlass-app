import { PropTypes } from 'prop-types';
import React from 'react';

// Components
import Arrow from './Arrow';

// Styles
import './ToolTip.scss';

class ToolTip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false,
    };
  }

  render() {
    return (
      <div
        className='rel tool-tip-wrapper'
        onMouseEnter={this.show.bind(this)}
        onMouseLeave={this.hide.bind(this)}>
        <div className='tool-tip-anchor'>
          <div className={`tool-tip ${this.state.isShown ? 'is-shown' : ''}`}>
            <Arrow
              direction='down'
              size={4} />
            {this.props.title}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  hide() {
    if (this.delayInTimeout) clearTimeout(this.delayInTimeout);

    this.delayOutTimeout = setTimeout(() => {
      this.setState({
        isShown: false,
      });
    }, this.props.delayOut);
  }

  show() {
    if (this.delayOutTimeout) clearTimeout(this.delayOutTimeout);

    this.delayInTimeout = setTimeout(() => {
      this.setState({
        isShown: true,
      });
    }, this.props.delayOut);
  }
}

ToolTip.defaultProps = {
  delayIn: 0,
  delayOut: 0,
};

ToolTip.propTypes = {
  children: PropTypes.node,
  delayIn: PropTypes.number,
  delayOut: PropTypes.number,
  closeOnClick: PropTypes.bool,
  title: PropTypes.string,
};

export default ToolTip;

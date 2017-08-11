import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';

// Services
import pubSub from '../services/pub-sub';

// Styles
import './RightBar.scss';


class RightBar extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];
  }

  componentDidMount() {
    this.pubSubs.push(
      pubSub.subscribe('mousemove', this.mouseMoveHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  render() {
    let classNames = 'right-bar';
    classNames += this.props.show ? ' is-shown' : '';

    const styles = {
      width: `${this.props.show ? this.props.width : 4}px`,
    };

    return (
      <aside
        className={classNames}
        style={styles}>
        <ButtonIcon
          className='right-bar-toggler'
          icon='arrow-right-double'
          iconMirrorV={!this.props.show}
          iconOnly={true}
          onMouseDown={this.mouseDownHandler.bind(this)}
          onMouseUp={this.mouseUpHandler.bind(this)} />
        {this.props.children}
      </aside>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  mouseDownHandler(event) {
    this.mouseDown = true;
    this.mouseDownTime = performance.now();
    this.mouseDownX = event.clientX;
    this.mouseDownWidth = this.props.width;
  }

  mouseMoveHandler(event) {
    if (this.mouseDown) {
      const deltaX = this.mouseDownX - event.clientX;
      this.props.widthSetter(this.mouseDownWidth + deltaX);
    }
  }

  mouseUpHandler(event) {
    const deltaTime = performance.now() - this.mouseDownTime;
    const deltaX = this.mouseDownX - event.clientX;

    if (Math.abs(deltaX) < 2 && deltaTime < 150) {
      this.props.toggle();
    } else {
      this.props.widthSetter(this.mouseDownWidth + deltaX);
    }

    this.mouseDown = false;
  }
}

RightBar.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  width: PropTypes.number,
  widthSetter: PropTypes.func,
};

export default RightBar;

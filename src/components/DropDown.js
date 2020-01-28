import PropTypes from 'prop-types';
import React from 'react';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Utils
import { debounce, hasParent } from '../utils';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.pubSubs = [];

    this.clickHandlerBnd = this.clickHandler.bind(this);
    this.mouseEnterHandlerBnd = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandlerBnd = this.mouseLeaveHandler.bind(this);
    this.closeDb = debounce(this.close.bind(this), 500);
  }

  componentDidMount() {
    if (this.props.closeOnOuterClick) {
      this.pubSubs.push(
        this.props.pubSub.subscribe('click', this.clickHandlerBnd)
      );
    }
  }

  componentWillUnmount() {
    this.pubSubs
      .forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.id
      && this.state.isOpen
      && this.state.isOpen !== prevState.isOpen
    ) {
      this.props.pubSub.publish(`DropDown${this.props.id}`, this.state.isOpen);
    }
  }

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, {
        dropDownIsOpen: this.state.isOpen,
        dropDownToggle: this.toggle.bind(this),
        dropDownOpen: this.open.bind(this),
        dropDownClose: this.close.bind(this),
      })
    );

    let className = 'rel drop-down';

    className += this.props.className ? ` ${this.props.className}` : '';
    className += this.state.isOpen ? ' drop-down-is-open' : '';
    className += this.props.alignRight ? ' drop-down-align-right' : '';
    className += this.props.alignTop ? ' drop-down-align-top' : '';

    return (
      <div
        className={className}
        ref={(el) => { this.el = el; }}
        onMouseEnter={this.props.closeOnMouseLeave ? this.mouseEnterHandlerBnd : null}
        onMouseLeave={this.props.closeOnMouseLeave ? this.mouseLeaveHandlerBnd : null}
      >
        {childrenWithProps}
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  clickHandler(event) {
    if (!hasParent(event.target, this.el)) {
      this.close();
    }
  }

  mouseEnterHandler() {
    this.closeDb.cancel();
  }

  mouseLeaveHandler() {
    this.closeDb()
  }

  close() {
    this.setState({
      isOpen: false,
    });
  }

  open() {
    this.setState({
      isOpen: true,
    });
  }

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

DropDown.propTypes = {
  alignRight: PropTypes.bool,
  alignTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeOnOuterClick: PropTypes.bool,
  closeOnMouseLeave: PropTypes.bool,
  id: PropTypes.string,
  pubSub: PropTypes.object.isRequired,
};

export default withPubSub(DropDown);

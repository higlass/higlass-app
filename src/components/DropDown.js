import PropTypes from 'prop-types';
import React from 'react';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        dropDownIsOpen: this.state.isOpen,
        dropDownToggle: this.toggle.bind(this),
      })
    );

    let className = 'rel drop-down';

    className += this.props.className ? ` ${this.props.className}` : '';
    className += this.state.isOpen ? ' drop-down-is-open' : '';
    className += this.props.alignRight ? ' drop-down-align-right' : '';
    className += this.props.alignTop ? ' drop-down-align-top' : '';

    return (
      <div className={className}>
        {childrenWithProps}
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alignRight: PropTypes.bool,
  alignTop: PropTypes.bool,
};

export default DropDown;

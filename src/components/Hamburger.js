import PropTypes from 'prop-types';
import React from 'react';

// Styles
import './Hamburger.scss';


class Hamburger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };
  }

  componentDidUpdate() {
    this.props.onClick(this.state.isActive);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isActive === this.state.isActive) { return false; }
    return true;
  }

  render() {
    return (
      <button
        className='hamburger-wrapper'
        onClick={this.toggle.bind(this)}>
        <div className={`hamburger hamburger-to-x ${this.state.isActive ? 'is-active' : ''}`}>
          <span></span>
        </div>
        <div className='hamburger-bg' />
      </button>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  toggle() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }
}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;

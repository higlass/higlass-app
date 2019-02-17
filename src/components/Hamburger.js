import PropTypes from 'prop-types';
import React from 'react';

// Styles
import './Hamburger.scss';


class Hamburger extends React.Component {
  render() {
    return (
      <button
        className='hamburger-wrapper'
        onClick={this.toggle.bind(this)}>
        <div className={`hamburger hamburger-to-x ${this.props.isActive ? 'is-active' : ''}`}>
          <span className="hamburger-bar-top"></span>
          <span className="hamburger-bar-middle"></span>
          <span className="hamburger-bar-bottom"></span>
        </div>
        <div className='hamburger-bg' />
      </button>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  toggle() {
    this.props.onClick(!this.props.isActive);
  }
}

Hamburger.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;

import PropTypes from 'prop-types';
import React from 'react';

const DropDownTrigger = props => (
  <div
    className='drop-down-trigger'>
    {React.cloneElement(
      props.children,
      {
        isActive: props.dropDownIsOpen,
        onClick: props.dropDownToggle,
        onMouseEnter: props.openOnMouseEnter ? props.dropDownOpen : null,
      }
    )}
  </div>
);

DropDownTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  dropDownIsOpen: PropTypes.bool,
  dropDownOpen: PropTypes.func,
  dropDownClose: PropTypes.func,
  dropDownToggle: PropTypes.func,
  openOnMouseEnter: PropTypes.bool,
};

export default DropDownTrigger;

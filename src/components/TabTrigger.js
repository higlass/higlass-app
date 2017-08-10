import PropTypes from 'prop-types';
import React from 'react';

const TabTrigger = props => (
  <div className='tab-trigger'>
    {React.cloneElement(
      props.children,
      {
        isActive: props.tabOpen === props.for,
        onClick: () => props.tabChange(props.for),
      }
    )}
  </div>
);

TabTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  for: PropTypes.string.isRequired,
  tabChange: PropTypes.func.isRequired,
  tabOpen: PropTypes.string.isRequired,
};

export default TabTrigger;

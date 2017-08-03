import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';
import Icon from './Icon';

// Styles
import './ErrorBar.scss';

const ErrorBar = props => (
  <header className='error-bar rel'>
    <div className={`flex-c flex-a-c flex-jc-sb ${props.wrap ? 'wrap' : ''}`}>
      <div className='flex-c flex-a-c error-bar-content'>
        <Icon iconId='warning' />
        <p className='error-bar-msg'>{props.msg}</p>
      </div>
      {props.isClosable &&
        <div className='flex-c flex-a-c flex-jc-c rel error-bar-close'>
          <ButtonIcon
            icon='cross'
            iconOnly={true}
            onClick={props.onClose} />
        </div>
      }
    </div>
  </header>
);

ErrorBar.propTypes = {
  isClosable: PropTypes.bool,
  msg: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  wrap: PropTypes.bool,
};

export default ErrorBar;

import PropTypes from 'prop-types';
import React from 'react';

// Components
import Icon from './Icon';

// Styles
import './Dialog.scss';

const Dialog = props => (
  <div className='flex-c flex-a-c flex-jc-c full-dim dialog'>
    <div className='dialog-window'>
      <div className='flex-c flex-v flex-a-c dialog-content'>
        {(props.headline || props.icon) &&
          <header className='flex-c flex-a-c'>
          {props.icon &&
            <Icon iconId={props.icon} />
          }
          {props.headline &&
            <h2>{props.headline}</h2>
          }
          </header>
        }
        {typeof props.message === 'string' ? (
          <p className='dialog-message'>{props.message}</p>
        ) : (
          <div className='dialog-message'>{props.message}</div>
        )}
      </div>
      <div className='flex-c dialog-buttons'>
        {!props.resolveOnly &&
          <button
            className='column-1-2'
            onClick={props.reject}>
            {props.rejectText}
          </button>
        }
        <button
          className={props.resolveOnly ? 'column-1' : 'column-1-2'}
          onClick={props.resolve}>
          {props.resolveText}
        </button>
      </div>
    </div>
  </div>
);

Dialog.defaultProps = {
  rejectText: 'Cancel',
  resolveText: 'OK',
};

Dialog.propTypes = {
  headline: PropTypes.string,
  icon: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  reject: PropTypes.func,
  rejectText: PropTypes.string,
  resolve: PropTypes.func,
  resolveOnly: PropTypes.bool,
  resolveText: PropTypes.string,
};

export default Dialog;

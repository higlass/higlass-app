import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';
import DropDownContent from './DropDownContent';
import DropDownTrigger from './DropDownTrigger';
import Icon from './Icon';
import TopBarDropDown from './TopBarDropDown';


const TopBarDropDowLogin = props => (
  <TopBarDropDown
    alignRight={true}
    className='top-bar-drop-down-login'
    closeOnOuterClick={props.closeOnOuterClick}>
    <DropDownTrigger>
      <ButtonIcon className='is-primary-nav' icon='login'>
        Log In
      </ButtonIcon>
    </DropDownTrigger>
    <DropDownContent>
      <form className='flex-c flex-v drop-down-form' onSubmit={props.login}>
        {props.isLoginUnsuccessful &&
          <div className='flex-c flex-a-c warning'>
            <Icon iconId='warning' />
            <span>Login failed.</span>
          </div>
        }
        {props.isServerUnavailable &&
          <div className='flex-c flex-a-c error'>
            <Icon iconId='warning' />
            <span>Auth server is unavailable.</span>
          </div>
        }
        <input
          placeholder='E-mail or username'
          type='text'
          disabled={props.isLoggingIn}
          onChange={props.loginUserIdHandler}
          value={props.loginUserId} />
        <input
          placeholder='Password'
          type='password'
          disabled={props.isLoggingIn}
          onChange={props.loginPasswordHandler}
          value={props.loginPassword} />
        <button
          type='submit'
          className={`is-primary ${props.isLoggingIn ? 'is-active' : ''}`}
          disabled={props.isLoggingIn}>
          {props.isLoggingIn ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </DropDownContent>
  </TopBarDropDown>
);

TopBarDropDowLogin.propTypes = {
  closeOnOuterClick: PropTypes.bool,
  isLoggingIn: PropTypes.bool,
  isLoginUnsuccessful: PropTypes.bool,
  isServerUnavailable: PropTypes.bool,
  login: PropTypes.func.isRequired,
  loginPasswordHandler: PropTypes.func.isRequired,
  loginPassword: PropTypes.string.isRequired,
  loginUserIdHandler: PropTypes.func.isRequired,
  loginUserId: PropTypes.string.isRequired,
};

export default TopBarDropDowLogin;

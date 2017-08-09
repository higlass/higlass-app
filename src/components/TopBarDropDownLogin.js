import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';
import DropDownContent from './DropDownContent';
import DropDownTrigger from './DropDownTrigger';
import TopBarDropDown from './TopBarDropDown';


const TopBarDropDowLogin = props => (
  <TopBarDropDown alignRight={true} className='top-bar-drop-down-login'>
    <DropDownTrigger>
      <ButtonIcon className='is-primary-nav' icon='login'>
        Log In
      </ButtonIcon>
    </DropDownTrigger>
    <DropDownContent>
      <form className='flex-c flex-v drop-down-form' onSubmit={props.login}>
        <input
          placeholder='E-mail or username'
          type='text'
          onChange={props.loginUserIdHandler}
          value={props.loginUserId} />
        <input
          placeholder='Password'
          type='password'
          onChange={props.loginPasswordHandler}
          value={props.loginPassword} />
        <button
          type="submit"
          className='is-primary'>Log in</button>
      </form>
    </DropDownContent>
  </TopBarDropDown>
);

TopBarDropDowLogin.propTypes = {
  login: PropTypes.func.isRequired,
  loginPasswordHandler: PropTypes.func.isRequired,
  loginPassword: PropTypes.string.isRequired,
  loginUserIdHandler: PropTypes.func.isRequired,
  loginUserId: PropTypes.string.isRequired,
};

export default TopBarDropDowLogin;

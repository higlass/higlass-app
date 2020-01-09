import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';
import DropDownContent from './DropDownContent';
import DropDownTrigger from './DropDownTrigger';
import TopBarDropDown from './TopBarDropDown';

// HOCs
import withPubSub from "../hocs/with-pub-sub";

// Styles
import './TopBarDropDownUser.scss';


const scrollChangeHandler = pubSub => event => {
  if (event.target.checked) {
    pubSub.publish('hgSizeMode', 'scroll');
  } else {
    pubSub.publish('hgSizeMode', 'overflow');
  }
};

const TopBarDropDowAppSettings = props => (
  <TopBarDropDown
    alignRight={true}
    className='top-bar-drop-down-user'
    closeOnOuterClick={props.closeOnOuterClick}>
    <DropDownTrigger>
      <ButtonIcon className='is-primary-nav' icon='cog-wheel' iconOnly />
    </DropDownTrigger>
    <DropDownContent>
      <div className='flex-c flex-v'>
        <div className='menu-field menu-text'>
          <div className='menu-text-label'>HiGlass Settings:</div>
        </div>
        <label className='flex flex-a-c menu-field menu-checkbox'>
          <input
            type="checkbox"
            onChange={scrollChangeHandler(props.pubSub)}
          /> Enable Scrolling
        </label>
      </div>
    </DropDownContent>
  </TopBarDropDown>
);

TopBarDropDowAppSettings.propTypes = {
  closeOnOuterClick: PropTypes.bool,
  pubSub: PropTypes.object.isRequired
};

export default withPubSub(TopBarDropDowAppSettings);

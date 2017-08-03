import PropTypes from 'prop-types';
import React from 'react';

import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

import './InfoBar.scss';

const InfoBar = props => (
  <header className='info-bar'>
    <div className={props.wrap && 'wrap'}>
      {props.children}
    </div>
    {props.isClosable &&
      <div className="flex-c flex-a-c flex-jc-c info-bar-close">
        <ButtonIcon icon='cross' iconOnly={true} onClick={props.onClose} />
      </div>
    }
  </header>
);

InfoBar.propTypes = {
  children: PropTypes.node.isRequired,
  isClosable: PropTypes.bool,
  onClose: PropTypes.func,
  wrap: PropTypes.bool,
};

export default InfoBar;

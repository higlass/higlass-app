import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';

// Styles
import './RightBar.scss';

const classNames = (props) => {
  let className = 'right-bar';

  className += props.show ? ' is-shown' : '';

  return className;
};

const styles = props => ({
  width: `${props.show ? props.width : 4}px`,
});


const RightBar = props => (
  <aside
    className={classNames(props)}
    style={styles(props)}>
    <ButtonIcon
      className='right-bar-toggler'
      icon='arrow-right-double'
      iconMirrorV={!props.show}
      iconOnly={true}
      onClick={props.toggle} />
    {props.children}
  </aside>
);

RightBar.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  width: PropTypes.number,
};

export default RightBar;

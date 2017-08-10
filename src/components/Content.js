import PropTypes from 'prop-types';
import React from 'react';

// Styles
import './Content.scss';

const classNames = (props) => {
  let className = 'flex-g-1 content';

  className += ` ${props.name}-content`;
  className += props.hasRightBar ? ' has-right-bar' : '';
  className += props.rel ? ' rel' : '';
  className += props.wrap ? ' wrap' : '';

  return className;
};

const styles = (props) => {
  if (props.hasRightBar) {
    return {
      marginRight: `${props.rightBarShow ? props.rightBarWidth : 0}px`,
    };
  }

  return {};
};

const Content = props => (
  <main
    className={classNames(props)}
    style={styles(props)}>
    {props.children}
  </main>
);

Content.propTypes = {
  children: PropTypes.node,
  hasRightBar: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rel: PropTypes.bool,
  rightBarShow: PropTypes.bool,
  rightBarWidth: PropTypes.number,
  wrap: PropTypes.bool,
};

export default Content;

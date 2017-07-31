import PropTypes from 'prop-types';
import React from 'react';

import ErrorMsg from '../ErrorMsg/ErrorMsg';

// import './ErrorMsgCenter.scss';

const ErrorMsgCenter = props => (
  <div className='full-dim flex-c flex-a-c flex-jc-c error-msg-center'>
    <ErrorMsg msg={props.msg} />
  </div>
);

ErrorMsgCenter.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default ErrorMsgCenter;

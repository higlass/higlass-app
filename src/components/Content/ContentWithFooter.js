import PropTypes from 'prop-types';

import React from 'react';

// Components
import Content from './Content';
import Footer from '../Footer/Footer';

const ContentWithFooter = props => (
  <div className='content-with-footer flex-c flex-v full-wh'>
    <Content name={props.name} wrap={props.wrap}>{props.children}</Content>
    <Footer />
  </div>
);

ContentWithFooter.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  wrap: PropTypes.bool,
};

export default ContentWithFooter;

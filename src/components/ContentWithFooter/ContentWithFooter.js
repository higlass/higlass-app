import PropTypes from 'prop-types';

import React from 'react';

// Components
import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';

const ContentWithFooter = (props) => (
  <div className='content-with-footer flex-c flex-v full-wh'>
    <Content>{props.children}</Content>
    <Footer />
  </div>
);

ContentWithFooter.propTypes = {
  children: PropTypes.node,
};

export default ContentWithFooter;

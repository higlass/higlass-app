import React from 'react';
import { connect } from 'react-redux';

// Components
import ContentWithFooter from '../../components/Content/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import Icon from '../../components/Icon/Icon';

import './NotFound.scss';

const NotFound = () => (
    <ContentWrapper>
    <ContentWithFooter name='not-found' wrap={true}>
      <div className="flex-c flex-v flex-a-c flex-jc-c full-wh">
        <div className='flex-c flex-v flex-a-c not-found-header'>
          <div className="icon-wrapper"><Icon iconId='sad' /></div>
          <h2 className='m-t-0'>Oh no&hellip; nothing found!</h2>
        </div>
        <em>
          The requested page either moved or does not exist.
        </em>
      </div>
    </ContentWithFooter>
  </ContentWrapper>
);

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);

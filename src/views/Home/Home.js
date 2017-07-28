import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Components
import ContentWithFooter from '../../components/ContentWithFooter/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';

// Stylesheets
import './Home.scss';

const Home = () => (
  <ContentWrapper>
    <ContentWithFooter name='home'>
      <div className='home-header'>
        <h2>Welcome to HiGlass</h2>
      </div>
      <p className='home-intro'>
        Let&apos;s build an awesome HiGlass app.
      </p>
    </ContentWithFooter>
  </ContentWrapper>
);

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

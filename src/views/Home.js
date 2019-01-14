import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import HiGlassViewer from '../components/HiGlassViewer';

// View Components
import HomeDemos from './HomeDemos';

// Actions
import { setHomeInfoBarClose } from '../actions';

// Stylesheets
import './Home.scss';

const showDemos = typeof window.HGAC_HOMEPAGE_DEMOS !== 'undefined'
  ? window.HGAC_HOMEPAGE_DEMOS  // from compiled `config.js`
  : HGAC_HOMEPAGE_DEMOS;  // from webpack's DefinePlugin

const Home = () => (
  <ContentWrapper name='home'>
    {showDemos ? (
      <HomeDemos />
    ) : (
      <Content name='home' rel={true} wrap={true}>
        <HiGlassViewer />
      </Content>
    )
    }
    <Footer />
  </ContentWrapper>
);

Home.propTypes = {
  homeInfoBarClose: PropTypes.bool,
  setHomeInfoBarClose: PropTypes.func,
};

const mapStateToProps = state => ({
  homeInfoBarClose: state.present.homeInfoBarClose,
});

const mapDispatchToProps = dispatch => ({
  setHomeInfoBarClose: (isClosed) => {
    dispatch(setHomeInfoBarClose(isClosed));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

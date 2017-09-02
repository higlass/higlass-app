import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import ButtonLikeLink from '../components/ButtonLikeLink';
import ButtonLikeFileSelect from '../components/ButtonLikeFileSelect';
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import DropArea from '../components/DropArea';
import Footer from '../components/Footer';
import HiGlassViewer from '../components/HiGlassViewer';
import Icon from '../components/Icon';
import InfoBar from '../components/InfoBar';

// View Components
import HomeDemos from './HomeDemos';

// Actions
import { setHomeInfoBarClose } from '../actions';

// Utils
import loadViewConfig from '../utils/load-view-config';
import Logger from '../utils/logger';

// Stylesheets
import './Home.scss';

const logger = Logger('Home');

const selectHandler = (event) => {
  loadViewConfig(event.target.files[0])
    .then(() => {
      logger.debug('JSON loaded');
    })
    .catch((error) => {
      logger.error(error);
    });
};

const Home = props => (
  <ContentWrapper name='home'>
    <InfoBar
      isClose={props.homeInfoBarClose}
      isClosable={true}
      onClose={() => props.setHomeInfoBarClose(!props.homeInfoBarClose)}
      wrap={true}>
      <div className='flex-c'>
        <p className='column-1-2 m-r-1 home-info-intro'>
        HiGlass is a tool for exploring and compare genomic contact matrices and tracks.
        Take a look at some <Link to='/examples'>examples</Link> or head over to the <Link to='/docs'>docs</Link> to learn how HiGlass can be used and configured. To load private data, HiGlass can be <Link to='/docs#home-running-locally'>run locally within a docker container</Link>.
        </p>
        <div className='column-1-2 m-l-1 flex-c flex-v home-info-actions'>
          <ButtonLikeLink className='flex-g-1' to='/examples'>
            <div className="flex-c flex-a-c full-h">
              <div className='flex-g-1'>Go to examples</div>
              <Icon iconId='arrow-right' />
            </div>
          </ButtonLikeLink>
          <DropArea className='flex-g-1'>
            <div className='flex-g-1'>Drag &amp; drop a local config</div>
            <Icon iconId='drag' />
          </DropArea>
          <ButtonLikeFileSelect
            className='flex-g-1'
            select={selectHandler}>Select a local config</ButtonLikeFileSelect>
        </div>
      </div>
    </InfoBar>
    <Content name='home' rel={true} wrap={true}>
      {HGAC_HOMEPAGE_DEMOS ? (
        <HomeDemos />
      ) : (
        <HiGlassViewer />
      )
      }
    </Content>
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

import React from 'react';
import { Link } from 'react-router-dom';

// Components
import ButtonLikeLink from '../../components/ButtonLikeLink/ButtonLikeLink';
import ButtonLikeFileSelect from '../../components/ButtonLikeFileSelect/ButtonLikeFileSelect';
import Content from '../../components/Content/Content';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import DropArea from '../../components/DropArea/DropArea';
import Footer from '../../components/Footer/Footer';
import Icon from '../../components/Icon/Icon';
import InfoBar from '../../components/InfoBar/InfoBar';

// Utils
import loadViewConfig from '../../utils/load-view-config';
import Logger from '../../utils/logger';

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

const infoBarCloseHandler = () => {
  logger.debug('Close that info bar');
};

const Home = () => (
  <ContentWrapper name='home'>
    <InfoBar isClosable={true} onClose={infoBarCloseHandler} wrap={true}>
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
          <ButtonLikeFileSelect className='flex-g-1' select={selectHandler}>Select a local config</ButtonLikeFileSelect>
        </div>
      </div>
    </InfoBar>
    <Content name='home' wrap={true}>
      <div className='home-four-third'>
        <div id='higlass' className='full-dim'></div>
      </div>
    </Content>
    <Footer />
  </ContentWrapper>
);

export default Home;

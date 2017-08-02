import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Content from '../../components/Content/Content';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import Footer from '../../components/Footer/Footer';

// Stylesheets
import './Home.scss';

const Home = () => (
  <ContentWrapper>
    <Content name='home' wrap={true}>
      <section className='flex-c m-t-1 m-b-2'>
        <p className='home-intro flex-g-1'>
        HiGlass is a tool for exploring genomic contact matrices and tracks.
        Please take a look at the <Link to='/examples'>examples</Link> and <Link to='/docs'>documentation</Link> for a description of the ways that it can be configured to explore and
        compare contact matrices. To load private data, HiGlass can be <a href='https://github.com/hms-dbmi/higlass/wiki#running-locally' target='_blank' rel='noopener noreferrer'>run
        locally within a docker container</a>.
        </p>
      </section>
      <div className='home-four-third'>
        <div id='higlass' className='full-dim'></div>
      </div>
    </Content>
    <Footer />
  </ContentWrapper>
);

export default Home;

import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

// Docs
import SideBarNav from '../sidebar.md';
import Wiki from '../wiki.md';

// Stylesheets
import './Docs.scss';


const Docs = () => (
  <ContentWrapper name='docs'>
    <Content name='docs'>
      <div className='flex-c flex-g-1 wrap p-t-1 p-b-1'>
        <div className="rel column-3-4 wiki">
          <Wiki />
        </div>
        <div className="rel column-1-4">
          <SideBar isSticky={true}><SideBarNav /></SideBar>
        </div>
      </div>
    </Content>
    <Footer />
  </ContentWrapper>
);

export default Docs;

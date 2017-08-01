import React from 'react';

// Components
import ContentWithFooter from '../../components/Content/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import SideBar from '../../components/SideBar/SideBar';

// Docs
import SideBarNav from '../../sidebar.md';
import Wiki from '../../wiki.md';

// Stylesheets
import './Docs.scss';

const Docs = () => (
  <ContentWrapper>
    <ContentWithFooter name='docs'>
      <div className='border-bottom p-t-1 p-b-1'>
        <div className='wrap'>
          <p>
          Welcome to the docs. We hope the docs will help you to &hearts; HiGlass even more.
          </p>
        </div>
      </div>
      <div
        className='flex-c flex-g-1 wrap p-t-1 p-b-1'>
        <div className="rel column-3-4 wiki">
          <Wiki />
        </div>
        <div className="rel column-1-4">
          <SideBar><SideBarNav /></SideBar>
        </div>
      </div>
    </ContentWithFooter>
  </ContentWrapper>
);

export default Docs;

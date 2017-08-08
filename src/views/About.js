import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

// Stylesheets
import './About.scss';

const About = () => (
  <ContentWrapper name='about'>
    <Content name='about'>
      <div className='teaser border-bottom fade-out'>
        <figure className='about-teaser'></figure>
      </div>

      <div className='wrap p-b-2'>
        <h3 id='abstract' className='iconized underlined anchored'>
          <a href='#abstract' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='text' />
          <span>Summary</span>
        </h3>

        <p className='abstract'>
          HiGlass is a tool for exploring large genomic data sets. It was created
          at the Gehlenborg Lab at Harvard Medical School as part of the 4D
          Nucleome Project&apos;s Data Coordination and Integration Center.
        </p>

        <h3 id='preprint' className='iconized underlined anchored'>
          <a href='#preprint' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='document' />
          <span>Preprint</span>
        </h3>

        <p>
          A preprint of the paper describing HiGlass is <a href='https://doi.org/10.1101/121889' target='_blank' rel='noopener noreferrer'>available on bioRxiv</a>.
        </p>

        <h3 id='source-code' className='iconized underlined anchored'>
          <a href='#source-code' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='code' />
          Source Code
        </h3>

        <p>
          All the code for HiGlass is open source and available on GitHub:
        </p>

        <ul className='no-list-style large-spacing iconized'>
          <li className='iconized'>
            <Icon iconId='github' />
            <a href='https://github.com/hms-dbmi/higlass' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass</a>
          </li>
          <li className='iconized'>
            <Icon iconId='github' />
            <a href='https://github.com/hms-dbmi/higlass-app' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-app</a>
          </li>
          <li className='iconized'>
            <Icon iconId='github' />
            <a href='https://github.com/hms-dbmi/higlass-server' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-server</a>
          </li>
          <li className='iconized'>
            <Icon iconId='github' />
            <a href='https://github.com/hms-dbmi/higlass-docker' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-docker</a>
          </li>
        </ul>

        <h3 id='authors' className='iconized underlined anchored'>
          <a href='#authors' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='people' />
          Contributors
        </h3>
        <ol className='flex-c flex-w-w no-list-style about-author-list'>
          <li>
            <a href='http://emptypipes.org/about' target='_blank' rel='noopener noreferrer'>Peter Kerpedjiev</a>
          </li>
          <li>
            <span target='_blank' rel='noopener noreferrer'>Nezar Abdennur</span>
          </li>
          <li>
            <a href='http://lekschas.de' target='_blank' rel='noopener noreferrer'>Fritz Lekschas</a>
          </li>
          <li>
            <a href='https://mccalluc.github.io' target='_blank' rel='noopener noreferrer'>Chuck McCallum</a>
          </li>
          <li>
            <a href='http://www.scott-ouellette.com' target='_blank' rel='noopener noreferrer'>Scott Ouellette</a>
          </li>
          <li>
            <span>Kasper Dinkla</span>
          </li>
          <li>
            <a href='http://hendrik.strobelt.com' target='_blank' rel='noopener noreferrer'>Hendrik Strobelt</a>
          </li>
          <li>
            <a href='http://scholar.harvard.edu/jluber/' target='_blank' rel='noopener noreferrer'>Jacob Luber</a>
          </li>
          <li>
            <span>Grace Hwang</span>
          </li>
          <li>
            <span>Alaleh Azhir</span>
          </li>
          <li>
            <a href='http://kumarcode.com' target='_blank' rel='noopener noreferrer'>Nikhil Kumar</a>
          </li>
          <li>
            <span>Burak Alver</span>
          </li>
          <li>
            <a href='http://vcg.seas.harvard.edu' target='_blank' rel='noopener noreferrer'>Hanspeter Pfister</a>
          </li>
          <li>
            <a href='http://mirnylab.mit.edu/' target='_blank' rel='noopener noreferrer'>Leonid Mirny</a>
          </li>
          <li>
            <a href='http://compbio.hms.harvard.edu' target='_blank' rel='noopener noreferrer'>Peter Park</a>
          </li>
          <li>
            <a href='http://gehlenborglab.org' target='_blank' rel='noopener noreferrer'>Nils Gehlenborg</a>
          </li>
        </ol>

        <h3 id='in-use' className='iconized underlined anchored'>
          <a href='#in-use' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='logo' />
          In Use
        </h3>

        <p>
          The HiGlass viewer is a powerful tool for visualizing 1D and 2D genomic data
          and can be used integrated into other applications as well.
          Below is a list of other great tools that make use of HiGlass:
        </p>

        <ul className='no-list-style large-spacing iconized'>
          <li className='flex-c iconized'>
            <Icon iconId='hipiler' />
            <div className='flex-c flex-v'>
              <p>
                <strong>HiPiler</strong>: Visual Exploration of Large Genome Interaction Matrices
                With Interactive Small Multiples.
              </p>
              <a href='https://github.com/flekschas/hipiler' target='_blank' rel='noopener noreferrer'>https://github.com/flekschas/hipiler</a>
            </div>
          </li>
        </ul>

        <h3 id='copyright' className='iconized underlined anchored'>
          <a href='#copyright' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          <Icon iconId='info-circle' />
          Icons
        </h3>

        <p>
          The following sets of beautiful icons have been slightly adjusted by
          Fritz Lekschas and are used across the application and the paper.
          Thanks so much for the fantastic work.
        </p>

        <ul className='no-list-style large-spacing iconized'>
          <li className='flex-c iconized'>
            <Icon iconId='code' />
            <p className='nm'><a href='https://thenounproject.com/term/code/821469/' target='_blank' rel='noopener noreferrer'>Code</a> by Bernar Novalyi</p>
          </li>
        </ul>

        <h3 id='copyright' className='iconized underlined anchored'>
          <a href='#copyright' className='hidden-anchor'>
            <Icon iconId='link' />
          </a>
          &copy;
          Copyrights and Licenses
        </h3>

        <p>
          Copyright © 2017 the President and Fellows of Harvard College.
          All content on this website is licensed under the Creative Commons
          Attribution license (CC BY).
          Copyright of the linked papers is with the publishers.
        </p>
      </div>
    </Content>
    <Footer />
  </ContentWrapper>
);

export default About;

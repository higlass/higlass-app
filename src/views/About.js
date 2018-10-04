import PropTypes from 'prop-types';
import React from 'react';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import AppInfo from '../components/AppInfo';
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import IconGallery from '../components/IconGallery';

// Utils
import Deferred from '../utils/deferred';

// Stylesheets
import './About.scss';

const showInfo = (publish) => {
  publish(
    'globalDialog',
    {
      message: <AppInfo />,
      request: new Deferred(),
      resolveOnly: true,
      resolveText: 'Close',
      icon: 'logo',
      headline: 'HiGlass',
    }
  );
};

const showIcons = (publish) => {
  publish(
    'globalDialog',
    {
      message: <IconGallery />,
      request: new Deferred(),
      resolveOnly: true,
      resolveText: 'Close',
      headline: 'All Available Icons',
    }
  );
};

class About extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];

    this.swag = [[73, 67, 79, 78, 83], [73, 78, 70, 79]];
    this.swagI = 0;
    this.swagJ = 0;
    this.swagInterval = 500;
    this.swagTime = performance.now();
  }

  componentDidMount() {
    this.pubSubs.push(
      this.props.pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs
      .forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  keyUpHandler(event) {
    this.keyUpSwagHandler(event.keyCode);
  }

  keyUpSwagHandler(keyCode) {
    const now = performance.now();

    if (now - this.swagTime > this.swagInterval) {
      this.swagJ = 0;
    }

    this.swagTime = now;

    if (this.swagJ === 0) {
      this.swag.forEach((codeWurst, index) => {
        if (keyCode === codeWurst[0]) {
          this.swagI = index;
          this.swagJ = 1;
        }
      });
    } else if (keyCode === this.swag[this.swagI][this.swagJ]) {
      this.swagJ += 1;
    }

    if (this.swagJ === this.swag[this.swagI].length) {
      switch (this.swagI) {
        case 0:
          showIcons(this.props.pubSub.publish);
          break;
        case 1:
          showInfo(this.props.pubSub.publish);
          break;
        default:
          // Nothing
      }
    }
  }

  render() {
    return (
      <ContentWrapper name='about'>
        <Content name='about'>
          <header className='border-bottom p-t-1 p-b-1'>
            <div className='wrap'>
              <p>
                HiGlass is a fast visualization tool for large datasets, particularly Hi-C and
                genomic data.
                It was created at the <a href='http://gehlenborglab.org' target='_blank' rel='noopener noreferrer'>Gehlenborg Lab</a> at <a href='https://hms.harvard.edu' target='_blank' rel='noopener noreferrer'>Harvard Medical School</a> in close collaboration with the <a href='https://vcg.seas.harvard.edu' target='_blank' rel='noopener noreferrer'>Visual Computing Group</a> at <a href='https://seas.harvard.edu' target='_blank' rel='noopener noreferrer'>Harvard John A. Paulson School of Engineering and Applied Sciences</a>, and <a href='http://mirnylab.mit.edu/' target='_blank' rel='noopener noreferrer'>Mirny Lab</a> at <a href='https://mit.edu' target='_blank' rel='noopener noreferrer'>Massachusetts Institute of Technology</a> as part of
                the <a href='http://dcic.4dnucleome.org' target='_blank' rel='noopener noreferrer'>4D Nucleome Project&apos;s Data Coordination and Integration Center</a>.
              </p>
            </div>
          </header>

          <div className='wrap p-b-2'>
            <h3 id='contact' className='iconized underlined anchored'>
              <a href='#contact' className='hidden-anchor'>
                <Icon iconId='link' />
              </a>
              <Icon iconId='mail' />
              <span>Contact</span>
            </h3>

            <ul className='no-list-style large-spacing'>
              <li>
                <strong>Questions &amp; Help: </strong>
                <a href='http://bit.ly/higlass-slack' target='_blank' rel='noopener noreferrer'>Slack</a>
                <span> or </span>
                <a href='http://bioinformatics.stackoverflow.com/questions/ask?tags=higlass&genomics&hi-c&visualization' target='_blank' rel='noopener noreferrer'>bioinformatics.stackoverflow.com</a>
              </li>
              <li>
                <strong>Bugs: </strong>
                <a href='https://github.com/hms-dbmi/higlass/issues' target='_blank' rel='noopener noreferrer'>github.com/hms-dbmi/higlass/issues</a>
              </li>
            </ul>

            <h3 id='resources' className='iconized underlined anchored'>
              <a href='#resources' className='hidden-anchor'><Icon iconId='link' /></a>
              <Icon iconId='books' />
              Resources
            </h3>

            <ul className='about-resource-list no-list-style large-spacing'>
              <li id='tutorial-2018-4dn-hic-bootcamp'>
                <strong>
                  <a
                    href='https://github.com/hms-dbmi/hic-data-analysis-bootcamp'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Tutorial from the Hi-C Data Analysis Bootcamp organized by
                    Harvard Medical School
                  </a>
                </strong>
                <time dateTime='2018-05-12'>(May 2018)</time>
                <p>
                  After this tutorial you will be familiar with the visualization of 3D genome data
                  in HiGlass and how to get HiGlass up an running.
                </p>
              </li>
              <li id='tutorial-2017-4dn-annual-meeting'>
                <strong>
                  <a
                    href='https://github.com/4dn-dcic/2017-annual-meeting-higlass-hipiler-tutorial'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Tutorial from 4D Nucleome Annual Meeting
                  </a>
                </strong>
                <time dateTime='2017-09-18'>(Sep 2017)</time>
                <p>
                  After this tutorial you know about the functionality of HiGlass and HiPiler to
                  visually explore sequencing-based 3D genome data as well as how to get started
                  using the tools on their own.
                </p>
              </li>
              <li id='tutorial-2017-ismb'>
                <strong>
                  <a
                    href='https://github.com/hms-dbmi/3d-genome-processing-tutorial'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Tutorial from ISMB/ECCB 2017
                  </a>
                </strong>
                <time dateTime='2017-06-20'>(Jun 2017)</time>
                <p>
                  After this tutorial you are able to obtain, process, analyze, and visualize 3D
                  genome data on their own as well as to understand some of the logic, motivation
                  and pitfalls associated with common operations such as matrix balancing and
                  multi-resolution visualization.
                </p>
              </li>
            </ul>


            <h3 id='citation' className='iconized underlined anchored'>
              <a href='#citation' className='hidden-anchor'><Icon iconId='link' /></a>
              <Icon iconId='document' />
              <span>Citation</span>
            </h3>

            <p>
              Kerpedjiev et al. (2018)<br/>
              <strong><a href='https://genomebiology.biomedcentral.com/articles/10.1186/s13059-018-1486-1' target='_blank' rel='noopener noreferrer'>HiGlass: Web-based visual comparison and exploration of genome interaction maps.</a></strong><br/>
              <em>Genome Biology</em>, 19:125.
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
              <li className='iconized'>
                <Icon iconId='github' />
                <a href='https://github.com/hms-dbmi/higlass-manage' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-manage</a>
              </li>
              <li className='iconized'>
                <Icon iconId='github' />
                <a href='https://github.com/hms-dbmi/higlass-register' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-register</a>
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
                <a href='http://emptypipes.org' target='_blank' rel='noopener noreferrer'>Peter Kerpedjiev</a>
              </li>
              <li>
                <span>Nezar Abdennur</span>
              </li>
              <li>
                <a href='https://lekschas.de' target='_blank' rel='noopener noreferrer'>Fritz Lekschas</a>
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
                    <strong><a href='http://hipiler.higlass.io' target='_blank' rel='noopener noreferrer'>HiPiler</a></strong>: Visual Exploration of Large Genome Interaction Matrices
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
              Fritz Lekschas and are used across the application.
              Huge thanks to the authors for their fantastic work!
            </p>

            <ul className='no-list-style large-spacing iconized'>
              <li className='flex-c iconized'>
                <Icon iconId='code' />
                <p className='nm'><a href='https://thenounproject.com/term/code/821469/' target='_blank' rel='noopener noreferrer'>Code</a> by Bernar Novalyi</p>
              </li>
              <li className='flex-c iconized'>
                <Icon iconId='mail' />
                <p className='nm'><a href='https://thenounproject.com/term/email/563007/' target='_blank' rel='noopener noreferrer'>Email</a> by Unlimicon</p>
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
              Copyright © 2018 the President and Fellows of Harvard College.
              All content on this website is licensed under the Creative Commons
              Attribution license (CC BY).
              Copyright of the linked papers is with the publishers.
            </p>
          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

About.propTypes = {
  pubSub: PropTypes.object.isRequired,
};

export default withPubSub(About);

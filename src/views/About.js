import PropTypes from 'prop-types';
import React from 'react';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import AppInfo from '../components/AppInfo';
import Content from '../components/Content';
import CoolInfo from '../components/CoolInfo';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import IconGallery from '../components/IconGallery';

// Utils
import Deferred from '../utils/deferred';

// Stylesheets
import './About.scss';

const showInfo = publish => {
  publish('globalDialog', {
    message: <AppInfo />,
    request: new Deferred(),
    resolveOnly: true,
    resolveText: 'Close',
    icon: 'logo',
    headline: 'HiGlass'
  });
};

const showCool = publish => {
  publish('globalDialog', {
    message: <CoolInfo />,
    request: new Deferred(),
    resolveOnly: true,
    resolveText: 'Wow! This is amazing!',
    headline: 'Cool, Cooler, 😎'
  });
};

const showIcons = publish => {
  publish('globalDialog', {
    message: <IconGallery />,
    request: new Deferred(),
    resolveOnly: true,
    resolveText: 'Close',
    headline: 'All Available Icons'
  });
};

class About extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];

    this.swag = [
      [73, 67, 79, 78, 83],
      [73, 78, 70, 79],
      [67, 79, 79, 76]
    ];
    this.swagI = 0;
    this.swagJ = 0;
    this.swagInterval = 500;
    this.swagTime = performance.now();

    this.state = {
      playVideo: false
    };
  }

  componentDidMount() {
    this.pubSubs.push(
      this.props.pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription =>
      this.props.pubSub.unsubscribe(subscription)
    );
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
      this.swagI = [];
      this.swag.forEach((codeWurst, index) => {
        if (keyCode === codeWurst[0]) {
          this.swagI.push(index);
          this.swagJ = 1;
        }
      });
    } else {
      for (let i = this.swagI.length; i-- > 0; ) {
        if (keyCode === this.swag[this.swagI[i]][this.swagJ]) this.swagJ += 1;
        else this.swagI.splice(i, 1);
      }
    }

    this.swagI.forEach(swagI => {
      if (this.swagJ === this.swag[swagI].length) {
        switch (swagI) {
          case 0:
            showIcons(this.props.pubSub.publish);
            break;
          case 1:
            showInfo(this.props.pubSub.publish);
            break;
          case 2:
            showCool(this.props.pubSub.publish);
            break;
          default:
          // Nothing
        }
      }
    });
  }

  render() {
    return (
      <ContentWrapper name="about">
        <Content name="about">
          <header className="border-bottom p-t-1 p-b-1">
            <div className="wrap">
              <p>
                HiGlass is a fast visualization tool for large Hi-C and other
                genomic data sets. It was created at the{' '}
                <a
                  href="https://hidivelab.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gehlenborg Lab
                </a>{' '}
                at{' '}
                <a
                  href="https://hms.harvard.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Harvard Medical School
                </a>{' '}
                in close collaboration with the{' '}
                <a
                  href="https://vcg.seas.harvard.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visual Computing Group
                </a>{' '}
                at{' '}
                <a
                  href="https://seas.harvard.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Harvard John A. Paulson School of Engineering and Applied
                  Sciences
                </a>
                , and{' '}
                <a
                  href="https://mirnylab.mit.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mirny Lab
                </a>{' '}
                at{' '}
                <a
                  href="https://mit.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Massachusetts Institute of Technology
                </a>{' '}
                as part of the{' '}
                <a
                  href="https://data.4dnucleome.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  4D Nucleome Project&apos;s Data Coordination and Integration
                  Center
                </a>
                .
              </p>
            </div>
          </header>

          <div className="wrap p-b-2">
            <h3 id="citation" className="iconized underlined anchored">
              <a href="#citation" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="document" />
              <span>Citation</span>
            </h3>

            <p>
              Kerpedjiev et al. (2018)
              <br />
              <strong>
                <a
                  href="https://genomebiology.biomedcentral.com/articles/10.1186/s13059-018-1486-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HiGlass: Web-based visual comparison and exploration of genome
                  interaction maps.
                </a>
              </strong>
              <br />
              <em>Genome Biology</em>, 19:125.
            </p>

            <h3 id="contact" className="iconized underlined anchored">
              <a href="#contact" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="mail" />
              <span>Contact</span>
            </h3>

            <ul className="no-list-style large-spacing">
              <li>
                <strong>News: </strong>
                <a
                  href="https://twitter.com/higlass_io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <strong>General: </strong>
                <a
                  href="https://join.slack.com/t/higlass/shared_invite/zt-nv5h5hsi-tjM9ydx0EH3Svn4jx~tveQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Slack
                </a>
              </li>
              <li>
                <strong>Bugs: </strong>
                <a
                  href="https://github.com/higlass/higlass/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/higlass/higlass/issues
                </a>
              </li>
              <li>
                <strong>Implementation Help: </strong>
                <a
                  href="https://stackoverflow.com/questions/ask?tags=higlass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  stackoverflow.com
                </a>
                <span> or </span>
                <a
                  href="https://bioinformatics.stackexchange.com/questions/ask?tags=higlass&tags=genomics&tags=visualization"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bioinformatics.stackexchange.com
                </a>
              </li>
            </ul>

            <h3 id="source-code" className="iconized underlined anchored">
              <a href="#source-code" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="code" />
              Source Code
            </h3>

            <p>
              All the code for HiGlass is open source and available on{' '}
              <a
                href="https://github.com/higlass"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              . The core packages are:
            </p>

            <ul className="no-list-style large-spacing iconized">
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Viewer:</span>
                <a
                  href="https://github.com/higlass/higlass"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass
                </a>
              </li>
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Frontend application:</span>
                <a
                  href="https://github.com/higlass/higlass-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass-app
                </a>
              </li>
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Backend server:</span>
                <a
                  href="https://github.com/higlass/higlass-server"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass-server
                </a>
              </li>
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Docker container:</span>
                <a
                  href="https://github.com/higlass/higlass-docker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass-docker
                </a>
              </li>
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Docker management:</span>
                <a
                  href="https://github.com/higlass/higlass-manage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass-manage
                </a>
              </li>
              <li className="iconized">
                <Icon iconId="github" />
                <span className="m-r-0-5">Plugin track registration:</span>
                <a
                  href="https://github.com/higlass/higlass-register"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/higlass/higlass-register
                </a>
              </li>
            </ul>

            <h3 id="core-contributors" className="iconized underlined anchored">
              <a href="#core-contributors" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="people" />
              Core Contributors
            </h3>
            <ol className="flex-c flex-w-w no-list-style about-author-list">
              <li>
                <a
                  href="http://emptypipes.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peter Kerpedjiev
                </a>
              </li>
              <li>
                <a
                  href="https://lekschas.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fritz Lekschas
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/nv1ctus"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nezar Abdennur
                </a>
              </li>
              <li>
                <a
                  href="https://mccalluc.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chuck McCallum
                </a>
              </li>
            </ol>
            <ol className="flex-c flex-w-w no-list-style about-author-list">
              <li className="no-comma">(All contributors:</li>
              <li>
                <a
                  href="https://github.com/higlass/higlass/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  viewer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/higlass/higlass-app/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/higlass/higlass-docker/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  docker
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/higlass/higlass-manage/graphs/contributors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  manage
                </a>
                )
              </li>
            </ol>

            <h3 id="advisors" className="iconized underlined anchored">
              <a href="#advisors" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="people" />
              Advisors
            </h3>
            <ol className="flex-c flex-w-w no-list-style about-author-list">
              <li>
                <a
                  href="https://hidivelab.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nils Gehlenborg
                </a>
              </li>
              <li>
                <a
                  href="https://compbio.hms.harvard.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peter Park
                </a>
              </li>
              <li>
                <a
                  href="https://mirnylab.mit.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leonid Mirny
                </a>
              </li>
              <li>
                <a
                  href="https://vcg.seas.harvard.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hanspeter Pfister
                </a>
              </li>
            </ol>

            <h3 id="introduction" className="iconized underlined anchored">
              <a href="#introduction" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="video" />
              Introduction
            </h3>
            <div className="video">
              <div
                className="placeholder-btn flex-c flex-jc-c flex-a-c"
                onClick={() => {
                  this.setState({ playVideo: true });
                }}
              >
                {this.state.playVideo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/v62k4Ok1S8g?autoplay=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <svg className="icon" viewBox="0 0 16 16">
                    <path
                      d="M15.84 4.756s-.156-1.102-.636-1.588c-.608-.638-1.29-.64-1.604-.678-2.24-.162-5.6-.166-5.6-.166s-4.16.036-5.44.16c-.356.067-1.156.047-1.764.684C.316 3.655.16 4.755.16 4.755S0 6.05 0 7.345v1.26c0 1.295.16 2.59.16 2.59s.156 1.1.636 1.587c.608.637 1.408.616 1.764.684 1.28.123 5.44.16 5.44.16s3.36-.004 5.6-.166c.314-.038.996-.04 1.604-.678.48-.486.636-1.59.636-1.59S16 9.9 16 8.605V7.346c0-1.296-.16-2.59-.16-2.59z"
                      className="secondary"
                    />
                    <path
                      d="M6.517 4.8l4.176 2.588c.94.58.924.58-.013 1.156L6.527 11.13c-.9.585-.898.398-.898-.352V5.155c-.002-.688-.002-.937.887-.355z"
                      className="primary"
                    />
                  </svg>
                )}
              </div>
            </div>

            <h3 id="resources" className="iconized underlined anchored">
              <a href="#resources" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="books" />
              Resources
            </h3>

            <ul className="about-resource-list no-list-style large-spacing">
              <li id="demos-2019-scipy-conference">
                <strong>
                  <a
                    href="https://github.com/higlass/scipy19"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demos from our talk at the SciPy Conference
                  </a>
                </strong>
                <time dateTime="2019-07-10">(Jul 2019)</time>
                <p>
                  The Jupyter notebooks demonstrate how to build HiGlass views
                  with our Python package{' '}
                  <a
                    href="https://github.com/higlass/higlass-python"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    higlass-python
                  </a>
                  .
                </p>
              </li>
              <li id="tutorial-2018-4dn-hic-bootcamp">
                <strong>
                  <a
                    href="https://github.com/hms-dbmi/hic-data-analysis-bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutorial from the Hi-C Data Analysis Bootcamp organized by
                    Harvard Medical School
                  </a>
                </strong>
                <time dateTime="2018-05-12">(May 2018)</time>
                <p>
                  After this tutorial you will be familiar with the
                  visualization of 3D genome data in HiGlass and how to get
                  HiGlass up an running.
                </p>
              </li>
              <li id="tutorial-2017-4dn-annual-meeting">
                <strong>
                  <a
                    href="https://github.com/4dn-dcic/2017-annual-meeting-higlass-hipiler-tutorial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutorial from 4D Nucleome Annual Meeting
                  </a>
                </strong>
                <time dateTime="2017-09-18">(Sep 2017)</time>
                <p>
                  After this tutorial you know about the functionality of
                  HiGlass and HiPiler to visually explore sequencing-based 3D
                  genome data as well as how to get started using the tools on
                  their own.
                </p>
              </li>
              <li id="tutorial-2017-ismb">
                <strong>
                  <a
                    href="https://github.com/hms-dbmi/3d-genome-processing-tutorial"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tutorial from ISMB/ECCB 2017
                  </a>
                </strong>
                <time dateTime="2017-06-20">(Jun 2017)</time>
                <p>
                  After this tutorial you are able to obtain, process, analyze,
                  and visualize 3D genome data on their own as well as to
                  understand some of the logic, motivation and pitfalls
                  associated with common operations such as matrix balancing and
                  multi-resolution visualization.
                </p>
              </li>
            </ul>

            <h3 id="in-use" className="iconized underlined anchored">
              <a href="#in-use" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="logo" />
              In Use
            </h3>

            <p>
              The HiGlass viewer is a powerful tool for visualizing 1D and 2D
              genomic data and can be used integrated into other applications as
              well. Below is a list of other great tools that make use of
              HiGlass:
            </p>

            <ul className="no-list-style large-spacing iconized">
              <li className="flex-c iconized">
                <Icon iconId="hipiler" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://hipiler.higlass.io"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        HiPiler
                      </a>
                    </strong>
                    : Visual Exploration of Large Genome Interaction Matrices
                    With Interactive Small Multiples.
                  </p>
                  <a
                    href="https://github.com/flekschas/hipiler"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/flekschas/hipiler
                  </a>
                </div>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="peax" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://peax.lekschas.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Peax
                      </a>
                    </strong>
                    : Interactive Concept Learning and Exploration of Epigenomic
                    Patterns
                  </p>
                  <a
                    href="https://github.com/novartis/peax"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/novartis/peax
                  </a>
                </div>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="dot" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://epilogos.altius.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Altius Epilogos
                      </a>
                    </strong>
                    : Information-theoretic navigation of multi-tissue
                    functional genomic annotations
                  </p>
                  <a
                    href="https://github.com/meuleman/epilogos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/meuleman/epilogos
                  </a>
                </div>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="dot" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://index.altius.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Altius Index
                      </a>
                    </strong>
                    : Biological spectrum of human DNase I hypersensitive sites
                  </p>
                  <a
                    href="https://github.com/Altius/Index"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/Altius/Index
                  </a>
                </div>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="dot" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://flekschas.github.io/enhancer-gene-vis/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ABC Enhancer-Gene Connections
                      </a>
                    </strong>
                    : Genome-wide enhancer map linking risk variants to disease
                    genes
                  </p>
                  <a
                    href="https://github.com/flekschas/enhancer-gene-vis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/flekschas/enhancer-gene-vis
                  </a>
                </div>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="dot" />
                <div className="flex-c flex-v">
                  <p>
                    <strong>
                      <a
                        href="https://github.com/visdesignlab/cTracks"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        cTracks
                      </a>
                    </strong>
                    : Dynamic track visualization of various Next Generation
                    Sequencing measurements
                  </p>
                  <a
                    href="https://github.com/visdesignlab/cTracks"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/visdesignlab/cTracks
                  </a>
                </div>
              </li>
            </ul>

            <h3 id="design" className="iconized underlined anchored">
              <a href="#design" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="pen-ruler" />
              Design
            </h3>

            <p>
              The website and logo (<Icon iconId="logo" isInline={true} />) are
              designed by{' '}
              <a
                href="https://lekschas.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fritz Lekschas
              </a>
              .
            </p>

            <h3 id="copyright" className="iconized underlined anchored">
              <a href="#copyright" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="info-circle" />
              Icons
            </h3>

            <p>
              The following sets of beautiful icons have been slightly adjusted
              by{' '}
              <a
                href="https://lekschas.de"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fritz Lekschas
              </a>{' '}
              and are used across the application. Huge thanks to the authors
              for their fantastic work!
            </p>

            <ul className="no-list-style large-spacing iconized">
              <li className="flex-c iconized">
                <Icon iconId="code" />
                <p className="nm">
                  <a
                    href="https://thenounproject.com/term/code/821469/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>{' '}
                  by Bernar Novalyi
                </p>
              </li>
              <li className="flex-c iconized">
                <Icon iconId="mail" />
                <p className="nm">
                  <a
                    href="https://thenounproject.com/term/email/563007/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Email
                  </a>{' '}
                  by Unlimicon
                </p>
              </li>
            </ul>

            <h3 id="copyright" className="iconized underlined anchored">
              <a href="#copyright" className="hidden-anchor">
                <Icon iconId="link" />
              </a>
              <Icon iconId="copyright" />
              <span>Copyrights</span>
              <span className="hide-on-phone">&nbsp;and Licenses</span>
            </h3>

            <p>
              Copyright © 2018 the President and Fellows of Harvard College. All
              content on this website is licensed under the Creative Commons
              Attribution license (CC BY). Copyright of the linked papers is
              with the publishers.
            </p>
          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

About.propTypes = {
  pubSub: PropTypes.object.isRequired
};

export default withPubSub(About);

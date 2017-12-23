import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import IconGallery from '../components/IconGallery';

// Services
import pubSub from '../services/pub-sub';

// Utils
import Deferred from '../utils/deferred';

// Stylesheets
import './About.scss';

const showIcons = () => {
  pubSub.publish(
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

class Help extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];

    this.swag = [[73, 67, 79, 78, 83]];
    this.swagI = 0;
    this.swagJ = 0;
    this.swagInterval = 500;
    this.swagTime = performance.now();
  }

  componentDidMount() {
    this.pubSubs.push(
      pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
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
          showIcons();
          break;
        default:
          // Nothing
      }
    }
  }

  render() {
    return (
      <ContentWrapper name='help'>
        <Content name='help'>
          <div className='border-bottom p-t-1 p-b-1'>
            <div className='wrap'>
              <p>
              You need help getting started with HiGlass or ran into a tricky issue?
              Fear not! Below is a list of excellent resources that can hopefully help
              you out!
              </p>
            </div>
          </div>

          <div className='wrap p-b-2'>
            <h3 id='getting-started' className='iconized underlined anchored'>
              <a href='#getting-started' className='hidden-anchor'>
                <Icon iconId='link' />
              </a>
              <Icon iconId='launch' />
              <span>Getting Started</span>
            </h3>

            <p>
              If you want to get familiar with HiGlass and public Hi-C data we recommend you check
              out <a href='#tutorial-2017-4dn-annual-meeting'>4D Nucleome Annual Meeting Tutorial</a>.
              If you want to know more about data processing and analysis have a look at our
              tutorial from <a href='#tutorial-2017-4dn-annual-meeting'>ISMB / ECCB 2017</a>.
              For more any other issues please make use of the <a href='#resources'>resources</a> below.
            </p>

            <h3 id='tutorials' className='iconized underlined anchored'>
              <a href='#tutorials' className='hidden-anchor'><Icon iconId='link' /></a>
              <Icon iconId='tutorial' />
              Tutorials
            </h3>

            <ul className='no-list-style large-spacing'>
              <li id='tutorial-2017-4dn-annual-meeting'>
                <a href='https://github.com/4dn-dcic/2017-annual-meeting-higlass-hipiler-tutorial' target='_blank' rel='noopener noreferrer'>Tutorial from 4D Nucleome Annual Meeting</a> (Sep 2017)
                <p>
                  After this tutorial you know about the functionality of HiGlass and HiPiler to
                  visually explore sequencing-based 3D genome data as well as how to get started
                  using the tools on their own.
                </p>
              </li>
              <li id='tutorial-2017-'>
                <a href='https://github.com/hms-dbmi/3d-genome-processing-tutorial' target='_blank' rel='noopener noreferrer'>Tutorial from ISMB/ECCB 2017</a> (Jun 2017)
                <p>
                  After this tutorial you are able to obtain, process, analyze, and visualize 3D
                  genome data on their own as well as to understand some of the logic, motivation
                  and pitfalls associated with common operations such as matrix balancing and
                  multi-resolution visualization.
                </p>
              </li>
            </ul>

            <h3 id='resources' className='iconized underlined anchored'>
              <a href='#resources' className='hidden-anchor'>
                <Icon iconId='link' />
              </a>
              <Icon iconId='books' />
              <span>Resources</span>
            </h3>

            <p>
              Check out the list below for resources on HiGlass:
            </p>

            <ul className='no-list-style large-spacing'>
              <li>
                <strong>Docs: </strong>
                <a href='http://higlass.io/docs' target='_blank' rel='noopener noreferrer'>higlass.io/docs</a>
                <p>
                  For developer questions regarding APIs etc. please refer to our extensive
                  documention.
                </p>
              </li>
              <li>
                <strong>Bugs: </strong>
                <a href='https://github.com/hms-dbmi/higlass/issues' target='_blank' rel='noopener noreferrer'>github.com/hms-dbmi/higlass/issues</a>
                <p>Something is not working or broken? Please send us a bug report. Thanks!</p>
              </li>
              <li>
                <strong>Questions / Help with Implementation: </strong>
                <a href='http://stackoverflow.com/questions/ask?tags=higlass' target='_blank' rel='noopener noreferrer'>stackoverflow.com</a>
                <span> &amp; </span>
                <a href='http://bioinformatics.stackoverflow.com/questions/ask?tags=higlass&genomics&hi-c&visualization' target='_blank' rel='noopener noreferrer'>bioinformatics.stackoverflow.com</a>
                <p>
                  Utilize the community and ask question on how to get started on Stackoverflow and
                  the likes.
                </p>
              </li>
            </ul>

            <h3 id='source-code' className='iconized underlined anchored'>
              <a href='#source-code' className='hidden-anchor'>
                <Icon iconId='link' />
              </a>
              <Icon iconId='code' />
              Source Code
            </h3>

            <p>
              All components of HiGlass are open source and available on GitHub:
            </p>

            <ul className='no-list-style large-spacing'>
              <li>
                <strong>Viewer: </strong>
                <a href='https://github.com/hms-dbmi/higlass' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass</a>
              </li>
              <li>
                <strong>Web App: </strong>
                <a href='https://github.com/hms-dbmi/higlass-app' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-app</a>
              </li>
              <li>
                <strong>Server: </strong>
                <a href='https://github.com/hms-dbmi/higlass-server' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-server</a>
              </li>
              <li>
                <strong>Docker: </strong>
                <a href='https://github.com/hms-dbmi/higlass-docker' target='_blank' rel='noopener noreferrer'>https://github.com/hms-dbmi/higlass-docker</a>
              </li>
            </ul>

          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

export default Help;

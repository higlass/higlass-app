import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// HOC
import withPubSub from '../hocs/with-pub-sub';

import Content from '../components/Content';
import ButtonLikeFileSelect from '../components/ButtonLikeFileSelect';
import DropArea from '../components/DropArea';
import HiGlassViewer from '../components/HiGlassViewer';
import Icon from '../components/Icon';
import NewsList from '../components/NewsList';
import SpinnerCenter from '../components/SpinnerCenter';

// Utils
import { debounce, loadViewConfig, Logger } from '../utils';

const URL = '//content.higlass.io/news';

const logger = Logger('Home');

const selectHandler = event => {
  loadViewConfig(event.target.files[0])
    .then(() => {
      logger.debug('JSON loaded');
    })
    .catch(error => {
      logger.error(error);
    });
};

class HomeDemos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExample0Init: false,
      isExample1Init: false,
      isExample2Init: false,
      isExample3Init: false,
      isLoadingNews: true,
      news: []
    };

    this.scrollTop = 0;

    fetch(URL)
      .then(response => response.json())
      .then(news => {
        this.setState({
          error: '',
          isLoadingNews: false,
          news
        });
      })
      .catch(error => {
        logger.error('Could not retrieve or parse news.', error);
        this.setState({
          error: 'Could not load news.',
          isLoadingNews: false
        });
      });

    this.exampleRefs = [];
    this.pubSubs = [];

    this.scrollHandlerDb = debounce(this.scrollHandler.bind(this), 50);
  }

  componentDidMount() {
    this.scrollTop = window.scrollY;
    this.initHiglassDemo();
    this.pubSubs.push(
      this.props.pubSub.subscribe('scroll', this.scrollHandlerDb)
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription =>
      this.props.pubSub.unsubscribe(subscription)
    );
    this.pubSubs = [];
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  initHiglassDemo() {
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const visibleTop = this.scrollTop + windowHeight;

    const offsetTop0 = this.exampleRefs[0] ? this.exampleRefs[0].offsetTop : 0;
    const offsetTop1 = this.exampleRefs[1] ? this.exampleRefs[1].offsetTop : 0;
    const offsetTop2 = this.exampleRefs[2] ? this.exampleRefs[2].offsetTop : 0;
    const offsetTop3 = this.exampleRefs[3] ? this.exampleRefs[3].offsetTop : 0;

    this.setState({
      isExample0Init: this.state.isExample0Init || visibleTop >= offsetTop0,
      isExample1Init: this.state.isExample1Init || visibleTop >= offsetTop1,
      isExample2Init: this.state.isExample2Init || visibleTop >= offsetTop2,
      isExample3Init: this.state.isExample3Init || visibleTop >= offsetTop3
    });
  }

  onRefExample(number) {
    return ref => {
      this.exampleRefs[number] = ref;
    };
  }

  scrollHandler() {
    this.scrollTop = window.scrollY;

    if (!this.isRequestingAnimationFrame) {
      window.requestAnimationFrame(() => {
        this.initHiglassDemo();
        this.isRequestingAnimationFrame = false;
      });
      this.isRequestingAnimationFrame = true;
    }
  }

  /* -------------------------------- Render -------------------------------- */

  render() {
    return (
      <Content name="home">
        <section className="border-bottom p-t-1-5 p-b-1-5">
          <div className="wrap flex-c flex-a-s">
            <p className="column-1-2 m-r-1 home-info-intro">
              HiGlass is a tool for exploring and compare genomic contact
              matrices and tracks. Take a look at some{' '}
              <Link to="/examples">examples</Link> or head over to the{' '}
              <a href="https://docs.higlass.io">docs</a> to learn how HiGlass
              can be used and configured. To load private data, HiGlass can be{' '}
              <a href="https://docs.higlass.io/higlass_docker.html">
                run locally within a docker container
              </a>
              .
            </p>
            <div className="column-1-2 m-l-1 home-info-news scrollbar">
              {this.state.isLoadingNews && <SpinnerCenter light={true} />}
              <div
                className={`full-dim ${
                  this.state.isLoadingNews ? 'is-hidden' : ''
                }`}
              >
                <NewsList news={this.state.news} />
              </div>
            </div>
          </div>
          <div className="flex-c flex-jc-c home-info-buttons">
            <DropArea>
              <div className="flex-g-1">Drag &amp; drop a config</div>
              <Icon iconId="drag" />
            </DropArea>
            <ButtonLikeFileSelect select={selectHandler}>
              Select a config
            </ButtonLikeFileSelect>
          </div>
        </section>
        <section className="wrap">
          <h3 className="hga-h3">Single View</h3>
          <div ref={this.onRefExample(0)} className="example-1">
            <HiGlassViewer
              isDeferred={true}
              isDeferredInit={this.state.isExample0Init}
              isStatic={true}
              viewConfigId="default"
              server="//higlass.io"
            />
          </div>

          <h3 className="hga-h3">Two Linked Views</h3>
          <p>
            HiGlass can also be configured to show two or more views. These
            views can be synchronized to always show the same location. For more
            information, please see the documentation about{' '}
            <a href="https://github.com/hms-dbmi/higlass/wiki/Common-Tasks#replacing-tracks">
              replacing tracks
            </a>
            ,{' '}
            <a href="https://github.com/hms-dbmi/higlass/wiki/View-Operations#adding-new-views">
              adding new views
            </a>
            , and{' '}
            <a href="https://github.com/hms-dbmi/higlass/wiki/View-Operations#view-synchronization">
              synchronizing the locations of different views
            </a>
            .
          </p>
          <div ref={this.onRefExample(1)} className="example-2">
            <HiGlassViewer
              isDeferred={true}
              isDeferredInit={this.state.isExample1Init}
              isStatic={true}
              viewConfigId="twoviews"
              server="//higlass.io"
            />
          </div>

          <h3 className="hga-h3">Genome Browser-Like View</h3>
          <p>
            If the 2D view is omitted, HiGlass functions much like a regular
            genome browser. See the documentation for more information about the{' '}
            <a href="https://github.com/hms-dbmi/higlass/wiki/Track-types">
              different available track types
            </a>{' '}
            and how to{' '}
            <a href="https://github.com/hms-dbmi/higlass/wiki/Common-Tasks#adding-a-new-tracks">
              add them
            </a>
            . Blue gene annotations are on the + strand while red annotations
            are on the - strand. This view shows a gene annotations track as
            well as four ENOCDE data tracks containing ChIP seq profiles
            (H3K27ac, H3K4me1, H3K4me and H3K27me3).
          </p>
          <div ref={this.onRefExample(2)} className="example-3">
            <HiGlassViewer
              autoExpand={true}
              isDeferred={true}
              isDeferredInit={this.state.isExample2Init}
              isStatic={true}
              viewConfigId="browserlike"
              server="//higlass.io"
            />
          </div>

          <h3 className="hga-h3">Genome Browser-Like View with Details</h3>
          <p>
            All of the inter-view operations, such as linking and viewport
            projection are also available in the simplified genome browser-like
            view. The example below shows a zoomed-out overview on top as well
            as two detail views below. The positions of the detail views are
            shown on the overview using
            <a href="https://github.com/hms-dbmi/higlass/wiki/Viewport-projection">
              viewport projections
            </a>
            . Blue gene annotations are on the + strand while red annotations
            are on the - strand. The data is from Busslinger et al (2017){' '}
            <a href="#references">[3]</a>
            and shows the accumulation of cohesin at sites of convergent
            transcription in CTCF / Wapl double knock-out mouse embryonic
            fibroblasts.
          </p>
          <div ref={this.onRefExample(3)} className="example-4">
            <HiGlassViewer
              autoExpand={true}
              isDeferred={true}
              isDeferredInit={this.state.isExample3Init}
              isStatic={true}
              viewConfigId="browserwithdetails"
              server="//higlass.io"
            />
          </div>

          <footer className="foot-notes p-t-2" name="references">
            <ol className="no-list-style smaller">
              <li>
                <span
                  className="reference-number"
                  name="references-kerpedjiev2018higlass"
                >
                  [1]
                </span>
                <span className="reference-author">Kerpedjiev et al.</span>
                <span className="reference-title">
                  HiGlass: Web-based visual comparison and exploration of genome
                  interaction maps.
                </span>
                <span className="reference-journal">
                  <em>Genome Biology</em>, 19:125 (2018).
                </span>
              </li>
              <li>
                <span className="reference-number" name="references-rao20143d">
                  [2]
                </span>
                <span className="reference-author">Rao et al.</span>
                <span className="reference-title">
                  A 3D map of the human genome at kilobase resolution reveals
                  principles of chromatin looping.
                </span>
                <span className="reference-journal">
                  <em>Cell</em> 159.7 (2014): 1665-1680.
                </span>
              </li>
              <li>
                <span
                  className="reference-number"
                  name="references-busslinger2017higlass"
                >
                  [3]
                </span>
                <span className="reference-author">Busslinger et al.</span>
                <span className="reference-title">
                  Cohesin is positioned in mammalian genomes by transcription,
                  CTCF and Wapl.
                </span>
                <span className="reference-journal">
                  <em>Nature</em> 544.7651 (2017): 503-507.
                </span>
              </li>
            </ol>
          </footer>
        </section>
      </Content>
    );
  }
}

HomeDemos.propTypes = {
  pubSub: PropTypes.object.isRequired
};

export default withPubSub(HomeDemos);

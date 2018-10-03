import React from 'react';
import { Link } from 'react-router-dom';

import Content from '../components/Content';
import ButtonLikeFileSelect from '../components/ButtonLikeFileSelect';
import DropArea from '../components/DropArea';
import HiGlassViewer from '../components/HiGlassViewer';
import Icon from '../components/Icon';
import NewsList from '../components/NewsList';
import SpinnerCenter from '../components/SpinnerCenter';

// Utils
import loadViewConfig from '../utils/load-view-config';
import Logger from '../utils/logger';

const URL = 'https://cdn.rawgit.com/hms-dbmi/higlass-app/5d943b11/content/news.json';

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

class HomeDemos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingNews: true,
      news: [],
    };

    fetch(URL)
      .then(response => response.json())
      .then((news) => {
        this.setState({
          error: '',
          isLoadingNews: false,
          news,
        });
      })
      .catch((error) => {
        logger.error('Could not retrieve or parse news.', error);
        this.setState({
          error: 'Could not load news.',
          isLoadingNews: false,
        });
      });
  }

  render() {
    return (
      <Content name='home'>
        <section className='border-bottom p-t-1-5 p-b-1-5'>
          <div className='wrap flex-c flex-a-s'>
            <p className='column-1-2 m-r-1 home-info-intro'>
            HiGlass is a tool for exploring and compare genomic contact matrices and tracks.
            Take a look at some <Link to='/examples'>examples</Link> or head over to the <Link to='/docs'>docs</Link> to learn how HiGlass can be used and configured. To load private data, HiGlass can be <Link to='/docs#home-running-locally'>run locally within a docker container</Link>.
            </p>
            <div className='column-1-2 m-l-1 home-info-news'>
              {this.state.isLoadingNews && <SpinnerCenter light={true} />}
              <div className={`full-dim ${this.state.isLoadingNews ? 'is-hidden' : ''}`}>
                <NewsList news={this.state.news} />
              </div>
            </div>
          </div>
          <div className='flex-c flex-jc-c home-info-buttons'>
            <DropArea>
              <div className='flex-g-1'>Drag &amp; drop a config</div>
              <Icon iconId='drag' />
            </DropArea>
            <ButtonLikeFileSelect select={selectHandler}>
              Select a config
            </ButtonLikeFileSelect>
          </div>
        </section>
        <section className='wrap'>
          <h3>Single View</h3>
          <div className="example-1">
            <HiGlassViewer isStatic={true} viewConfigId='default' />
          </div>

          <h3>Two Linked Views</h3>
          <p>
            HiGlass can also be configured to show two or more views. These views can
            be synchronized to always show the same location. For more information,
            please see the documentation about <a href="https://github.com/hms-dbmi/higlass/wiki/Common-Tasks#replacing-tracks">replacing tracks</a>, <a href="https://github.com/hms-dbmi/higlass/wiki/View-Operations#adding-new-views">adding new views</a>, and <a href="https://github.com/hms-dbmi/higlass/wiki/View-Operations#view-synchronization">synchronizing the locations of different views</a>.
          </p>
          <div className="example-2">
            <HiGlassViewer isStatic={true} viewConfigId='twoviews' />
          </div>

          <h3>Genome Browser-Like View</h3>
          <p>
            If the 2D view is omitted, HiGlass functions much like a regular
            genome browser. See the documentation for more information about
            the <a href="https://github.com/hms-dbmi/higlass/wiki/Track-types">different available track types</a> and how to <a href="https://github.com/hms-dbmi/higlass/wiki/Common-Tasks#adding-a-new-tracks">
            add them</a>. Blue gene annotations are on the + strand while red
            annotations are on the - strand. This view shows a gene annotations track
            as well as four ENOCDE data tracks containing ChIP seq profiles (H3K27ac,
            H3K4me1, H3K4me and H3K27me3).
          </p>
          <div className="example-3">
            <HiGlassViewer
              autoExpand={true}
              isStatic={true}
              viewConfigId='browserlike' />
          </div>

          <h3>Genome Browser-Like View with Details</h3>
          <p>
            All of the inter-view operations, such as linking and viewport projection
            are also available in the simplified genome browser-like view. The example
            below shows a zoomed-out overview on top as well as two detail views below.
            The positions of the detail views are shown on the overview using
            <a href="https://github.com/hms-dbmi/higlass/wiki/Viewport-projection">viewport projections</a>.
            Blue gene annotations are on the + strand while red annotations are on the
            - strand. The data is from Busslinger et al (2017) <a href="#references">[3]</a>
            and shows the accumulation of cohesin at sites of convergent
            transcription in CTCF / Wapl double knock-out mouse embryonic fibroblasts.
          </p>
          <div className="example-4">
            <HiGlassViewer
              autoExpand={true}
              isStatic={true}
              viewConfigId='browserwithdetails' />
          </div>

          <footer className='foot-notes p-t-2' name='references'>
            <ol className='no-list-style smaller'>
              <li>
                <span
                  className='reference-number'
                  name='references-peter2017higlass'
                >
                  [1]
                </span>
                <span className='reference-author'>
                  Kerpedjiev et al.
                </span>
                <span className='reference-title'>
                  HiGlass: Web-based visual comparison and exploration of genome interaction maps.
                </span>
                <span className='reference-journal'>
                  <em>bioRxiv</em> (2017): 121889.
                </span>
              </li>
              <li>
                <span
                  className='reference-number'
                  name='references-rao20143d'
                >
                  [2]
                </span>
                <span className='reference-author'>
                  Rao et al.
                </span>
                <span className='reference-title'>
                  A 3D map of the human genome at kilobase resolution reveals principles
                  of chromatin looping.
                </span>
                <span className='reference-journal'>
                  <em>Cell</em> 159.7 (2014): 1665-1680.
                </span>
              </li>
              <li>
                <span
                  className='reference-number'
                  name='references-busslinger2017higlass'
                >
                  [3]
                </span>
                <span className='reference-author'>
                  Busslinger et al.
                </span>
                <span className='reference-title'>
                  Cohesin is positioned in mammalian genomes by transcription, CTCF and Wapl.
                </span>
                <span className='reference-journal'>
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

export default HomeDemos;

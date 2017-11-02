import React from 'react';

import HiGlassViewer from '../components/HiGlassViewer';

const HomeDemos = () => (
  <section>
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

    <footer className='foot-notes' name='references'>
      <ol>
        <li>
          <span
            className='reference-number'
            name='references-peter2017higlass'
          >
            [1]
          </span>
          <span className='reference-author'>
            Kerpedjiev, Peter, <em>et al.</em>
          </span>
          <span className='reference-title'>
            HiGlass: Web-based visual comparison and exploration of genome interaction maps.
          </span>
          <span className='reference-journal'>
            bioRxiv (2017): 121889.
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
            Rao, Suhas SP, <em>et al.</em>
          </span>
          <span className='reference-title'>
            A 3D map of the human genome at kilobase resolution reveals principles
            of chromatin looping.
          </span>
          <span className='reference-journal'>
            Cell 159.7 (2014): 1665-1680.
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
            Busslinger, Georg A, <em>et al.</em>
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
);

export default HomeDemos;

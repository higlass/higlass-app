import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import Icon from '../components/Icon';
import RangeSelectionViewer from '../components/RangeSelectionViewer';
import TabEntry from '../components/TabEntry';

// Utils
import { flatten } from '../utils';

// Actions
import {
  setViewerRightBarInfoLensLocation,
  setViewerRightBarInfoLensValue,
} from '../actions';

// Styles
import './Viewer.scss';


class ViewerRightBarInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseLensData: [],
      mouseLensDataToRgb: null,
      mouseLensDim: 0,
      mouseLensCenter: [],
      mouseLensRange: [],
    };

    this.pubSubs = [];
  }

  componentDidMount() {
    this.pubSubs.push(
      this.props.pubSub.subscribe(
        'viewer.mouseMoveZoom', this.mouseMoveZoomHandler.bind(this)
      )
    );
  }

  componentDidUpdate() {
    if (this.state.mouseLensData) this.renderLens();
  }

  componentWillUnmount() {
    this.pubSubs
      .forEach(subscription => this.props.pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  mouseMoveZoomHandler(event) {
    this.setState({
      mouseLensData: event.data,
      mouseLensToRgb: event.toRgb,
      mouseLensDim: event.dim,
      mouseLensCenter: event.center,
      mouseLensRange: [
        event.xRange.reduce(...flatten),
        event.yRange.reduce(...flatten),
      ],
      mouseLensRel: event.rel,
    });
  }

  renderLens() {
    const ctx = this.mouseLensCanvas.getContext('2d');

    this.mouseLensCanvas.width = this.state.mouseLensDim;
    this.mouseLensCanvas.height = this.state.mouseLensDim;

    const len = this.state.mouseLensData.length;
    const px = new Uint8ClampedArray(len * 4);

    let rgb;
    let idx;

    for (let i = 0; i < len; i++) {
      rgb = this.state.mouseLensToRgb(this.state.mouseLensData[i]);
      idx = i * 4;

      px[idx] = rgb[0];
      px[idx + 1] = rgb[1];
      px[idx + 2] = rgb[2];
      px[idx + 3] = rgb[3];
    }

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, this.state.mouseLensDim, this.state.mouseLensDim);

    const pix = new ImageData(px, this.state.mouseLensDim, this.state.mouseLensDim);

    ctx.putImageData(pix, 0, 0);
  }

  render() {
    return (
      <div className="right-bar-info flex-c flex-v full-wh">
        <div className="lens-container">
          <canvas
            className="full-wh lens"
            ref={(c) => { this.mouseLensCanvas = c; }}
          />
          {this.state.mouseLensDim && (
            <div
              className="hair-cross"
              style={{
                width: `${100 / this.state.mouseLensDim}%`,
                height: `${100 / this.state.mouseLensDim}%`,
                top: `${(this.state.mouseLensDim - 1) / (2 * this.state.mouseLensDim) * 100}%`,
                left: `${(this.state.mouseLensDim - 1) / (2 * this.state.mouseLensDim) * 100}%`,
              }}
            />
          )}
        </div>
        <TabEntry
          isOpen={this.props.viewerRightBarInfoLensValue}
          title='Value'
          toggle={this.props.toggleViewerRightBarInfoLensValue}
        >
          <div className='flex-c viewer-right-bar-padding'>
            <Icon iconId='center' />
            {this.state.mouseLensData.length
              ? (<strong className='flex-c flex-g-1'>{this.state.mouseLensData[(this.state.mouseLensData.length - 1) / 2]}</strong>)
              : (<em>Unknown</em>)
            }
          </div>
          <div className='flex-c'>
          </div>
        </TabEntry>
        <TabEntry
          isOpen={this.props.viewerRightBarInfoLensLocation}
          title='Location'
          toggle={this.props.toggleViewerRightBarInfoLensLocation}
        >
          <RangeSelectionViewer
            center={this.state.mouseLensCenter}
            rangeSelection={this.state.mouseLensRange}
          />
        </TabEntry>
      </div>
    );
  }
}

ViewerRightBarInfo.propTypes = {
  pubSub: PropTypes.object.isRequired,
  toggleViewerRightBarInfoLensLocation: PropTypes.func,
  toggleViewerRightBarInfoLensValue: PropTypes.func,
  viewerRightBarInfoLensLocation: PropTypes.bool,
  viewerRightBarInfoLensValue: PropTypes.bool,
};

const mapStateToProps = state => ({
  viewerRightBarInfoLensLocation:
    state.present.viewerRightBarInfoLensLocation,
  viewerRightBarInfoLensValue:
    state.present.viewerRightBarInfoLensValue,
});

const mapDispatchToProps = dispatch => ({
  toggleViewerRightBarInfoLensLocation:
    isOpen => dispatch(setViewerRightBarInfoLensLocation(!isOpen)),
  toggleViewerRightBarInfoLensValue:
    isOpen => dispatch(setViewerRightBarInfoLensValue(!isOpen)),
});

export default withPubSub(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerRightBarInfo));

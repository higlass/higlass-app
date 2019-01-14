import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// HOCs
import withPubSub from '../hocs/with-pub-sub';

// Components
import ButtonIcon from '../components/ButtonIcon';
import ShareViewConfigUrl from '../components/ShareViewConfigUrl';
import SubTopBar from '../components/SubTopBar';
import SubTopBottomBarButtons from '../components/SubTopBottomBarButtons';
import ToolTip from '../components/ToolTip';

// Actions
import { setViewerMouseTool } from '../actions';

// Utils
import { Deferred, downloadAsJson, Logger } from '../utils';

// Configs
import { PAN_ZOOM, SELECT } from '../configs/mouse-tools';

const logger = Logger('ViewerSubTopBar');

const server = typeof window.HGAC_SERVER !== 'undefined'
  ? window.HGAC_SERVER  // from compiled `config.js`
  : HGAC_SERVER;  // from webpack's DefinePlugin

const showSharedViewUrl = (publish, sharedView) => {
  publish(
    'globalDialog',
    {
      message: <ShareViewConfigUrl
        id={sharedView.id}
        url={sharedView.url}
      />,
      request: new Deferred(),
      resolveOnly: true,
      resolveText: 'Done',
      headline: 'View Sharing via Link Ready',
    }
  );
};

const shareViewConfig = (publish, share) => {
  const req = share(`${server}/api/v1/viewconfs/`);

  if (!req) {
    publish(
      'globalError',
      'Sharing view config as link not available. Ask your admin! '
      + 'Try saving the view config with CMD+S instead.'
    );
    return;
  }

  req
    .then((sharedView) => {
      showSharedViewUrl(sharedView);
    })
    .catch((e) => {
      logger.warn('Sharing view config as link failed.', e);
      publish(
        'globalError',
        'Sharing view config as link failed. Maybe the server is down? '
        + 'Try saving the view config with CMD+S instead.'
      );
    });
};

const downloadViewConfig = viewConfig => downloadAsJson('viewConfig.json', viewConfig);

const ViewerSubTopBar = props => (
  <SubTopBar>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c no-list-style'>
      <li>
        <ToolTip
          align='left'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Pan & Zoom Tool</span>
              <span className='short-cut'>Z</span>
            </span>
          }>
          <ButtonIcon
            icon='drag'
            iconOnly={true}
            isActive={props.mouseTool === PAN_ZOOM}
            onClick={() => props.setMouseTool(PAN_ZOOM)} />
        </ToolTip>
      </li>
      <li>
        <ToolTip
          align='left'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Select Tool</span>
              <span className='short-cut'>S</span>
            </span>
          }>
          <ButtonIcon
            icon='select'
            iconOnly={true}
            isActive={props.mouseTool === SELECT}
            onClick={() => props.setMouseTool(SELECT)} />
        </ToolTip>
      </li>
    </SubTopBottomBarButtons>
    <SubTopBottomBarButtons
      className='flex-c flex-a-c flex-jc-e no-list-style'
    >
      <li>
        <ToolTip
          align='right'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Share View Config</span>
            </span>
          }>
          <ButtonIcon
            icon='share'
            iconOnly={true}
            onClick={() => shareViewConfig(
              props.pubSub.publish, props.shareViewAsLink
            )} />
        </ToolTip>
      </li>
      <li>
        <ToolTip
          align='right'
          delayIn={1000}
          delayOut={500}
          title={
            <span className='flex-c'>
              <span>Download View Config</span>
              <span className='short-cut'>CMD + S</span>
            </span>
          }>
          <ButtonIcon
            icon='download'
            iconOnly={true}
            onClick={() => downloadViewConfig(
              props.pubSub.publish, props.viewConfig
            )} />
        </ToolTip>
      </li>
    </SubTopBottomBarButtons>
  </SubTopBar>
);

ViewerSubTopBar.propTypes = {
  mouseTool: PropTypes.string,
  pubSub: PropTypes.object.isRequired,
  setMouseTool: PropTypes.func,
  shareViewAsLink: PropTypes.func,
  viewConfig: PropTypes.object,
};

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
  mouseTool: state.present.viewerMouseTool,
});

const mapDispatchToProps = dispatch => ({
  setMouseTool: mouseTool => dispatch(setViewerMouseTool(mouseTool)),
});

export default withPubSub(connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerSubTopBar));

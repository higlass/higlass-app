import { connect } from 'react-redux';
import { setViewConfig } from '../actions';
import HiGlassLauncher from '../components/HiGlassLauncher/HiGlassLauncher';

const mapStateToProps = state => ({
  viewConfig: state.present.viewConfig,
});

const mapDispatchToProps = dispatch => ({
  setViewConfig: (viewConfig) => {
    dispatch(setViewConfig(viewConfig));
  },
});

const HiGlassLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(HiGlassLauncher);

export default HiGlassLoader;

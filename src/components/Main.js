import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router';

// Views
import About from '../views/About';
import Examples from '../views/Examples';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Plugins from '../views/Plugins';
import Viewer from '../views/Viewer';

const hasDemos = typeof window.HGAC_HOMEPAGE_DEMOS !== 'undefined'
  ? window.HGAC_HOMEPAGE_DEMOS  // from compiled `config.js`
  : HGAC_HOMEPAGE_DEMOS;  // from webpack's DefinePlugin

class Main extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/about' render={About.render} />
        <Route exact path='/app' render={({ location }) => {
          const query = new URLSearchParams(location.search);
          const viewConfigId = query.get('config');

          return <Viewer
            isAuthenticated={this.props.isAuthenticated}
            viewConfigId={viewConfigId} />;
        }} />
        <Route exact path='/examples' component={Examples} />
        <Route exact path='/plugins' component={Plugins} />
        {hasDemos ? (
          <Route exact path='/' component={Home} />
        ) : (
          <Redirect from="/" to="/app" />
        )}
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

export default withRouter(Main);

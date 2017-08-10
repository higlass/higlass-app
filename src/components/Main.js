import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';

// Views
import About from '../views/About';
import Docs from '../views/Docs';
import Examples from '../views/Examples';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Viewer from '../views/Viewer';

class Main extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path='/about' component={About} />
        <Route exact path='/app' render={({ location }) => {
          const query = new URLSearchParams(location.search);
          const viewConfigId = query.get('config');

          return <Viewer
            isAuthenticated={this.props.isAuthenticated}
            viewConfigId={viewConfigId} />;
        }} />
        <Route exact path='/examples' component={Examples} />
        <Route exact path='/docs' component={Docs} />
        <Route exact path='/' component={Home} />
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

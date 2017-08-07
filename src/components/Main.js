import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// Views
import About from '../views/About';
import Docs from '../views/Docs';
import Examples from '../views/Examples';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import Viewer from '../views/Viewer';

const Main = () => (
  <Switch>
    <Route exact path='/about' component={About} />
    <Route exact path='/app' render={({ location, }) => {
      const query = new URLSearchParams(location.search);
      const viewConfigId = query.get('config');

      return <Viewer viewConfigId={viewConfigId} />;
    }} />
    <Route exact path='/examples' component={Examples} />
    <Route exact path='/docs' component={Docs} />
    <Route exact path='/' component={Home} />
    <Route component={NotFound}/>
  </Switch>
);

export default withRouter(Main);

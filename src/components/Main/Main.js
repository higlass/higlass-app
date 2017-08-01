import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// Views
import About from '../../views/About/About';
import Docs from '../../views/Docs/Docs';
import Examples from '../../views/Examples/Examples';
import Home from '../../views/Home/Home';
import NotFound from '../../views/NotFound/NotFound';
import Viewer from '../../views/Viewer/Viewer';

// Components
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Main = () => (
  <ScrollToTop>
    <Switch>
      <Route exact path='/about' component={About} />
      <Route exact path='/app' render={({ location, }) => {
        const query = new URLSearchParams(location.search);
        const viewConfigId = query.get('config');

        return <Viewer viewConfigId={viewConfigId} />;
      }} />
      <Route exact path='/examples' component={Examples} />
      <Route exact path='/docs' component={Docs} />
      <Route exact path='/' render={({ location, }) => {
        const query = new URLSearchParams(location.search);
        const viewConfigId = query.get('config');

        if (viewConfigId) {
          return <Viewer viewConfigId={viewConfigId} />;
        }

        return <Home />;
      }} />
      <Route component={NotFound}/>
    </Switch>
  </ScrollToTop>
);

export default withRouter(Main);

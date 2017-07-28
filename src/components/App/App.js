import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// Views
import Home from '../../views/Home/Home';
import NotFound from '../../views/NotFound/NotFound';

// Router
import ScrollToTop from '../ScrollToTop/ScrollToTop';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound}/>
          </Switch>
        </ScrollToTop>
      </div>
    );
  }
}

export default withRouter(App);

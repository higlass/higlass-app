import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Stylesheets
import './Home.scss';

// Assets
import logo from './logo.svg';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h2>Welcome to HiGlass</h2>
        </div>
        <p className="home-intro">
          Let&apos;s build an awesome HiGlass app.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

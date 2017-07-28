import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Components
import ContentWithFooter from '../../components/ContentWithFooter/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';

// Stylesheets
import './Home.scss';

// Assets
import logo from './logo.svg';

class Home extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <ContentWithFooter>
          <div className="home">
            <div className="home-header">
              <img src={logo} className="home-logo" alt="logo" />
              <h2>Welcome to HiGlass</h2>
            </div>
            <p className="home-intro">
              Let&apos;s build an awesome HiGlass app.
            </p>
          </div>
        </ContentWithFooter>
      </ContentWrapper>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

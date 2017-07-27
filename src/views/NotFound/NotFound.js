import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
  render() {
    return (
      <div className="not-found">
        <div className="not-found-header">
          <h2>Not found</h2>
        </div>
        <p className="not-found-intro">
          Sorry, this is embarrassing.
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

import React from 'react';

const { Provider, Consumer } = React.createContext();

// Higher order component
const withPubSub = Component => props => (
  <Consumer>
    {pubSub => <Component {...props} pubSub={pubSub} />}
  </Consumer>
);

export default withPubSub;

export { Provider };

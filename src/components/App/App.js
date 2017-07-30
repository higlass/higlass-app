import React from 'react';

// Components
import DropNotifier from '../DropNotifier/DropNotifier';
import Main from '../Main/Main';
import TopBar from '../TopBar/TopBar';

// Utils
import Logger from '../../utils/logger';

import './App.scss';

const logger = Logger('App');


class App extends React.Component {
  constructor(props) {
    super(props);

    this.dropHandler = this.dropHandler.bind(this);
  }

  dropHandler(event) {
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (fileEvent) => {
      try {
        this.setState({
          config: JSON.parse(fileEvent.target.result),
        });
      } catch (e) {
        logger.error('Only drop valid JSON', e);
      }
    });

    reader.readAsText(file);
  }

  render() {
    return (
      <div className='app full-dim'>
        <DropNotifier
          drop={this.dropHandler} />
        <TopBar />
        <Main />
      </div>
    );
  }
}

export default App;

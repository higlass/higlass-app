import React from 'react';
// Utils
import Logger from '../utils/logger';

const URL = '/version.txt';

const logger = Logger('AppInfo');

const hglibVersion = window.hglib && typeof window.hglib.version !== 'undefined'
  ? window.hglib.verion  // from HiGlass (defined at runtime)
  : VERSION_HIGLASS_VIEWER;  // from webpack's DefinePlugin (defined at compile time)

class AppInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      serverVersion: <em>(loading&hellip;)</em>,
    };

    fetch(URL)
      .then(response => response.text())
      .then((response) => {
        if (response.split('\n')[0].substr(0, 14) !== 'SERVER_VERSION') {
          throw Error('Could not parse `version.txt`. Expecting the first line to start with `SERVER_VERSION`.');
        }

        this.setState({
          serverVersion: response.split('\n')[0].slice(16),
        });
      })
      .catch((error) => {
        logger.warn('Could not retrieve or parse server version.', error);
        this.setState({
          serverVersion: <em>(unknown)</em>,
        });
      });
  }

  render() {
    return (
      <div className='app-info'>
        <ul className='no-list-style'>
          <li><strong>App</strong>: Version {VERSION_HIGLASS_APP}</li>
          <li><strong>Viewer</strong>: Version {hglibVersion}</li>
          <li><strong>Server</strong>: Version {this.state.serverVersion}</li>
        </ul>
        <p>
          Please report bugs at <a href='https://github.com/hms-dbmi/higlass/issues' target='_blank' rel='noopener noreferrer'>GitHub</a>.
          For quick help join our <a href='http://bit.ly/higlass-slack' target='_blank' rel='noopener noreferrer'>Slack channel</a>.
        </p>
      </div>
    );
  }
}

export default AppInfo;

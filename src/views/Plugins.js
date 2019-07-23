import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import ErrorMsgCenter from '../components/ErrorMsg';
import Footer from '../components/Footer';
import PluginList from '../components/PluginList';
import SpinnerCenter from '../components/SpinnerCenter';

// Services
import Logger from '../utils/logger';

const URL = '//content.higlass.io/plugins';

const logger = Logger('Plugins');


class Plugins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isLoading: true,
      plugins: [],
    };

    fetch(URL)
      .then(response => response.json())
      .then((plugins) => {
        this.setState({
          error: '',
          isLoading: false,
          plugins,
        });
      })
      .catch((error) => {
        logger.error('Could not retrieve or parse plugins.', error);
        this.setState({
          error: 'Could not load plugins.',
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <ContentWrapper name='plugins'>
        <Content name='plugins'>
          <header className='border-bottom p-t-1 p-b-1'>
            <div className='wrap'>
              <p>
                HiGlass can be extended using plugin tracks. Below is list of
                supported plugin tracks. If you have developed a new awesome
                track please <a href="https://github.com/higlass/higlass-app-content/blob/master/plugins.json" target='_blank' rel='noopener noreferrer'>add your track to this file</a> and
                submit a pull request.
              </p>
            </div>
          </header>
          <div className='flex-c flex-v full-wh'>
            <div className='flex-g-1 wrap p-t-1 p-b-1 min-content-height'>
              {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
              {!this.state.error
                && (this.state.isLoading
                  ? <SpinnerCenter />
                  : <PluginList plugins={this.state.plugins} />
                )
              }
            </div>
          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

export default Plugins;

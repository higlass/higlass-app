import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import ErrorMsgCenter from '../components/ErrorMsg';
import Footer from '../components/Footer';
import ExampleList from '../components/ExampleList';
import SpinnerCenter from '../components/SpinnerCenter';

// Services
import Logger from '../utils/logger';

const URL = '//content.higlass.io/examples';

const logger = Logger('Examples');


class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      isLoading: true,
      examples: [],
    };

    fetch(URL)
      .then(response => response.json())
      .then((examples) => {
        this.setState({
          error: '',
          isLoading: false,
          examples,
        });
      })
      .catch((error) => {
        logger.error('Could not retrieve or parse examples.', error);
        this.setState({
          error: 'Could not load examples.',
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <ContentWrapper name='examples'>
        <Content name='examples'>
          <header className='border-bottom p-t-1 p-b-1'>
            <div className='wrap'>
              <p>
              The examples below are meant to showcase HiGlass&apos;s capabilities as a
              contact map explorer as well as to point out loci of interest.
              </p>
            </div>
          </header>
          <div className='flex-c flex-v full-wh'>
            <div className='flex-g-1 wrap p-t-1 p-b-1'>
              {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
              {!this.state.error
                && (this.state.isLoading
                  ? <SpinnerCenter /> : <ExampleList examples={this.state.examples} />
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

export default Examples;

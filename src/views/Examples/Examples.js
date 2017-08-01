import React from 'react';

// Components
import ContentWithFooter from '../../components/Content/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import ErrorMsgCenter from '../../components/ErrorMsg/ErrorMsgCenter';
import ExampleList from '../../components/ExampleList/ExampleList';
import SpinnerCenter from '../../components/Spinner/SpinnerCenter';

// Services
import Logger from '../../utils/logger';

const URL = 'https://gist.githubusercontent.com/pkerpedjiev/104f6c37fbfd0d7d41c73a06010a3b7e/raw/higlass-examples.json';

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
      <ContentWrapper>
        <ContentWithFooter name='examples'>
          <div className='flex-c flex-v full-wh'>
            <div className='border-bottom p-t-1 p-b-1'>
              <div className='wrap'>
                <p>
                The examples below are meant to showcase HiGlass&apos;s capabilities as a
                contact map explorer as well as to point out loci of interest.
                </p>
              </div>
            </div>

            <div className='flex-g-1 wrap rel p-t-1 p-b-1'>
              {this.state.error && <ErrorMsgCenter msg={this.state.error}/>}
              {!this.state.error && (
                this.state.isLoading ?
                  <SpinnerCenter /> : <ExampleList examples={this.state.examples} />
                )
              }
            </div>
          </div>
        </ContentWithFooter>
      </ContentWrapper>
    );
  }
}

export default Examples;

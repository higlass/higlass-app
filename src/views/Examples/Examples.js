import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// Components
import ContentWithFooter from '../../components/ContentWithFooter/ContentWithFooter';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import ExampleList from '../../components/ExampleList/ExampleList';
import SpinnerCenter from '../../components/SpinnerCenter/SpinnerCenter';

// Services
import Logger from '../../utils/logger';

// Stylesheets
import './Examples.scss';

const URL = 'https://gist.githubusercontent.com/pkerpedjiev/104f6c37fbfd0d7d41c73a06010a3b7e/raw/higlass-examples.json';

const logger = Logger('Examples');


class Examples extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      isLoading: true,
      examples: [],
    };

    fetch(URL)
      .then(response => response.json())
      .then((examples) => {
        this.setState({
          isLoading: false,
          examples,
        });
      })
      .catch((error) => {
        logger.error('Could not retrieve or parse examples.', error);
        this.setState({
          isError: true,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <ContentWrapper>
        <ContentWithFooter name='examples'>
          <div className='border-bottom p-t-1 p-b-1'>
            <div className='wrap'>
              <p>
              The examples below are meant to showcase HiGlass&aps;s capabilities as a
              contact map explorer as well as to point out loci of interest.
              </p>
            </div>
          </div>

          <div className='flex-g-1 wrap p-t-1 p-b-1 test'>
            {this.state.isLoading ?
              <SpinnerCenter /> : <ExampleList examples={this.state.examples} />
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Examples);

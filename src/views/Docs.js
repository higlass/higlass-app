import React from 'react';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';

// Utils
import {
  requestNextAnimationFrame
} from '../utils';

class Docs extends React.Component {
  constructor(props) {
    super(props);

    this.state = { height: '85vh' };
  }

  getHeight(el) {
    requestNextAnimationFrame(() => {
      if (!el) return;

      const height = `${el.getBoundingClientRect().height}px`;

      if (this.state.height !== height) {
        this.setState({
          height: `${el.getBoundingClientRect().height}px`,
        });
      }
    });
  }

  render() {
    return (
      <ContentWrapper name='docs'>
        <Content name='docs' rel={true} bottomMargin={false}>
          <div className='full-dim oh' ref={this.getHeight.bind(this)}>
            <iframe
              className='full-wh'
              frameBorder='0'
              src='https://higlass.github.io/higlass-docs/'
              style={{ height: this.state.height }}
            />
          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

export default Docs;

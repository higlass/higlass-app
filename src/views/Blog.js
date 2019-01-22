import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

// Components
import Content from '../components/Content';
import ContentWrapper from '../components/ContentWrapper';
import Footer from '../components/Footer';

// Utils
import {
  requestNextAnimationFrame
} from '../utils';

class Blog extends React.Component {
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
    const subPath = `${this.props.location.pathname.slice(6)}`;

    return (
      <ContentWrapper name='blog'>
        <Content name='blog' rel={true} bottomMargin={false}>
          <div className='full-dim oh' ref={this.getHeight.bind(this)}>
            <iframe
              className='full-wh'
              frameBorder='0'
              src={`https://higlass.github.io/higlass-blog/${subPath}`}
              style={{ height: this.state.height }}
            />
          </div>
        </Content>
        <Footer />
      </ContentWrapper>
    );
  }
}

Blog.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Blog);

import PropTypes from 'prop-types';
import React from 'react';

// Services
import pubSub from '../../services/pub-sub';

// Utils
import debounce from '../../utils/debounce';

// Styles
import './SideBar.scss';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.scrollHandlerDb = debounce(this.scrollHandler.bind(this), 50);

    this.sidebarOffsetTop = 0;
    this.state = {
      style: {
        marginTop: 0,
      },
    };
  }

  componentDidMount() {
    if (this.props.isSticky) {
      this.sidebarOffsetTop = this.sideBarEl.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;

      pubSub.subscribe('scrollTop', this.scrollHandlerDb);
    }
  }

  componentWillUnmount() {
    if (this.props.isSticky) {
      pubSub.unsubscribe('scrollTop', this.scrollHandlerDb);
    }
  }

  render() {
    return (
      <aside
        className='side-bar'
        ref={(el) => { this.sideBarEl = el; }}
        style={this.state.style}>
        {this.props.children}
      </aside>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  scrollHandler(scrollTop) {
    this.setState({
      style: {
        marginTop: `${scrollTop}px`,
      },
    });
  }
}

SideBar.defaultProps = {
  isSticky: false,
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
  isSticky: PropTypes.bool,
};

export default SideBar;

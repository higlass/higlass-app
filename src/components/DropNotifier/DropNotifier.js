import React from 'react';

import hasParent from '../../utils/has-parent';

import './DropNotifier.scss';

class DropNotifier extends React.Component {
  constructor(el, dropCallback) {
    super();
    this.el = el;
    this.dropCallback = dropCallback;
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  render() {
    return (
      <div className="drop-notifier flex-c flex-jc-c flex-a-c">
        <div className="drop-layer full-dim-win"></div>
        <span>Drop JSON Config</span>
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  addEventListeners() {
    this.listeners = [];

    document.addEventListener('dragenter', (event) => {
      this.el.addClass('is-dragging-over');

      event.stopPropagation();
      event.preventDefault();
      return false;
    });

    document.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      return false;
    });


    this.el.addEventListener('dragleave', (event) => {
      if (event.target.id === 'drop-layer') {
        this.el.removeClass('is-dragging-over');
      }

      event.stopPropagation();
      event.preventDefault();
      return false;
    });

    document.addEventListener('drop', (event) => {
      event.preventDefault();

      if (hasParent(event.target, this.el)) {
        this.dropCallback(event);
      }

      this.el.removeClass('is-dragging-over');
    }, false);
  }
}

export default DropNotifier;

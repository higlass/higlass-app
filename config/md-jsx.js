const fs = require('fs');
const mdJsx = require('markdown-jsx-loader');

const mdRenderer = new mdJsx.Renderer();

mdRenderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
<h${level + 1} id='/docs/${escapedText}' className='underlined anchored'>
  <a href='#/docs/${escapedText}' className='hidden-anchor'>
    <Icon iconId='link' />
  </a>
  <span>${text}</span>
</h${level + 1}>
  `;
};

const jsxRenderer = contents => (`
import React from 'react';

// Relative to src/wiki
import Icon from './components/Icon/Icon';

export default () => (<div>${contents}</div>);
`);

module.exports = {
  jsxRenderer,
  mdRenderer,
};

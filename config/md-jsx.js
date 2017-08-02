/* eslint-disable import/no-extraneous-dependencies */

const mdJsx = require('markdown-jsx-loader');

const mdRenderer = new mdJsx.Renderer();

mdRenderer.code = code =>
  mdRenderer.constructor.prototype.code(code.replace(/\\/g, '\\\\'));

mdRenderer.heading = (text, level) => {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  const newLevel = level === 1 ? 1 : level + 1;

  return `
<h${newLevel} id='${escapedText}' className='underlined anchored'>
  <div className='anchor-wrapper'>
    <a href='#${escapedText}' className='hidden-anchor'>
      <Icon iconId='link' />
    </a>
    <span>${text}</span>
  </div>
</h${newLevel}>
`;
};

mdRenderer.html = html =>
  mdRenderer.constructor.prototype.html(
    html.replace(/align=("|')[^"']*("|')/g, '')
  );

mdRenderer.paragraph = paragraph =>
  mdRenderer.constructor.prototype.paragraph(
    paragraph.replace(/align=("|')[^"']*("|')/g, '')
  );

mdRenderer.table = (header, body) => `
<table>
  <thead>
    ${header}
  </thead>
  <tbody>
    ${body}
  </tbody>
</table>
`;

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

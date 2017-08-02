const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');

const wikiPath = path.join(paths.appSrc, '../wiki');
const sidebarPath = path.join(wikiPath, '_Sidebar.md');

const getPageOrder = () => {
  const order = [];
  const pages = {};

  const contents = fs.readFileSync(sidebarPath, 'utf8');

  if (!contents) { return order; }

  const lines = contents.split('\n');
  lines.forEach((line) => {
    const regex = /\(([a-zA-Z0-9\-_]+)/;
    const match = regex.exec(line);

    if (match && !pages[match[1]]) {
      order.push(`${match[1]}.md`);
      pages[match[1]] = true;
    }
  });

  return order;
};

const pageOrder = getPageOrder();

let finalContent = '';

for (let i = 0; i < pageOrder.length; i++) {
  const page = pageOrder[i];
  const pageName = page.substr(0, page.length - 3);

  let contents = `# ${pageName}\n\n`;
  contents += fs
    .readFileSync(path.join(wikiPath, page), 'utf8')
    .replace(/(#+)\s/g, `$1# ${pageName} `);
  contents += '\n\n';

  if (!contents) { continue; }

  finalContent += contents;
}

// Write concatenated wiki page
fs.writeFileSync(path.join(paths.appSrc, 'wiki.md'), finalContent);


// Update links of the sidebar
let sidebar = fs.readFileSync(sidebarPath, 'utf8');

sidebar = sidebar.replace(/#/g, '-');
sidebar = sidebar.replace(
    /\(([^#)]+)/g,
    (...args) => `(#${args[1].toLowerCase()}`
);

fs.writeFileSync(path.join(paths.appSrc, 'sidebar.md'), sidebar);

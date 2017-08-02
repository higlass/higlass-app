const fs = require('fs');
const path = require('path');
const paths = require('../config/paths');

const wikiPath = path.join(paths.appSrc, '../wiki');
const sidebarPath = path.join(wikiPath, '_Sidebar.md');

const getPageOrder = () => {
  const order = [];

  const contents = fs.readFileSync(sidebarPath, 'utf8');

  if (!contents) { return order; }

  const lines = contents.split('\n');
  lines.forEach((line) => {
    if (line.slice(0, 3) === '**[') {
      const start = line.indexOf('](');
      const end = line.indexOf(')');
      if (start >= 0 && end >= 0) {
        order.push(`${line.slice(start + 2, end).replace(/ /gi, '-')}.md`);
      }
    }
  });

  return order;
};

const pageOrder = getPageOrder();

let finalContent = '';

for (let i = 0; i < pageOrder.length; i++) {
  const page = pageOrder[i];

  let contents = fs.readFileSync(path.join(wikiPath, page), 'utf8');
  contents += '\n\n';

  if (!contents) { continue; }

  finalContent += contents;
}

// Write concatenated wiki page
fs.writeFileSync(path.join(paths.appSrc, 'wiki.md'), finalContent);

fs.createReadStream(sidebarPath)
  .pipe(fs.createWriteStream(path.join(paths.appSrc, 'sidebar.md')));

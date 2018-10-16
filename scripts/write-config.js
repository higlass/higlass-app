'use strict';

const fs = require('fs');
const changeCase = require('change-case');
const globalEnvironment = require('../config/gEnv').env;
const configBase = require('../config.json');

const run = (prod) => {
  const config = {};
  Object.assign(config, configBase);
  try {
    const configLocal = require(`../config.${prod ? 'prod' : 'dev'}.json`);
    Object.assign(config, configLocal);
  } catch (e) { /* Nothing */ }
  try {
    const configLocal = require('../config.local.json');
    Object.assign(config, configLocal);
  } catch (e) { /* Nothing */ }
  const env = Object.keys(config)
    .filter(key => globalEnvironment.indexOf(key) >= 0)
    .map(key => `window.HGAC_${changeCase.constantCase(key)}=${typeof key === 'string' ? JSON.stringify(config[key]) : config[key]};`);
  fs.writeFile(
    './build/config.js',
    env.join('\n'),
    (err) => {
      if (err) {
        console.log(err);
      }
    });
};
module.exports = {
  run: run,
};

const LEVELS = {
  debug: 'log',
  info: 'info',
  warning: 'warn',
  error: 'error',
};

const logger = {
  name: 'Unnamed',
};

Object.keys(LEVELS).forEach((level) => {
  logger[level] = function log(...args) {
    console[LEVELS[level]](`[${level.toUpperCase()}: ${this.name}]`, ...args);
  };
});

const Logger = name => Object.create(logger, { name: { value: name, }, });

export default Logger;

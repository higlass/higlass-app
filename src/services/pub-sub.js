const stack = {};

const publish = (event, news) => {
  if (!stack[event]) { return; }

  stack[event].forEach(listener => listener(news));
};

const subscribe = (event, callback) => {
  if (!stack[event]) {
    stack[event] = [];
  }

  stack[event].push(callback);
};

const unsubscribe = (event, callback) => {
  if (!stack[event]) { return; }

  const idx = stack[event].indexOf(callback);

  if (idx === -1) { return; }

  stack[event].splice(idx, 1);
};

const pubSub = {
  publish,
  subscribe,
  unsubscribe,
};

export default pubSub;

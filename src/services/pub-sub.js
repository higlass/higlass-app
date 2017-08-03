const stack = {};

/**
 * Publish an event.
 *
 * @param {string} event - Event type to be published.
 * @param {any} news - The news to be published.
 */
const publish = (event, news) => {
  if (!stack[event]) { return; }

  stack[event].forEach(listener => listener(news));
};

/**
 * Subscribe to an event.
 *
 * @param {string} event - Event name to subscribe to.
 * @param {function} callback - Function to be called when event of type `event`
 *   is published.
 * @return {int} Index of the callback function on the event stack. The index
 *   can be used to unsubscribe.
 */
const subscribe = (event, callback) => {
  if (!stack[event]) {
    stack[event] = [];
  }

  return stack[event].push(callback) - 1;
};

/**
 * Unsubscribe from event.
 *
 * @param {string} event - Event from which to unsubscribe.
 * @param {function} callback - Callback function to be unsubscribed. It is
 *   ignored if `id` is provided.
 * @param {int} id - Index of the callback function to be removed from the
 *   event stack. The index is returned by `subscribe()`.
 */
const unsubscribe = (event, callback, id) => {
  if (!stack[event]) { return; }

  const idx = typeof id !== 'undefined' ? id : stack[event].indexOf(callback);

  if (idx === -1 || idx >= stack[event].length) { return; }

  stack[event].splice(idx, 1);
};

const pubSub = {
  publish,
  subscribe,
  unsubscribe,
};

export default pubSub;

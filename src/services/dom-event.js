import pubSub from './pub-sub';

const click = event => pubSub.publish('click', event);

const keydown = event => pubSub.publish('keydown', event);

const keyup = event => pubSub.publish('keyup', event);

const mousemove = event => pubSub.publish('mousemove', event);

const mouseup = event => pubSub.publish('mouseup', event);

const resize = event => pubSub.publish('resize', event);

const scroll = event => pubSub.publish(
  'scrollTop',
  event.target.scrollTop || document.body.scrollTop
);

/**
 * Supported event handlers.
 *
 * @type {object}
 */
const eventHandler = {
  click,
  keydown,
  keyup,
  mousemove,
  mouseup,
  orientationchange: resize,
  resize,
  scroll,
};

/**
 * Stack of elements with registered event listeners.
 *
 * @type {object}
 */
const registeredEls = {};

/**
 * Unregister an event listener.
 *
 * @param {string} event - Name of the event to stop listening from.
 * @param {object} element - DOM element which we listened to.
 */
const unregister = (event, element) => {
  if (!registeredEls[event] && registeredEls[event] !== element) { return; }

  registeredEls[event].removeEventListener(event, eventHandler[event]);

  registeredEls[event] = undefined;
  delete registeredEls[event];
};

/**
 * Register an event listener.
 *
 * @param {string} event - Name of the event to listen to.
 * @param {object} newElement - DOM element which to listen to.
 */
const register = (event, newElement) => {
  if (!newElement || registeredEls[event] === newElement) { return; }

  if (registeredEls[event]) {
    unregister(registeredEls[event]);
  }

  registeredEls[event] = newElement;
  registeredEls[event].addEventListener(event, eventHandler[event]);
};

/**
 * Public API.
 *
 * @type {object}
 */
const domEvent = {
  register,
  unregister,
};

export default domEvent;

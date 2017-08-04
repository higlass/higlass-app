import pubSub from './pub-sub';

const resize = event => pubSub.publish('resize', event);

const scroll = event => pubSub.publish(
  'scrollTop',
  event.target.scrollTop || document.body.scrollTop
);

const eventHandler = {
  orientationchange: resize,
  resize,
  scroll,
};

const registeredEls = {};

const unregister = (event, element) => {
  if (!registeredEls[event] && registeredEls[event] !== element) { return; }

  registeredEls[event].removeEventListener(event, eventHandler[event]);

  registeredEls[event] = undefined;
  delete registeredEls[event];
};

const register = (event, newElement) => {
  if (!newElement || registeredEls[event] === newElement) { return; }

  if (registeredEls[event]) {
    unregister(registeredEls[event]);
  }

  registeredEls[event] = newElement;
  registeredEls[event].addEventListener(event, eventHandler[event]);
};

const domEvent = {
  register,
  unregister,
};

export default domEvent;

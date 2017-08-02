import pubSub from './pub-sub';

let currentElement;

const scrollHandler = event => pubSub.publish(
  'scrollTop',
  event.target.scrollTop || document.body.scrollTop
);

const unregister = (element) => {
  element.removeEventListener('scroll', scrollHandler);
};

const register = (newElement) => {
  if (!newElement || currentElement === newElement) { return; }

  if (currentElement) {
    unregister(currentElement);
  }

  currentElement = newElement;
  currentElement.addEventListener('scroll', scrollHandler);
};

const scroll = {
  register,
  unregister,
};

export default scroll;

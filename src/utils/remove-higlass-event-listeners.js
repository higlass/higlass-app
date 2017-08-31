export const removeHiGlassEventListeners = (listeners, api) => {
  listeners.forEach((listener) => {
    api.off(listener.event, listener.id);
  });
  return [];
};

export default removeHiGlassEventListeners;

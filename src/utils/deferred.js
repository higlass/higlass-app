const Deferred = function Deferred() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
};

Deferred.prototype.catch = function deferredCatch(callback) {
  this.promise.catch(callback);
};

Deferred.prototype.finally = function deferredFinally(callback) {
  return this.promise.then(() => {}).catch(() => {}).then(callback);
};

Deferred.prototype.then = function deferredThen(callback) {
  this.promise.then(callback);
};

export default Deferred;

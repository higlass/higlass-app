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
  const res = () => this.promise;
  const fin = () => Promise.resolve(callback()).then(res);
  return this.promise.then(fin, fin);
};

Deferred.prototype.then = function deferredThen(callback) {
  this.promise.then(callback);
};

export default Deferred;

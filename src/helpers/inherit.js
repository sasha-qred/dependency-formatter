module.exports = inherit;

/* eslint-disable no-param-reassign */
function inherit(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype);
  ctor.prototype.constructor = ctor;
}
/* eslint-enable */

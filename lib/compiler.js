'use strict';


var handlers = null;

exports.injectHandlers = function (_handlers) {
  handlers = _handlers;
};

exports.compile = function (key, template, helpers, data, path) {
  return handlers.handle(key, template, helpers, data, path);
};

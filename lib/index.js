'use strict';

var _ = require('lodash');
var compiler = require('./compiler');
var handlers = require('./handlers');
var placeholders = require('./placeholders');

compiler.injectHandlers(handlers);
handlers.injectCompiler(compiler);

function registerPlaceholder(name, fn, overwrite) {
  if (!_.isFunction(fn)) {
    throw new Error('placeholder must be a function.');
  }

  if (!_.has(placeholders, name) || overwrite === true) {
    placeholders[name] = fn;
  }
}

exports.registerPlaceholder = function (name, fn, overwrite) {
  if (_.isObject(name)) {
    overwrite = fn === true;
    _.forEach(name, function (placeholder, key) {
      registerPlaceholder(key, placeholder, overwrite);
    });
  } else {
    registerPlaceholder(name, fn, overwrite);
  }
};

exports.compile = function (template, data, methods) {

  var helpers = _.merge({}, placeholders, methods);
  return compiler.compile('', template, helpers, data, '');
};

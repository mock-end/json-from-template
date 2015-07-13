'use strict';

var compiler = null;

exports.injectCompiler = function (_compiler) {
  compiler = _compiler;
};

exports.handle = function (rule, fn, helpers, data, path) {
  return compiler.compile(rule.raw, fn(data), helpers, data, path);
};

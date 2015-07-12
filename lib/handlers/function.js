var compiler = null;

exports.injectCompiler = function (_compiler) {
  compiler = _compiler;
};

exports.handler = function (rule, fn, helpers, data, path) {
  return compiler.compile(rule.raw, fn(data), helpers, data, path);
};

var util = require('./util');
var compiler = require('./compiler');
var handlers = require('./handlers');
var placeholders = require('./placeholders');

compiler.injectHandlers(handlers);
handlers.injectCompiler(compiler);

function registerPlaceholder(name, fn, overwrite) {

  if (util.getType(name) === 'object') {
    overwrite = fn;
    for (var key in name) {
      if (util.hasKey(name, key)) {
        registerPlaceholder(key, name[key], overwrite);
      }
    }
  } else {

    if (util.getType(fn) !== 'function') {
      throw new Error('placeholder must be a function.');
    }

    if (!util.hasKey(placeholders, name) || overwrite === true) {
      placeholders[name] = fn;
    }
  }
}

exports.registerPlaceholder = registerPlaceholder;

exports.compile = function (template, data) {

  return compiler.compile('', template, placeholders, data, '');
};

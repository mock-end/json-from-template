'use strict';

var util = require('../util');
var parseRule = require('../rule').parse;

var handlers = {
  'number': require('./number'),
  'boolean': require('./boolean'),
  'array': require('./array'),
  'object': require('./object'),
  'function': require('./function'),
  'string': require('./string')
};

var exports = {
  injectCompiler: function (_compiler) {

    var handler;

    for (var key in handlers) {
      if (util.hasKey(handlers, key)) {

        handler = handlers[key];

        if (util.hasKey(handler, 'injectCompiler')) {
          handler.injectCompiler(_compiler);
        }
      }
    }
  },

  handle: function (key, template, helpers, data, path) {
    var type = util.getType(template);

    if (!util.hasKey(handlers, type)) {
      return template;
    }

    var handler = handlers[type];
    var rule = util.getType(key) === 'object' ? key : parseRule(key);
    var escapedKey = rule.key.replace(/\./g, '\uFFFC');

    path = path || '';
    path = path + '.' + escapedKey;

    return handler.handle(rule, template, helpers, data, path);
  }
};

module.exports = exports;

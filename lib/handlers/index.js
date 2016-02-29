'use strict';

var util = require('../util');
var parseRule = require('../rule').parse;

var handlers = {
  'array': require('./array'),
  'object': require('./object'),
  'number': require('./number'),
  'string': require('./string'),
  'boolean': require('./boolean'),
  'function': require('./function')
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
    var escapedKey = rule.key.replace(/\//g, '\uFFFC');

    path = path || '';

    if (key) {
      path = path + '/' + escapedKey;
    } else {
      path = path || '/';
    }

    return handler.handle(rule, template, helpers, data, path);
  }
};

module.exports = exports;

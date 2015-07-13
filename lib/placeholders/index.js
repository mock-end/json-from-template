'use strict';


var randoms = require('generate-random-data');
var util = require('../util');
var placeholders = {};


function init(module) {
  for (var methodName in module) {
    if (util.hasKey(module, methodName)) {
      placeholders[methodName] = module[methodName];
      placeholders[methodName.toUpperCase()] = module[methodName];
    }
  }
}

init(randoms);

'step'.split(' ')
  .forEach(function (name) {
    init(require('./' + name));
  });

module.exports = placeholders;

'use strict';

var randoms = require('generate-random-data');
var placeholders = {};


function init(module) {
  for (var methodName in module) {
    placeholders[methodName] = module[methodName];
    placeholders[methodName.toUpperCase()] = module[methodName];
  }
}

init(randoms);

'step special'
  .split(' ')
  .forEach(function (name) {
    init(require('./' + name));
  });

module.exports = placeholders;

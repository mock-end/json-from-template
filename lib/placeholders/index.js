'use strict';

var _ = require('lodash');
var randoms = require('generate-random-data');

var placeholders = {};


function init(modules) {

  _.forEach(modules, function (module, name) {
    placeholders[name] = module;
    placeholders[name.toUpperCase()] = module;
  });
}

init(randoms);

_.forEach('step special'.split(' '), function (moduleName) {
  init(require('./' + moduleName));
});


module.exports = placeholders;

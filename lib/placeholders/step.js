'use strict';

var util = require('../util');

var exports = {
  step: function (seed, step) {

    var path = this.path;
    var cache = exports.step.cache;
    var lastVal = cache[path];

    if (lastVal === undefined) {
      cache[path] = seed;
      return seed;
    }

    var ret = lastVal + step;

    var precision1 = util.isFloat(seed) ? util.getPrecision(seed) : 0;
    var precision2 = util.isFloat(step) ? util.getPrecision(step) : 0;
    var precision = Math.max(precision1, precision2);

    ret = precision ? util.toFixed(ret, precision) : ret;
    ret = +ret;

    cache[path] = ret;

    return ret;
  }
};

exports.step.cache = {};

module.exports = exports;

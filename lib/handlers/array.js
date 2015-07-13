'use strict';


var util = require('../util');
var compiler = null;

function byCount(count, arr, helpers, data, path) {

  var ret = [];
  var length = arr.length;

  while (count--) {
    for (var i = 0; i < length; i++) {
      var item = compiler.compile(i, arr[i], helpers, data, path);
      ret.push(item);
    }
  }

  return ret;
}

function byRange(rule, arr, helpers, data, path) {

  var range = util.isIRange(rule)
    ? util.getRange(rule, false)
    : util.getRange(rule, true);

  var count = helpers.int(range.min, range.max);

  return byCount(count, arr, helpers, data, path);
}

exports.injectCompiler = function (_compiler) {
  compiler = _compiler;
};

exports.handle = function (rule, arr, helpers, data, path) {

  return util.isBare(rule) ? arr
    : util.isCount(rule) ? byCount(rule.count, arr, helpers, data, path)
    : util.isRang(rule) ? byRange(rule, arr, helpers, data, path)
    : arr;
};

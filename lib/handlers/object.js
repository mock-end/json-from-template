'use strict';

var util = require('../util');
var parseRule = require('../rule').parse;

var compiler = null;

function byCount(count, obj, helpers, data, path, ordered) {
  var ret = {};
  var keys = Object.keys(obj);
  var length = keys.length;

  count = count > length || count < 0 ? length : count;

  if (!ordered) {
    // get random keys
    keys = helpers.shuffle(keys);
  }
  keys = keys.slice(0, count);

  keys.forEach(function (key) {
    var rule = parseRule(key);
    ret[rule.key] = compiler.compile(rule, obj[key], helpers, data, path);
  });

  return ret;
}

function byRange(rule, obj, helpers, data, path) {

  var range = util.isIRange(rule)
    ? util.getRange(rule, false)
    : util.getRange(rule, true);

  var count = helpers.int(range.min, range.max);

  return byCount(count, obj, helpers, data, path);
}

exports.injectCompiler = function (_compiler) {
  compiler = _compiler;
};

exports.handle = function (rule, obj, helpers, data, path) {

  return util.isBare(rule) ? byCount(-1, obj, helpers, data, path, true)
    : util.isCount(rule) ? byCount(rule.count, obj, helpers, data, path)
    : util.isRang(rule) ? byRange(rule, obj, helpers, data, path)
    : byCount(-1, obj, helpers, data, path, true);
};

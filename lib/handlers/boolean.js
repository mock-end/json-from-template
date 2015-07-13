'use strict';

var util = require('../util');

function byCount(count, val, helpers) {
  return helpers.bool(1, Math.abs(count), val);
}

function byRange(rule, val, helpers) {

  var range = util.isIRange(rule)
    ? util.getRange(rule, false)
    : util.getRange(rule, true);

  var min = range.min || 1; // fix min
  var max = range.max;

  return helpers.bool(min, max, val);

}

exports.handle = function (rule, val, helpers) {

  return util.isBare(rule) ? val
    : util.isCount(rule) ? byCount(rule.count, val, helpers)
    : util.isRang(rule) ? byRange(rule, val, helpers)
    : val;
};

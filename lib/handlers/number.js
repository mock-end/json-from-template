'use strict';

var util = require('../util');

// TODO: byStep
function byStep(step, val, helpers, path) {

  var ret;

  helpers.path = path;

  ret = helpers.step(val, step);

  delete helpers.path;

  return ret;
}

function byCount(count, val, helpers) {

  // pad the decimal part
  if (util.isFloat(val)) {

    var random = Math.random() * count;
    var precision = util.getPrecision(val);

    return util.toFixed(random, precision);

  } else {

    return helpers.int(0, count);
  }
}

function byRange(rule, helpers) {

  var ret;
  var iRange = util.getRange(rule, false);
  var iRandom = helpers.int(iRange.min, iRange.max);

  if (rule.isFloat) {

    var dRange = util.getRange(rule, true);
    var dRandom = helpers.int(dRange.min, dRange.max);

    ret = [iRandom, dRandom].join('.');
  } else {
    ret = iRandom;
  }

  return rule.isNegative ? -ret : +ret;
}

exports.handle = function (rule, val, helpers, data, path) {

  return util.isBare(rule) ? val
    : util.isStep(rule) ? byStep(rule.step, val, helpers, path)
    : util.isCount(rule) ? byCount(rule.count, val, helpers)
    : util.isRang(rule) ? byRange(rule, helpers)
    : val;
};

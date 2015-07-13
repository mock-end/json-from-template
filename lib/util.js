'use strict';

var MIN_NUMBER = -9007199254740992;
var MAX_NUMBER = 9007199254740992;
var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

exports.MIN_NUMBER = MIN_NUMBER;
exports.MAX_NUMBER = MAX_NUMBER;

exports.getType = function (obj) {

  if (obj === null || obj === undefined) {
    return '';
  } else {
    return toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
  }
};

exports.hasKey = function hasKey(obj, key) {
  return obj && hasOwn.call(obj, key);
};

exports.isInt = function (n) {

  if (isNaN(n) || !isFinite(n)) {
    return false;
  }

  return n % 1 === 0;
};

exports.isFloat = function (n) {

  if (isNaN(n) || !isFinite(n)) {
    return false;
  }

  return n % 1 !== 0;
};

exports.getPrecision = function (float) {

  var tail = (float + '').split('.')[1];

  return tail ? tail.length : 0;
};

// fixes native `toFixed` rounding issues
// eg. (0.615).toFixed(2) === "0.61"
exports.toFixed = function (val, precision) {

  // must be positive integer
  precision = Math.abs(precision);

  var power = Math.pow(10, precision);

  // multiply up by precision, round accurately,
  // then divide and use native `toFixed`
  var ret = (Math.round(val * power) / power).toFixed(precision);
  return +ret;
};


// handler utils
// -------------
exports.isBare = function (rule) {
  return rule.key === rule.raw;
};

exports.isStep = function (rule) {
  return rule.step !== false;
};

exports.isCount = function (rule) {
  return rule.count !== false;
};

exports.isIRange = function (rule) {
  return rule.iMin !== false || rule.iMax !== false;
};

exports.isDRange = function (rule) {
  return rule.dMin !== false || rule.dMax !== false;
};

exports.isRang = function (rule) {
  return rule.iMin !== false || rule.iMax !== false
    || rule.dMin !== false || rule.dMax !== false;
};

exports.getRange = function (rule, isFloat) {

  var min;
  var max;

  if (isFloat) {
    min = rule.dMin === false ? 0 : rule.dMin;
    max = rule.dMax === false ? MAX_NUMBER : rule.dMax;
  } else {
    min = rule.iMin === false ? 0 : rule.iMin;
    max = rule.iMax === false ? MAX_NUMBER : rule.iMax;
  }

  return {
    min: Math.min(min, max),
    max: Math.max(min, max)
  };
};

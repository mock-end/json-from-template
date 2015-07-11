'use strict';

var rStep = /^[\+-]((\d+\.?\d*?)|(\.\d+))$/;
var rNumber = /^[\+-]?((\d+\.?\d*?)|(\.\d+))$/;
var rPart = /^([\+-])?(\d*-?\d*)(?:\.(\d*-?\d*))?$/;
var rRange = /^(\d*)-?(\d*)$/;
var cache = {};


exports.parse = function (rule, force) {

  // normalize
  rule = (rule + '') || '';

  var result = cache[rule];
  if (result && !force) {
    return result;
  }


  var index = rule.indexOf('|');
  var key = index > 0 ? rule.substr(0, index) : rule;
  var tail = index && rule.substr(index + 1);

  result = {
    raw: rule,
    key: key,
    step: false,
    count: false,
    iMin: false,
    iMax: false,
    dMin: false,
    dMax: false,
    isNegative: false,
    isFloat: false
  };

  if (tail) {
    result.step = rStep.test(tail) && parseFloat(tail);
    result.count = result.step !== false
      ? result.step
      : rNumber.test(tail) && parseFloat(tail);
  }

  if (tail && result.count === false) {

    var matches = tail.match(rPart);
    if (matches) {
      result.isNegative = matches[1] === '-';
      result.isFloat = matches[3] !== undefined;

      if (matches[2]) {
        var iRange = matches[2].match(rRange);
        result.iMin = !!iRange[1] && parseInt(iRange[1], 10);
        result.iMax = !!iRange[2] && parseInt(iRange[2], 10);
      }

      if (matches[3]) {
        var dRange = matches[3].match(rRange);
        result.dMin = !!dRange[1] && parseInt(dRange[1], 10);
        result.dMax = !!dRange[2] && parseInt(dRange[2], 10);
      }
    }
  }

  cache[rule] = result;

  return result;
};

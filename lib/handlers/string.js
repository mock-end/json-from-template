/* jshint evil: true */
'use strict';


var util = require('../util');

var rPlaceholder = /(?:.)?@([a-zA-Z_]\w*)(?:\((.*)\)(?!\)))?/g;

function renderPlaceholder(template, helpers, data, path) {

  var result = template;
  var isBare = false;

  if (template.match(rPlaceholder)) {
    template = template.replace(rPlaceholder, function (input, methodName, argsString) {

      var firstChar = input[0];
      var isRaw = firstChar === '\\';
      var ret = isRaw
        ? input.substr(1)
        : exePlaceholder(input, methodName, argsString, helpers, data, path);

      // @int, @int(1,10)
      if (template === input) {
        isBare = true;
        result = ret;
      } else {
        if (!isRaw && firstChar !== '@') {
          ret = firstChar + ret;
        }
      }

      return ret + '';
    });

    if (!isBare) {
      result = template;
    }
  }

  return result;
}

function exePlaceholder(template, methodName, argsString, helpers, data, path) {

  var ret = template;

  try {
    methodName = methodName.toUpperCase();
    argsString = renderPlaceholder(argsString || '', helpers, data, path);

    var fnBody = 'return ' + 'this.' + methodName + '(' + argsString + ');';
    var fn = new Function(fnBody);

    helpers.data = data;
    helpers.path = path;

    ret = fn.call(helpers);

    delete helpers.data;
    delete helpers.path;

  } catch (error) {
    ret += ' ERROR: [' + error + ']';
  }

  return ret;
}

function byCount(count, str, helpers, data, path) {

  var ret = '';

  count = Math.abs(count);

  if (str) {
    // repeat the template str by count
    while (count--) {
      ret += str;
    }
    ret = renderPlaceholder(ret, helpers, data, path);
  } else {
    // generate random str
    ret = count ? helpers.string(count) : str;
  }

  return ret;
}

function byRange(rule, str, helpers, data, path) {
  var range = util.isDRange(rule)
    ? util.getRange(rule, true)
    : util.getRange(rule, false);

  var count = helpers.int(range.min, range.max);

  return byCount(count, str, helpers, data, path);
}

exports.handle = function (rule, str, helpers, data, path) {

  return util.isBare(rule) ? byCount(1, str, helpers, data, path)
    : util.isCount(rule) ? byCount(rule.count, str, helpers, data, path)
    : util.isRang(rule) ? byRange(rule, str, helpers, data, path)
    : byCount(1, str, helpers, data, path);
};

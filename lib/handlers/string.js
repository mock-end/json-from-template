/* jshint evil: true */
'use strict';

var util = require('../util');

function renderPlaceholder(template, helpers, data, path) {

  var isBare = false;
  var result = template;
  var rHolder = /(?:.)?@([a-zA-Z_]\w*)(?:(\(.*\))(?!\)))?/g;

  template = template.replace(rHolder, function (input, methodName, argsString) {

    var isRaw = input[0] === '\\';
    var placeholder = '@' + methodName;

    argsString = argsString
      ? renderPlaceholder(argsString, helpers, data, path)
      : '';

    if (isRaw) {
      return placeholder + argsString;
    } else {

      var prefix = input.substr(0, input.indexOf(placeholder));
      var suffix = '';
      var args = argsString;

      // fix args
      if (argsString) {

        var matches = 1;

        for (var i = 1, l = argsString.length; i < l; i++) {

          var char = argsString[i];

          if (char === '(') {
            matches += 1;
          } else if (char === ')') {
            matches -= 1;
          }

          if (matches === 0) {
            args = argsString.substr(0, i + 1);
            suffix = argsString.substr(i + 1);
            break;
          }
        }

        if (matches !== 0) {
          return input + 'ERROR: [bad args]';
        }
      }

      var exeResult = exePlaceholder(input, methodName, args, helpers, data, path);

      // fully matched, template is barely a placeholder, so return the
      // data(data-type) of the placeholder function called.
      if (template === input && !prefix && !suffix) {
        isBare = true;
        result = exeResult;
      }

      return prefix + exeResult + suffix;
    }
  });

  return isBare
    ? result
    : template;
}

function exePlaceholder(template, methodName, argsString, helpers, data, path) {

  var ret = template;

  try {

    if (!argsString) {
      argsString = '()';
    }

    var fnBody = 'return ' + 'this.' + methodName + argsString + ';';
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

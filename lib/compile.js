var parseRule = require('./rule').parse;
var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

function getType(object) {
  if (object === null || object === undefined) {
    return '';
  } else {
    return toString.call(object).match(/\[object (\w+)\]/)[1].toLowerCase();
  }
}

function hasKey(obj, key) {
  return obj && hasOwn.call(obj, key);
}

var handle = {
  'number': function (options) {
    var ret;

    // 含有小数部分
    if (options.rule.dRange) {
      // 分隔原数字
      // 1 -> [1]
      // 3.14 -> [3, 14]
      var parts = (options.template + '').split('.');

      // 优先使用由规则所产生的整数
      parts[0] = options.rule.iRange ? options.rule.iCount : parts[0];

      // 截取原数字的小数位数到指定的位数
      parts[1] = (parts[1] || '').slice(0, options.rule.dCount);

      // 位数不足时，补全小数部分
      while (parts[1].length < options.rule.dCount) {
        parts[1] += random.char('number');
      }
      ret = toFloat(parts.join('.'));
    } else if (options.rule.iRange) {
      // 只包含整数部分
      ret = options.rule.iCount;
    }
    else if (options.rule.step !== undefined) {
      // 自增/减
      // TODO: step
      ret = options.template + options.rule.step;
    } else {
      ret = options.template;
    }

    return ret;
  }
};

function compile(key, template, data, helpers) {
  var type = getType(template);
  var rule = parseRule(key);
}

var nativeRandom = require('./lib/random');

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var rRule = /(.+)\|(?:([\+-]\d+)|(\d+-?\d*)?(?:\.(\d+-?\d*))?)/;
var rPlaceholder = /(?:.)?@([a-zA-Z_]\w*)(?:\((.*)\)(?!\)))?/g;

var handlers = {

    'number': function (options) {

        var result = options.raw;
        var rule = options.rule;

        if (rule.step !== undefined) {

            // 自增/减

        } else if (rule.dRange) {

            // 包含小数部分

            // 1 -> [1]
            // 3.14 -> [3, 14]
            var parts = ('' + options.raw).split('.');

            // 优先使用由规则所产生的整数
            parts[0] = rule.iRange ? rule.iCount : parts[0];

            // 截取原数字的小数位数到指定的位数
            parts[1] = (parts[1] || '').slice(0, rule.dCount);

            // 位数不足时，补全小数部分
            while (parts[1].length < rule.dCount) {
                parts[1] += nativeRandom.char('number');
            }

            result = toFloat(parts.join('.'));

        } else if (rule.iRange) {

            // 只包含整数部分
            result = rule.iCount;
        }

        return result;
    },

    'boolean': function (options) {

        var result = options.raw;
        var rule = options.rule;

        result = rule.iMax
            ? nativeRandom.bool(rule.iMin, rule.iMax, result)
            : rule.iCount
            ? nativeRandom.bool(1, 1, result)
            : result;

        return result;
    },

    'array': function (options) {

        var result = [];
        var raw = options.template;
        var length = raw.length;              // 原数组长度
        var count = options.rule.iCount || 1; // 重复次数

        while (count--) {
            for (var i = 0; i < length; i++) {
                var item = generate(i, raw[i], options.data, options.root);
                result.push(item);
            }
        }

        return result;
    },

    'object': function (options) {},

    'function': function (options) {},

    'string': function (options) {}
};

function generate(key, raw, data, scope) {

    var type = getType(raw);

    if (hasOwn.call(handlers, type)) {
        return handlers[type].call(handlers, {
            raw: raw,
            type: type,
            rule: getRule(key),
            data: data
        });
    }

    return raw;
}

function getRule(rule) {

    var rRange = /(\d+)-?(\d+)?/;
    var matches = ((rule + '') || '').match(rRule);
    // 键
    var key = matches && matches[1] || rule;
    //
    var step = matches && matches[2] && toInt(matches[2]);

    // 整数部分范围
    var iRange = matches && matches[3] && matches[3].match(rRange);
    var iMin = iRange && toInt(iRange[1]);
    var iMax = iRange && toInt(iRange[2]);
    var iCount = iRange ? !iRange[2] && iMin || random.int(iMin, iMax) : undefined;

    // 小数范围
    var dRange = matches && matches[4] && matches[4].match(rRange);
    var dMin = dRange && toInt(dRange[1]);
    var dMax = dRange && toInt(dRange[2]);
    var dCount = dRange ? !dRange[2] && dMin || random.int(dMin, dMax) : undefined;

    return {
        rule: rule,
        key: key,
        step: step,
        iRange: iRange,
        iMin: iMin,
        iMax: iMax,
        iCount: iCount,
        dRange: dRange,
        dMin: dMin,
        dMax: dMax,
        dCount: dCount
    };
}


// Helpers
// -------

function getType(value) {
    if (value === null || value === undefined) {
        return String(object);
    } else {
        return toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase();
    }
}

function toInt(value) {
    return parseInt(value, 10);
}

function toFloat(value) {
    return parseFloat(value);
}
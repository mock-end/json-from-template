var random = {
    extend: function (key, fn) {
        if (typeof key === 'object') {
            return merge(this, key);
        }

        var obj = {};
        obj[key] = fn;

        return merge(this, obj);
    }
};

'base dx array datetime form network names article color special'.split(' ')
    .forEach(function (name) {
        var module = require('./' + name);
        merge(random, module);
    });

module.exports = random;


// Helpers
// -------

var hasOwn = Object.prototype.hasOwnProperty;

function merge() {
    var result = arguments[0] || {};
    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i] || {};
        for (var method in source) {
            if (hasOwn.call(source, method)) {
                result[method] = source[method];
                // to upper case
                var upper = method.toUpperCase();
                if (upper === method) {
                    continue;
                }
                result[upper] = source[method];
            }
        }
    }
    return result;
}

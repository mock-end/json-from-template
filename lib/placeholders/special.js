'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');

function readfile(file) {

  // check for existence first
  if (!fs.existsSync(file)) {
    throw new Error(file + ' doesn\'t exist');
  }

  var ext = path.extname(file);

  // YAML file
  if (ext.match(/ya?ml/)) {
    var res = fs.readFileSync(file, 'utf8');
    return yaml.safeLoad(res);
  }

  // JS / JSON / CoffeeScript
  if (ext.match(/json|js|coffee|ls/)) {
    if (require.cache[file]) {
      delete require.cache[file];
    }
    return require(file);
  }

  // unknown
  throw new Error(file + ' is an unsupported filetype');
}

module.exports = {

  'formItem': function (keys) {

    var data = this.data || {};
    var result;

    if (_.isString(keys)) {

      result = data[keys];

    } else if (_.isObject(keys)) {

      result = _.map(keys, function (key) {
        return data[key];
      });

    } else {

      result = keys;
    }

    return result;
  },

  'fromFile': function (filePath) {
    try {
      if (filePath) {
        return readfile(path.resolve(filePath));
      } else {
        return 'no file path specified.';
      }
    } catch (error) {
      return error + '';
    }
  }
};

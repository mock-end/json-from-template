var compiler = require('./lib');

var template = {
  'key|10': 1.23
};

var ret = compiler.compile(template);

console.log(ret);

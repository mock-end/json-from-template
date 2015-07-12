'use strict';

var expect = require('chai').expect;

describe('./lib', function () {

  var compiler = require('../../lib');

  it('.compile() compile normal object.', function () {

    var template = {
      number: 1,
      string: 'str',
      boolean: true,
      array: [1, 2, 3],
      object: {
        foo: 'foo',
        bar: 'bar'
      },
      reg: /.*/g,
      fun: function () {
        return 1;
      }
    };

    var ret = compiler.compile(template);

    template.fun = 1;

    expect(ret).to.eql(template);

  });

  //it('.registerPlaceholder()', function () {
  //
  //  var template = {
  //    demo: '@demo'
  //  };
  //
  //  compiler.registerPlaceholder('demo', function () {
  //    return 'demo'
  //  });
  //
  //  var ret = compiler.compile(template);
  //
  //  expect(ret.demo).to.equal('demo');
  //
  //});


});

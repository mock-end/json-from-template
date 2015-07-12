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

  it('.registerPlaceholder()', function () {

    var template = {
      demo1: '@demo(1)',
      demo2: '@demo(true)'
    };

    compiler.registerPlaceholder('demo', function (str) {
      return str;
    });

    var ret = compiler.compile(template);

    expect(ret.demo1).to.equal(1);
    expect(ret.demo2).to.equal(true);
  });

  it('.registerPlaceholder() overwrite===true', function () {

    var template = {
      demo1: '@demo(1)',
      demo2: '@demo(true)'
    };

    compiler.registerPlaceholder('demo', function () {
      return false;
    }, true);

    var ret = compiler.compile(template);

    expect(ret.demo1).to.equal(false);
    expect(ret.demo2).to.equal(false);
  });

  it('.registerPlaceholder() overwrite===false', function () {

    var template = {
      demo1: '@test(1)',
      demo2: '@test(true)'
    };

    compiler.registerPlaceholder('test', function (str) {
      return str;
    });

    compiler.registerPlaceholder('test', function () {
      return false;
    }, false);

    var ret = compiler.compile(template);

    expect(ret.demo1).to.equal(1);
    expect(ret.demo2).to.equal(true);
  });

  it('.registerPlaceholder() not a function', function () {

    function fn() {
      compiler.registerPlaceholder('test', {});
    }

    expect(fn).to.throw(Error);
  });

  it('.registerPlaceholder() register an object', function () {

    var template = {
      demo1: '@foo(1)',
      demo2: '@bar(true)'
    };

    compiler.registerPlaceholder({
      'foo': function (str) {
        return str;
      },
      'bar': function () {
        return false;
      }
    });

    var ret = compiler.compile(template);

    expect(ret.demo1).to.equal(1);
    expect(ret.demo2).to.equal(false);
  });

});

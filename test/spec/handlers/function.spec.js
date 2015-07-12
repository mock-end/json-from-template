'use strict';

var expect = require('chai').expect;

describe('./lib/handlers/function.handle()', function () {

  var compiler = require('../../../lib');

  it('return undefined', function () {

    var template = {
      'fun': function () { }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.equal(undefined);
  });

  it('return string', function () {

    var template = {
      'fun': function () {
        return 'foo';
      }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.equal('foo');
  });

  it('return number', function () {

    var template = {
      'fun': function () {
        return 1;
      }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.equal(1);
  });

  it('return bool', function () {

    var template = {
      'fun': function () {
        return false;
      }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.equal(false);
  });

  it('return array', function () {

    var template = {
      'fun': function () {
        return [1, 2, 3];
      }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.eql([1, 2, 3]);
  });

  it('return object', function () {

    var template = {
      'fun': function () {
        return {
          foo: 'foo',
          bar: 'bar'
        };
      }
    };
    var ret = compiler.compile(template);

    expect(ret.fun).to.eql({
      foo: 'foo',
      bar: 'bar'
    });
  });

});


'use strict';

var expect = require('chai').expect;

describe('./lib/handlers/object.handle()', function () {

  var compiler = require('../../../lib');

  it('bare', function () {

    var template = {
      'obj1': {
        foo: 'foo',
        bar: 'foo'
      },
      'obj2|': {
        foo: 'foo',
        bar: 'foo'
      }
    };
    var ret = compiler.compile(template);

    expect(ret).to.eql({
      'obj1': {
        foo: 'foo',
        bar: 'foo'
      },
      'obj2': {
        foo: 'foo',
        bar: 'foo'
      }
    });
  });


  it('by count', function () {

    var template = {
      'obj|1': {
        foo: 'foo',
        bar: 'foo',
        baz: 'baz',
        qux: 'qux'
      }
    };
    var ret = compiler.compile(template);

    expect(ret.obj).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
  });

  it('by range', function () {

    var template = {
      'obj|1-3': {
        foo: 'foo',
        bar: 'foo',
        baz: 'baz',
        qux: 'qux'
      }
    };
    var ret = compiler.compile(template);

    expect(ret.obj).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
  });

  it('by range', function () {

    var template = {
      'obj|-.1-3': {
        foo: 'foo',
        bar: 'foo',
        baz: 'baz',
        qux: 'qux'
      }
    };
    var ret = compiler.compile(template);

    expect(ret.obj).to.have.any.keys(['foo', 'bar', 'baz', 'qux']);
  });


});


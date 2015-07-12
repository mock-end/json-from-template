'use strict';

var expect = require('chai').expect;

describe('./lib/handlers/array.handle()', function () {

  var compiler = require('../../../lib');

  it('bare', function () {

    var template = {
      'arr1': [1, 2, 3],
      'arr2|': [1, 2, 3]
    };
    var ret = compiler.compile(template);

    expect(ret.arr1).to.eql([1, 2, 3]);
    expect(ret.arr2).to.eql([1, 2, 3]);
  });

  it('by count', function () {

    var template = {
      'arr1|0': [1, 2],
      'arr2|2': [1, 2]
    };
    var ret = compiler.compile(template);

    expect(ret.arr1.length).to.equal(0);
    expect(ret.arr2).to.eql([1, 2, 1, 2]);
  });

  it('by count with object', function () {

    var template = {
      'arr|2': [{
        foo: '@int(1,9)',
        bar: '@int(-9,-1)'
      }]
    };
    var ret = compiler.compile(template);

    expect(ret.arr.length).to.equal(2);
    expect(ret.arr[0].foo).to.be.at.least(1)
      .and
      .to.be.at.most(9);
    expect(ret.arr[1].foo).to.be.at.least(1)
      .and
      .to.be.at.most(9);
    expect(ret.arr[0].bar).to.be.at.least(-9)
      .and
      .to.be.at.most(-1);
    expect(ret.arr[1].bar).to.be.at.least(-9)
      .and
      .to.be.at.most(-1);
  });


  it('by range', function () {

    var template = {
      'arr1|2-2': [1, 2],
      'arr2|-.1-1': [1, 2]
    };
    var ret = compiler.compile(template);

    expect(ret.arr1).to.eql([1, 2, 1, 2]);
    expect(ret.arr2).to.eql([1, 2]);
  });
});


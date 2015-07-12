'use strict';

var expect = require('chai').expect;

describe('./lib/util', function () {

  var util = require('../../lib/util');

  it('.getType()', function () {
    expect(util.getType()).to.equal('');
    expect(util.getType(true)).to.equal('boolean');
    expect(util.getType('')).to.equal('string');
    expect(util.getType(1)).to.equal('number');
    expect(util.getType([])).to.equal('array');
    expect(util.getType({})).to.equal('object');
    expect(util.getType(function () {})).to.equal('function');
    expect(util.getType(/.*/g)).to.equal('regexp');

  });

  it('.hasKey()', function () {
    expect(util.hasKey({foo: 'foo'}, 'foo')).to.equal(true);
    expect(util.hasKey({foo: 'foo'}, 'bar')).to.equal(false);
    expect(util.hasKey(false, 'bar')).to.equal(false);

  });

  it('.isInt()', function () {
    expect(util.isInt({foo: 'foo'})).to.equal(false);
    expect(util.isInt(true)).to.equal(true);
    expect(util.isInt(false)).to.equal(true);
    expect(util.isInt('1')).to.equal(true);
    expect(util.isInt(1)).to.equal(true);
    expect(util.isInt(1.23)).to.equal(false);
    expect(util.isInt('a1')).to.equal(false);
    expect(util.isInt('1a')).to.equal(false);
  });

  it('.isFloat()', function () {
    expect(util.isFloat({foo: 'foo'})).to.equal(false);
    expect(util.isFloat(true)).to.equal(false);
    expect(util.isFloat(false)).to.equal(false);
    expect(util.isFloat('1.23')).to.equal(true);
    expect(util.isFloat(1)).to.equal(false);
    expect(util.isFloat(1.23)).to.equal(true);
    expect(util.isFloat('a1.23')).to.equal(false);
    expect(util.isFloat('1.23a')).to.equal(false);
  });

  it('.getPrecision()', function () {
    expect(util.getPrecision({foo: 'foo'})).to.equal(0);
    expect(util.getPrecision(true)).to.equal(0);
    expect(util.getPrecision(false)).to.equal(0);
    expect(util.getPrecision('1.23')).to.equal(2);
    expect(util.getPrecision(1)).to.equal(0);
    expect(util.getPrecision(1.23)).to.equal(2);
    expect(util.getPrecision('a1.23')).to.equal(2);
    expect(util.getPrecision('1.23a')).to.equal(3);
  });

  it('.getRange()', function () {

    var range1 = util.getRange({
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false
    });

    expect(range1.min).to.equal(0);
    expect(range1.max).to.equal(util.MAX_NUMBER);

    var range2 = util.getRange({
      iMin: 1,
      iMax: 10,
      dMin: false,
      dMax: false
    });

    expect(range2.min).to.equal(1);
    expect(range2.max).to.equal(10);

    var range3 = util.getRange({
      iMin: 100,
      iMax: 10,
      dMin: false,
      dMax: false
    });

    expect(range3.min).to.equal(10);
    expect(range3.max).to.equal(100);

    var range4 = util.getRange({
      iMin: 100,
      iMax: 10,
      dMin: false,
      dMax: false
    }, true);

    expect(range4.min).to.equal(0);
    expect(range4.max).to.equal(util.MAX_NUMBER);

  });

});


/* global describe, it */

'use strict';

var expect = require('chai').expect;

describe('./lib/rule', function () {

  var rule = require('../../lib/rule');


  var raw0 = '';

  it('parse("' + raw0 + '")', function () {
    expect(rule.parse(raw0, true)).to.eql({
      raw: raw0,
      key: '',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });

  var raw1 = 'key|1';

  it('parse("' + raw1 + '")', function () {
    expect(rule.parse(raw1, true)).to.eql({
      raw: raw1,
      key: 'key',
      step: false,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  // test cache
  var raw1_1 = 'key|1';

  it('parse("' + raw1_1 + '")', function () {
    expect(rule.parse(raw1_1)).to.eql({
      raw: raw1_1,
      key: 'key',
      step: false,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });



  var raw2 = 'key|+1';

  it('parse("' + raw2 + '")', function () {
    expect(rule.parse(raw2, true)).to.eql({
      raw: raw2,
      key: 'key',
      step: 1,
      count: 1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw3 = 'key|-1';

  it('parse("' + raw3 + '")', function () {
    expect(rule.parse(raw3, true)).to.eql({
      raw: raw3,
      key: 'key',
      step: -1,
      count: -1,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw4 = 'key|1.23';

  it('parse("' + raw4 + '")', function () {
    expect(rule.parse(raw4, true)).to.eql({
      raw: raw4,
      key: 'key',
      step: false,
      count: 1.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw4_1 = 'key|.23';

  it('parse("' + raw4_1 + '")', function () {
    expect(rule.parse(raw4_1, true)).to.eql({
      raw: raw4_1,
      key: 'key',
      step: false,
      count: 0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw4_2 = 'key|+.23';

  it('parse("' + raw4_2 + '")', function () {
    expect(rule.parse(raw4_2, true)).to.eql({
      raw: raw4_2,
      key: 'key',
      step: 0.23,
      count: 0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw5 = 'key|-1.23';

  it('parse("' + raw5 + '")', function () {
    expect(rule.parse(raw5, true)).to.eql({
      raw: raw5,
      key: 'key',
      step: -1.23,
      count: -1.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw5_1 = 'key|-.23';

  it('parse("' + raw5_1 + '")', function () {
    expect(rule.parse(raw5_1, true)).to.eql({
      raw: raw5_1,
      key: 'key',
      step: -0.23,
      count: -0.23,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw6 = 'key|1-99';

  it('parse("' + raw6 + '")', function () {
    expect(rule.parse(raw6, true)).to.eql({
      raw: raw6,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw7 = 'key|-1-99';

  it('parse("' + raw7 + '")', function () {
    expect(rule.parse(raw7, true)).to.eql({
      raw: raw7,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      isNegative: true,
      isFloat: false
    });
  });


  var raw8 = 'key|1-99.0-100';

  it('parse("' + raw8 + '")', function () {
    expect(rule.parse(raw8, true)).to.eql({
      raw: raw8,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: 0,
      dMax: 100,
      isNegative: false,
      isFloat: true
    });
  });


  var raw9 = 'key|1-99.-100';

  it('parse("' + raw9 + '")', function () {
    expect(rule.parse(raw9, true)).to.eql({
      raw: raw9,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: 100,
      isNegative: false,
      isFloat: true
    });
  });


  var raw10 = 'key|1-99.-';

  it('parse("' + raw10 + '")', function () {
    expect(rule.parse(raw10, true)).to.eql({
      raw: raw10,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: true
    });
  });


  var raw11 = 'key|1-99.';

  it('parse("' + raw11 + '")', function () {
    expect(rule.parse(raw11, true)).to.eql({
      raw: raw11,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: 99,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: true
    });
  });


  var raw12 = 'key|-99.-';

  it('parse("' + raw12 + '")', function () {
    expect(rule.parse(raw12, true)).to.eql({
      raw: raw12,
      key: 'key',
      step: false,
      count: false,
      iMin: 99,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: true,
      isFloat: true
    });
  });


  var raw13 = 'key|1-.-';

  it('parse("' + raw13 + '")', function () {
    expect(rule.parse(raw13, true)).to.eql({
      raw: raw13,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: true
    });
  });


  var raw14 = 'key|-.-';

  it('parse("' + raw14 + '")', function () {
    expect(rule.parse(raw14, true)).to.eql({
      raw: raw14,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: true,
      isFloat: true
    });
  });


  var raw15 = 'key';

  it('parse("' + raw15 + '")', function () {
    expect(rule.parse(raw15, true)).to.eql({
      raw: raw15,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw16 = 'key|';

  it('parse("' + raw16 + '")', function () {
    expect(rule.parse(raw16, true)).to.eql({
      raw: raw16,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw17 = 'key|a';

  it('parse("' + raw17 + '")', function () {
    expect(rule.parse(raw17, true)).to.eql({
      raw: raw17,
      key: 'key',
      step: false,
      count: false,
      iMin: false,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });


  var raw18 = 'key|1-';

  it('parse("' + raw18 + '")', function () {
    expect(rule.parse(raw18, true)).to.eql({
      raw: raw18,
      key: 'key',
      step: false,
      count: false,
      iMin: 1,
      iMax: false,
      dMin: false,
      dMax: false,
      isNegative: false,
      isFloat: false
    });
  });
});

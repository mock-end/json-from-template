'use strict';

var expect = require('chai').expect;

describe('./lib/handlers/number.handle()', function () {

  var compiler = require('../../../lib');

  it('handle number with `step` rule.', function () {

    var template = {
      'key0|+1': 1,
      'key1|-1': 1,
      'key2|+.2': 1,
      'key3|-0.2': 1
    };
    var ret = compiler.compile(template);

    expect(ret.key0).to.equal(1);
    expect(ret.key1).to.equal(1);
    expect(ret.key2).to.equal(1);
    expect(ret.key3).to.equal(1);

    ret = compiler.compile(template);
    expect(ret.key0).to.equal(2);
    expect(ret.key1).to.equal(0);
    expect(ret.key2).to.equal(1.2);
    expect(ret.key3).to.equal(0.8);

    ret = compiler.compile(template);
    expect(ret.key0).to.equal(3);
    expect(ret.key1).to.equal(-1);
    expect(ret.key2).to.equal(1.4);
    expect(ret.key3).to.equal(0.6);
  });


  it('handle number with `count` rule. Should equals to `0-count` rule.', function () {

    var template = {
      'key|10': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(0)
      .and
      .to.be.at.most(10);

  });

  it('handle number with `count` rule. Get float precision from template.', function () {

    var template = {
      'key|9': 1.23
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(0)
      .and
      .to.be.at.most(9)
      .and
      .to.match(/\d\.\d{1,2}/);

  });

  it('handle number with `iRange` rule.', function () {

    var template = {
      'key|1-100': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(1)
      .and
      .to.be.at.most(100);

  });

  it('handle number with `iRange` rule. Get an unchanged natural number.', function () {

    var template = {
      'key|1-1': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.equal(1);

  });

  it('handle number with `dRange` rule.', function () {

    var template = {
      'key|1-1.0-99': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(1.00)
      .and
      .to.be.at.most(1.99);

  });

  it('handle number with `dRange` rule.', function () {

    var template = {
      'key|1-1.10-99': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(1.10)
      .and
      .to.be.at.most(1.99).and.to.match(/1.\d{1,3}/);
  });

  it('handle number with `dRange` rule.', function () {

    var template = {
      'key|-1-1.10-99': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.be.at.least(-1.99)
      .and
      .to.be.at.most(-1.1).and.to.match(/-1.\d{1,3}/);
  });

  it('handle number with `dRange` rule.', function () {

    var template = {
      'key|-': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.equal(1);
  });

  it('handle number with `dRange` rule.', function () {

    var template = {
      'key|-.-': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.equal(1);
  });

  it('handle number with empty rule.', function () {

    var template = {
      'key|': 1
    };
    var ret = compiler.compile(template, null);

    expect(ret.key).to.equal(1);
  });
});

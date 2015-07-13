'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('./lib/handlers/boolean.handle()', function () {

  var compiler = require('../../../lib');

  it('boolean.handle()', function () {

    var template = {
      'boolean1': true,
      'boolean2|0': true,
      'boolean3|1-2': true,
      'boolean4|-.1-2': true,
      'boolean5|0-2': true,
      'boolean6|': true
    };
    var ret = compiler.compile(template);

    expect(ret.boolean1).to.equal(true);
    assert.typeOf(ret.boolean2, 'boolean');
    assert.typeOf(ret.boolean3, 'boolean');
    assert.typeOf(ret.boolean4, 'boolean');
    assert.typeOf(ret.boolean5, 'boolean');
    expect(ret.boolean6).to.equal(true);
  });


});


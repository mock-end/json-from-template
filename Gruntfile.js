/*
 * json-from-template
 *
 *
 * Copyright (c) 2014 bubkoo
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/**/*.js',
        'test/**/*/js'
      ]
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: true
        },
        src: ['test/']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');


  grunt.registerTask('test', ['mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

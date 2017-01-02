var webpackConfig = require('./webpack.config');
var WebpackKarmaDieHardPlugin = require('webpack-karma-die-hard');
var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-dom', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'test/unit.ts'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/unit.ts': ['webpack']
    },

    webpack: {
      module: {
        loaders: webpackConfig.module.loaders,
        preLoaders: webpackConfig.module.preLoaders,
        postLoaders: [{
          test: /\.ts/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'istanbul-instrumenter'
        }]
      },
      resolve: webpackConfig.resolve,
      tslint: webpackConfig.tslint,
      plugins: [ new WebpackKarmaDieHardPlugin() ]
    },

    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.json",
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'build/coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });

  if (process.env.CIRCLE_TEST_REPORTS) {
    console.log("Producing test artifacts for CircleCI.");
    config.reporters = config.reporters.concat(["junit"]);
    config.junitReporter = {
      outputDir: path.join(process.env.CIRCLE_TEST_REPORTS, "karma")
    };
  }
}

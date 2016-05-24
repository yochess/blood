exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  specs: ['test/*.js'],
  baseUrl: 'http://localhost:9001',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    realtimeFailure: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },
  multiCapabilities: [{
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict Chrome build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict Firefox build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'firefox',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict IE build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'internet explorer',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, /*
  // can't support automation in Opera until Selenium Opera Web Driver supports
  // async script execution.
  // See: https://github.com/angular/protractor/issues/226
  // See: https://github.com/operasoftware/operaprestodriver/issues/97
  {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict Opera build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'opera',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, */{
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict Safari build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'safari',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict iOS build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'iphone',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }, {
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'ng-pattern-restrict Android build ' + process.env.TRAVIS_BUILD_NUMBER,
    browserName: 'android',
    shardTestFiles: true,
    maxInstances: 5,
    seleniumVersion: '2.46.0'
  }]
};

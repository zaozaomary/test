// conf.js
'use strict';
var Jasmine2HtmlReporter = require('C:/Users/MARYMA01/AppData/Roaming/npm/node_modules/protractor-jasmine2-html-reporter');
var myReport = require('./integrate-testrail/report');
exports.config = {
  framework: 'jasmine2',
  directConnect: true,
  specs: ['cases/regression/WC2TC1102-*.js'], 
  //specs: ['cases/regression/WC2TC1103-*.js'], 
  //specs: ['cases/regression/WC2TC1116-*.js'], 
  //specs: ['cases/regression/WC2TC1103-Create New Claim.js','cases/regression/WC2TC1105-*.js'],
  //specs: ['cases/regression/WC2TC1102-Create New Preliminary.js','cases/regression/WC2TC1104-*.js'],
  //SELENIUM_PROMISE_MANAGER: false,
  //specs: ['cases/regression/WC2TC1106-*.js','cases/regression/WC2TC1116-*.js'],   
  //specs: ['cases/regression/WC2TC1101-*.js'], 
  //specs: ['cases/regression/WC2TC1100-*.js'],
  //specs: ['cases/regression/WC2TC1112-*.js'],
  //specs: ['cases/regression/WC2TC1115-*.js'],
  //specs: ['cases/regression/WC2TC1117-*.js'],
  //specs: ['cases/regression/WC2TC1107-*.js'],
  //specs: ['cases/regression/WC2TC0732-*.js'],
  baseUrl: 'https://claims-int.signintra.com/',
  capabilities: {
    'browserName': 'chrome',
    'proxyType': 'manual',
    'httpProxy': 'http://proxy2.de.signintra.com:80'
  },
  onPrepare: function() {
    global.gCommonUse = require('./common-use/common-use');
    global.gCommonControls = require('./common-controls/common-controls');
    global.gLoginArgs = require('./common-use/login.args');
    global.gYAML = require('C:/Users/MARYMA01/AppData/Roaming/npm/node_modules/yamljs');
    //var sysLogin = require('./common-use/syn-login');
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter(
      {
        savePath: 'report/',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures:true,
        screenshotsFolder:'images',
        cleanDestination: true

      }));   
     browser.driver.manage().window().maximize();
  
     
    var deferred = protractor.promise.defer();
     var promise = deferred.promise;
     gLoginArgs.defaultLogin().then(function() {
      deferred.fulfill('complete!');
     });
     return promise;
 
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval : 500000
  }
};

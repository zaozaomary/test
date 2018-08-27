
var api = require('./testRail_api');
var totalSuit = 4;
var tag = 1;
var myReporter = {
    jasmineStarted: async function(suiteInfo) {
       console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
       await api.init();
       await api.createMilestone();
       await api.createTestRun_custom();

    },
    suiteStarted:  function(result) {
      console.log('Suite started: ' + result.description );     
    },
    specStarted: function(result) {
        console.log('Spec started: ' + result.description);
   },
   specDone: async function(result) {
   console.log('Spec: ' + result.description + ' was ' + result.status);
    for(var i = 0; i < result.failedExpectations.length; i++) {
      console.log('Failure: ' + result.failedExpectations[i].message);
      }
    await api.loadResultsArgs(result.description,result.status);
    
    },
    suiteDone: async function(result) {
        console.log('Suite: ' + result.description + ' was ' + result.status);
    for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('*error:' + result.failedExpectations[i].message);   
    }

    if(tag == totalSuit) {
     await api.addResults();
    }
    tag++;  
   },
   jasmineDone:  function(done) {
    console.log('Finished suite');
   
  }
};
module.exports = myReporter;
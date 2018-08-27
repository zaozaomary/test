var testRailAPIs = function() {
    var testRail = null;
    this.init = async function() {
      var TestRail = require('C:/Users/MARYMA01/AppData/Roaming/npm/node_modules/protractor-testrail-promise');
      testRail = await new TestRail('https://dbschenker.testrail.io/',webclaimArgs.loginArgs.username,webclaimArgs.loginArgs.password);
    }

    this.createTestRun_custom = async function() {
        await testRail.addRunCustome(webclaimArgs.projectID,webclaimArgs.suitID,webclaimArgs.runName,webclaimArgs.testRunDescription,
        webclaimArgs.milestoneID,webclaimArgs.caseIDs).then(function (result) {
        console.log(result);
        var jsonResult = eval('(' + result + ')');
        console.log(jsonResult.id);
        webclaimArgs.runID = jsonResult.id;
      });
    }

    this.createMilestone = async function() {
      var dueTime =  convertStringTime_timeStamp(webclaimArgs.milestoneDueTime);
      var startTime = convertStringTime_timeStamp(webclaimArgs.milestoneStartTime);
      await testRail.addMilestone(webclaimArgs.projectID,webclaimArgs.milestoneName,webclaimArgs.milestoneDescription,startTime,dueTime).then(function (result) {
        console.log(result);
        var jsonResult = eval('(' + result + ')');
        console.log(jsonResult.id);
        webclaimArgs.milestoneID = jsonResult.id;
      });
    }

      this.getMilestoneID = function() {
        console.log('last result:'+webclaimArgs.milestoneID);
        return  webclaimArgs.milestoneID;
      }
    

    function convertStringTime_timeStamp(timeString) {
      var newStr = timeString.replace(/-/g,'/');
      var date = new Date(newStr)
      var humanDate = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()));
      var timeStamp = humanDate.getTime()/1000;
      return timeStamp;
    }

    this.loadResultsArgs = async function(caseDescription,caseStatus) {
    if(caseDescription.indexOf('-') == -1) {
      return;
    }
     var tempID = caseDescription.split('-')[0];
     var caseID = parseInt(tempID.substring(1));
     var statusID = 5;
     if(caseStatus == 'passed') {
        statusID = 1;
     }
     var t = {};
     t.case_id = caseID;
     t.status_id = statusID;
     t.comment = '';
     webclaimArgs.testResults.push(t);
    }

    this.addResults =async function() {
      var temp = {};
      temp.results = webclaimArgs.testResults;
      await testRail.addResultsForCases(webclaimArgs.runID,temp).then(function (result) {
        console.log(result);
      });

    }
    this.testAddResult = function() {
     var temp = {'results': [{'case_id':332,'status_id':1,'comment':'aabbcc'},
    {'case_id':335,'status_id':1,'comment':'auto test'},
    {'case_id':336,'status_id':5,'comment':'9900'}]}
      testRail.addResultsForCases(264,temp).then(function (result) {
        console.log(result);
      });
    }

    this.getResults = function() {
      var temp = JSON.stringify(webclaimArgs.testResults);
      console.log(temp);
     return webclaimArgs.testResults;
    }   

}

var webclaimArgs = {
  loginArgs: {username:'mary-m.ma@dbschenker.com',password:'Abmc%001'},
  projectID: '4',
  suitID: '3',
  milestoneID: '77',
  milestoneName: 'automation milestone',
  milestoneStartTime: '2018-08-14',
  milestoneDueTime: '2018-09-02',
  milestoneDescription: 'create a milestone automatically',
  runName: 'RegressionTest _INT_2018.15_Run 01',
  runID: '264',
  testRunDescription: 'create a test run automatically',
  caseIDs: ['313','315','316','317','318','319','320','321','322','323','324','325','326','327','328',
  '329','330','331','332','333','334','335','336','337','338','344','345','346','347','348','349','350'],
  testResults : []
}
module.exports = new testRailAPIs();
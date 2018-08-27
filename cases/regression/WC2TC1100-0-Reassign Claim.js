
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var reassignedDialog = require('../../pages/reassign.dialog');
var claimTaskTab = require('../../pages/claim-tasks.tab');

describe('WC2TC1100', function() {


  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    await claimPageArgs.SetManagingOfficeName('nanjing');
    await claimPageArgs.Save();
    });
   
   it('C349-Reassign claim', async function() {
    await newClaimPage.ReassignTool.click();
    await reassignedDialog.ReassignOffice('hangzhou branch');
    // change to tasks to confirm the reassign
    await newClaimPage.TasksTab.click();
    await claimTaskTab.AcceptAssignedClaim('Assigned Claim','Mary Ma');
    // check the reassigned office
    await newClaimPage.ClaimTab.click();
    var manageOffice = await newClaimPage.GetManagingOffice();
    await expect(manageOffice.getText()).toContain('Hangzhou')
  
   });

  

});

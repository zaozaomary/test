//WC2TC1101-Variant 1-Reassignment Request is Rejected by User
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var reassignedDialog = require('../../pages/reassign.dialog');
var claimTaskTab = require('../../pages/claim-tasks.tab');
var overviewPage = require('../../pages/overview.page');
describe('WC2TC1101', function() {
    //var claimReference = '18CNHGH00643';

    beforeAll(async function () {
      await overviewPage.RefreshOverview();
      await claimPageArgs.SetManagingOfficeName('nanjing');
      await claimPageArgs.Save();
      //await overviewPage.SelectRowByClaimReference(claimReference);
      });
     
     it('C345-Request is Rejected by User', async function() {
      await newClaimPage.ReassignTool.click();
      await reassignedDialog.ReassignOffice('hangzhou branch');
      // change to tasks to confirm the reassign
      await newClaimPage.TasksTab.click();
      await claimTaskTab.RejectAssignedClaim('Assigned Claim','Mary Ma');
      await newClaimPage.ClaimTab.click();
      // check whether can reassign 
      await newClaimPage.ReassignTool.click();
      //await browser.sleep(2000);
      await expect(reassignedDialog.IsReassigned()).toBe(false);
      await reassignedDialog.CloseBtn.click();
      // check the reassigned office
      
      var manageOffice = await newClaimPage.GetManagingOffice();
      await expect(manageOffice.getText()).toContain('Nanjing')
    
    
     });
  
    
  
  });
//WC2TC1101-Variant 3-Cancelled by User after Reassignment
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var reassignedDialog = require('../../pages/reassign.dialog');
var claimTaskTab = require('../../pages/claim-tasks.tab');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1101', function() {

    beforeAll(async function () {
      await overviewPage.RefreshOverview();
      await claimPageArgs.SetManagingOfficeName('nanjing');
      await claimPageArgs.Save();
      });
     
     it('C347-Cancelled by User after Reassignment', async function() {
      await newClaimPage.ReassignTool.click();
      await reassignedDialog.ReassignOffice('hangzhou branch');
      // cancel the reassign
      await newClaimPage.ReassignTool.click();
      await browser.wait(ExpectedConditions.visibilityOf(reassignedDialog.CancelBtn),3000);
      await reassignedDialog.CancelBtn.click();
      await browser.wait(ExpectedConditions.invisibilityOf(reassignedDialog.CancelBtn),3000);
      // check the reassigned office
      await newClaimPage.TasksTab.click();
      var status = await claimTaskTab.GetTask_IconType('Assigned Claim','Mary Ma');
      await expect(status).toBe('cancelled');
      await newClaimPage.ClaimTab.click();
      var manageOffice = await newClaimPage.GetManagingOffice();
      await expect(manageOffice.getText()).toContain('Nanjing')
    
    
     });
  
    
  
  });
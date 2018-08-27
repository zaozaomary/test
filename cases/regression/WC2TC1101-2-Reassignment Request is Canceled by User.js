//WC2TC1101-Variant 2-Reassignment Request is Canceled by User

var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var reassignedDialog = require('../../pages/reassign.dialog');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1101', function() {
    beforeAll(async function () {
      await overviewPage.RefreshOverview();
      await claimPageArgs.SetManagingOfficeName('nanjing');
      await claimPageArgs.Save();
      //await overviewPage.SelectRowByClaimReference(claimReference);
      });
     
     it('C346-Request is Canceled by User', async function() {
      await newClaimPage.ReassignTool.click();
      await reassignedDialog.ReassignOffice_Close('Wuhan Branch');
     
      // check whether can reassign 
      await newClaimPage.ReassignTool.click();
      await browser.wait(ExpectedConditions.visibilityOf(reassignedDialog.CloseBtn),3000);
      await expect(reassignedDialog.IsReassigned()).toBe(false);
      await reassignedDialog.CloseBtn.click();
      // check the reassigned office
      var manageOffice = await newClaimPage.GetManagingOffice();
      await expect(manageOffice.getText()).toContain('Nanjing');
     });
  
    
  
  });
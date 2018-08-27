//WC2TC1101-Reassign Claim/Preliminary Unsuccessfully
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var reassignedDialog = require('../../pages/reassign.dialog');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1101', function() {

    beforeAll(async function () {
      await overviewPage.RefreshOverview();
      await claimPageArgs.SetManagingOfficeName('nanjing');
      await claimPageArgs.Save();    
      });
     
     it('C344-Reassign claim Unsuccessfully', async function() {
      await newClaimPage.ReassignTool.click();
      await reassignedDialog.ReassignOffice('hangzhou branch');
      await newClaimPage.ReassignTool.click();
      await expect(reassignedDialog.IsReassigned()).toBe(true);
      
    
     });
     afterAll(async function() {
      await reassignedDialog.CloseBtn.click();
     })
     
  
    
  
  });
  
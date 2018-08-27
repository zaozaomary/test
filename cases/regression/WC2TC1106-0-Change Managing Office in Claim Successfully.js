//var commonUse = require("../../common-use/common-use");
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');

describe('WC2TC1106', function() {
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    await browser.sleep(2000);
    await claimPageArgs.Save();
    //await browser.sleep(3000);
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    claimReference = await newClaimPage.GetClaimReference();
    claimReferenceContext.ReferenceClaimID = claimReference; 
    });
 
    var claimReference = '';
    it('C321-Change Managing office to a claim',async function() {
     await gCommonUse.Overview();
     await overviewPage.SelectRowByClaimReference(claimReference);
     await newClaimPage.SelectManagingOffice('shenzhen');
     await newClaimPage.Save();
     //await browser.sleep(3000);
     await gCommonControls.WaitUntilPanel_Invisable(3000);
      // check
     var manageOffice = await newClaimPage.GetManagingOffice();
     await expect(manageOffice.getText()).toContain('Shenzhen')
      
    });

  })


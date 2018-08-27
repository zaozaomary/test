// WC2TC1106-Variant 3-Changing Managing Office to Different Legal Entity

var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');

describe('WC2TC1106-3', function() {
  beforeAll(async function () {  
    //claimReferenceContext.ReferenceClaimID ='18CNHGH00713';
    await overviewPage.RefreshOverview();  
    await overviewPage.SelectRowByClaimReference(claimReferenceContext.ReferenceClaimID);
    await gCommonControls.WaitUntilPanel_Invisable(2000);
    });
     
    //var claimReference = claimReferenceContext.ReferenceClaimID;
    it('C324-Changing Managing Office to Different Legal Entity',async function() {
    var tipElement1 = await newClaimPage.SelectUnexistedManagingOffice('aachen');
    await expect(tipElement1.getText()).toBe('Nothing Found');
    await browser.sleep(1000);
    await browser.actions().mouseMove(newClaimPage.ClaimTab).click().perform();
    await browser.sleep(1000);
 
    });

  })
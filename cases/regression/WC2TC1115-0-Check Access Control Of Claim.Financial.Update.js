// WC2TC1115-Check Access Control Of Claim.Financial.Update

var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');

describe('WC2TC1115', function() {
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    await claimPageArgs.SetManagingOfficeName('nanjing');
    await claimPageArgs.Save();
    await browser.sleep(3000);
    var claimReference = await newClaimPage.GetClaimReference();
    claimReferenceContext.ReferenceClaimID = claimReference;
    });
 
    it('C327-Check Access Control Of Claim.Financial.Update',async function() {
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectPolicy('AXA FFL 2018');
   
    await newClaimPage.InputClaimedAmount('300');
    await gCommonUse.BrowserScrollBy(600);
    await newClaimPage.SetExpectedRecovery('400');
    await newClaimPage.SetSettlementCode('Goodwill');
    await newClaimPage.SetRecoveryCode('Fully recovered');
    await newClaimPage.InputFinancialRemarks('AutoTest 123');
    await newClaimPage.Save();
    await browser.sleep(3000);
    await gCommonUse.BrowserScrollTo(0);
    // check if has error tips
    var tag = await gCommonControls.CloseAboveTips();
    await expect(tag).toBeFalsy();

    });

  })
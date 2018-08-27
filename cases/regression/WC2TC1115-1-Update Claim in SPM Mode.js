//WC2TC1115-Variant 1-Update Claim in SPM Mode

var newClaimPage = require('../../pages/new-claim.page');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');

describe('WC2TC1115', function() {
  beforeAll(async function () {
    await gLoginArgs.switchUser('TCACN004');
    await overviewPage.PreliminaryUnchecked();
    await browser.sleep(2000);
    await overviewPage.ClaimChecked();
    await browser.sleep(2000);
    //var claimReference = '18CNHGH00467';
    await overviewPage.SelectRowByClaimReference(claimReferenceContext.ReferenceClaimID);

    });
  
    it('C328-Without the permission of claim.financial.update',async function() {
    await gCommonUse.BrowserScrollBy(200);

    var isEnabled = await newClaimPage.IsPolicyEnabled();
    await expect(isEnabled).toBeFalsy();
    await gCommonUse.BrowserScrollBy(400);
    await expect(newClaimPage.IsClaimedAmountEnabled()).toBeFalsy();
    await gCommonUse.BrowserScrollBy(600);
    await expect(newClaimPage.IsExpectedRecoveryEnabled()).toBeFalsy();
    await gCommonUse.BrowserScrollBy(200);
    await expect(newClaimPage.IsSettlementCodeEnabled()).toBeFalsy();
    await expect(newClaimPage.IsRecoveryCodeEnabled()).toBeFalsy();
    await expect(newClaimPage.IsFinancialRemarksEnabled()).toBeFalsy();


    
    });

  })
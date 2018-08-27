// WC2TC1106-Variant 2-Changing Managing Office of Claim with Unavailable Policy
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');

describe('WC2TC1106-2', function() {
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    await overviewPage.SelectRowByClaimReference(claimReferenceContext.ReferenceClaimID);
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    });
 
   // var claimReference = claimReferenceContext.ReferenceClaimID;
    it('C333-Change Managing office to a claim',async function() {
      // set office 'chengdu' has no policy
    await newClaimPage.SelectManagingOffice('chengdu');
    await expect(newClaimPage.IsContainPolicyList('Auto Test Policy')).toBeFalsy();

    await gCommonUse.BrowserScrollBy(200);
    // check
    var futureDate = gCommonUse.GetAfterFormatDate(1);
    var tip = await newClaimPage.LossDateInputError(futureDate);
    await expect(tip.getAttribute('class')).toContain('invalid');

    // return back, discard it 
    await newClaimPage.DiscardTool.click();
    await gCommonControls.WaitUntilPanel_Invisable(4000);
    });

  })
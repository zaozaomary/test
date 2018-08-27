var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var closeClaimTip = require('../../pages/close-claim-tip.dialog');
var OverviewPage = require('../../pages/overview.page')


describe('WC2TC1112', function() {

    beforeAll(async function () {
      await OverviewPage.RefreshOverview();
      await claimPageArgs.SaveAllFields();
      });
     
      it('C336-Close Claim with All Fields Successfully', async function() {
        await newClaimPage.CloseClaimTool.click();
        var warningTip = $('.alert.alert-warning>div>span');
        await browser.wait(ExpectedConditions.visibilityOf(warningTip,3000));
        // add transport date,damaged pieces,damaged weight,settlement code
        await gCommonUse.BrowserScrollBy(200);
        var date = gCommonUse.GetBeforeFormatDate(11);
        await newClaimPage.SelectTransportDate(date);

        await newClaimPage.SaveTool.click();
        await closeClaimTip.CloseButton.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        // check claim status in claim
        await gCommonUse.BrowserScrollTo(250);
        await expect(newClaimPage.GetProcessingStatus()).toBe('File closed');
        await gCommonUse.Overview();
        // check claim status in table
        var statusItem = await OverviewPage.GetSpecificRowColumn(1,2);
        await expect(statusItem.getText()).toBe('File closed');
      
       });
  
    
  });
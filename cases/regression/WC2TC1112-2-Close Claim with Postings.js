var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var closeClaimTip = require('../../pages/close-claim-tip.dialog');
var postingTab = require('../../pages/posting.tab');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1112', function() {

    var claimReference = '';  
    afterAll(async function () { 
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      })
      
    beforeAll(async function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 3200000;
      await overviewPage.RefreshOverview();
      await claimPageArgs.Save();
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel,4000));

      claimReference = await newClaimPage.GetClaimReference(); 
      await newClaimPage.PostingTab.click();
      await postingTab.PayMoneyTo('Claimant',2000,'Cheque');
      await browser.sleep(2000);
      await postingTab.PayMoneyTo('Claimant',200,'Cheque');   
      await overviewPage.RefreshOverview();
      await browser.sleep(2000);
      await overviewPage.SelectRowByClaimReference(claimReference);
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel,4000));
      });
     
     it('C337-Close Claim with Postings', async function() {
        await newClaimPage.CloseClaimTool.click();
        var warningTip = $('.alert.alert-warning>div>span');
        await browser.wait(ExpectedConditions.visibilityOf(warningTip,3000));
        // add transport date,damaged pieces,damaged weight,settlement code
        await gCommonUse.BrowserScrollBy(200);
        var date = gCommonUse.GetBeforeFormatDate(11);
        await newClaimPage.SelectTransportDate(date);
        await gCommonUse.BrowserScrollBy(250);
        await newClaimPage.DamagePiecesInput('2');
        await newClaimPage.DamageWeightInput('30');
        await gCommonUse.BrowserScrollBy(600);
        await newClaimPage.SetSettlementCode('Partly settled');
  
        await newClaimPage.SaveTool.click();
        await closeClaimTip.CloseButton.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        // check claim status in claim
        await gCommonUse.BrowserScrollTo(250);
        await expect(newClaimPage.GetProcessingStatus()).toBe('File closed');
        await gCommonUse.Overview();
        // check claim status in table
        var statusItem = await overviewPage.GetSpecificRowColumn(1,2);
        await expect(statusItem.getText()).toBe('File closed');
    
     });
 
  });
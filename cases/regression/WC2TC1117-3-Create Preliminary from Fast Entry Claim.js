// WC2TC1117-Variant 3-Create Preliminary from Fast Entry Claim
var fastEntryArgs = require('../../common-use/new-fast-entry.args');
var fastEntryClaim = require('../../pages/fast-entry-claim.page');
var overviewPage = require('../../pages/overview.page');
var newClaimPage = require('../../pages/new-claim.page');

describe('WC2TC1117', function() {
  beforeAll(async function() {
    await overviewPage.RefreshOverview();
    await gCommonUse.NewFastEntry();
    await fastEntryArgs.SetClaimedAmount(300);
    await fastEntryArgs.CreatFastEntry();
    await fastEntryClaim.CreatePreliminaryBtn.click();
    await fastEntryClaim.CreatePreliminaryOK();
    await browser.sleep(3000);
    await overviewPage.RefreshOverview();
    await browser.sleep(2000);
    await overviewPage.SelectFirstRow();
  });


  
  it('C332-Create Preliminary from Fast Entry Claim', async function() {
     // manage office
     var manageOffice = await newClaimPage.GetManagingOffice();
     await expect(manageOffice.getText()).toContain(fastEntryArgs.GetManagingOfficeNameText());
     // order date
     await gCommonUse.BrowserScrollBy(300);
     var orderDate = newClaimPage.GetOrderDate();
     await expect(orderDate).toBe(fastEntryArgs.GetOrderDateText()); 
     // transport date
     var transportDate = newClaimPage.GetTransportDate();
     await expect(transportDate).toBe(fastEntryArgs.GetTransportDateText());
     // goods code
     await gCommonUse.BrowserScrollTo(100);
     await expect(newClaimPage.GetGoodsCode()).toBe(fastEntryArgs.GetGoodsCodeText());
     // transport mode 
     await gCommonUse.BrowserScrollBy(200);
     await expect(newClaimPage.GetTransportMode()).toBe(fastEntryArgs.GetTransportModeText());
     // claimant
     var claimant = await newClaimPage.GetClaimant();
     await expect(claimant.getText()).toContain(fastEntryArgs.GetClaimantText());
     // consignor
     var consignor = await newClaimPage.GetConsignor();
     await expect(consignor.getText()).toContain(fastEntryArgs.GetConsignorText());
     await  await gCommonUse.BrowserScrollBy(300);
     // conveyor
     var conveyor = await newClaimPage.GetConveyor();
     await expect(conveyor.getText()).toContain(fastEntryArgs.GetConveyorText());

     
 
  });
    
})
// WC2TC1117-Variant 1-Refuse Fast Entry Claim
var fastEntryArgs = require('../../common-use/new-fast-entry.args');
var fastEntryClaim = require('../../pages/fast-entry-claim.page');
var overviewPage = require('../../pages/overview.page');
var newClaimPage = require('../../pages/new-claim.page');
var postingTab = require('../../pages/posting.tab');


describe('WC2TC1117', function() {
  beforeAll(async function() {
    await overviewPage.RefreshOverview();
    await gCommonUse.NewFastEntry();
    await fastEntryArgs.SetClaimedAmount(199);
    await fastEntryArgs.CreatFastEntry();
    await fastEntryClaim.RefuseBtn.click();
    await browser.sleep(3000);
    await overviewPage.SelectFirstRow();
  });

  
  it('C330-Refuse Fast Entry Claim', async function() {
      // manage office
      var manageOffice = await newClaimPage.GetManagingOffice();
      await expect(manageOffice.getText()).toContain(fastEntryArgs.GetManagingOfficeNameText());
      // processing status
      await gCommonUse.BrowserScrollBy(200);
      await expect(newClaimPage.GetProcessingStatus()).toBe('File closed');
      await gCommonUse.BrowserScrollBy(150);
      // received date
      var currentDateStr = gCommonUse.GetBeforeFormatDate(0);
      await expect(newClaimPage.GetReceivedDate()).toBe(currentDateStr);
      await gCommonUse.BrowserScrollBy(100);
      // confirmed date
      await  expect(newClaimPage.GetConfirmedDate()).toBe(currentDateStr);
      await gCommonUse.BrowserScrollBy(200);
      // order date
      await expect(newClaimPage.GetOrderDate()).toBe(fastEntryArgs.GetOrderDateText());
      // transport date
      await expect(newClaimPage.GetTransportDate()).toBe(fastEntryArgs.GetTransportDateText());
      // place of damage
      await gCommonUse.BrowserScrollBy(400);
     await expect(newClaimPage.GetPlaceOfDamage()).toContain('Unknown Claim Fast Enrtry');
     // kind of damage
     await expect(newClaimPage.GetKindOfDamage()).toContain('Unknown Claim Fast Enrtry');
     // reason for damage 
      await gCommonUse.BrowserScrollBy(100);
     await expect(newClaimPage.GetReasonOfDamage()).toContain('Unknown Claim Fast Enrtry');
     // goods code
     await gCommonUse.BrowserScrollTo(50);
     await expect(newClaimPage.GetGoodsCode()).toContain('Fast Entry Goods Code');
     // transport mode
     await gCommonUse.BrowserScrollBy(300);
     await expect(newClaimPage.GetTransportMode()).toBe(fastEntryArgs.GetTransportModeText());
     //  claim parties
     await gCommonUse.BrowserScrollTo(100);
     var claimParty = await newClaimPage.GetClaimant();
     await expect(claimParty.getText()).toContain(fastEntryArgs.GetClaimantText());
     // claim office 
     var claimOffice = await newClaimPage.GetClaimOffice();
     await expect(claimOffice.getText()).toContain('Aachen');
     await gCommonUse.BrowserScrollBy(250);
     // responsible office 
     var responsibleOffice = await newClaimPage.GetResponsibleOffice();
     await expect(responsibleOffice.getText()).toContain('Aachen');
     await gCommonUse.BrowserScrollBy(300);
     // principal
     var principal = await newClaimPage.GetPrincipal();
     await expect(principal.getText()).toContain(fastEntryArgs.GetClaimantText());
     await gCommonUse.BrowserScrollBy(200);
     // consignor
     var consignor = await newClaimPage.GetConsignor();
     await expect(consignor.getText()).toContain(fastEntryArgs.GetConsignorText());
     await gCommonUse.BrowserScrollBy(300);
     // conveyor
     var conveyor = await newClaimPage.GetConveyor();
     await expect(conveyor.getText()).toContain('Aachen');
  
     await gCommonUse.BrowserScrollTo(50);
     // currency
     await expect(newClaimPage.GetCurrency()).toContain('EURO');
     // policy
     await expect(newClaimPage.GetPolicy()).toBe(fastEntryArgs.GetPolicyText());
     await gCommonUse.BrowserScrollBy(450);
     // Liability
     await expect(newClaimPage.GetMaxLiability()).toBe(fastEntryArgs.GetClaimedAmountText());
     await gCommonUse.BrowserScrollBy(200);
     // claim amount
     await expect(newClaimPage.GetClaimedAmount()).toBe(fastEntryArgs.GetClaimedAmountText());
     // settlement code 
     await gCommonUse.BrowserScrollBy(600);
     await expect(newClaimPage.GetSettlementCode()).toBe('Refused - Clean Receipt');
     // convert to posting
     await gCommonUse.BrowserScrollTo(0);
     await newClaimPage.PostingTab.click();
     var number = await postingTab.GetCurrentRowNumbers();
     await expect(number).toBe(0);
  
  });
    
})

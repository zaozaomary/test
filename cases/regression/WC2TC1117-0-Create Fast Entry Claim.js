//Create Fast Entry Claim.js 
var fastEntryClaim = require('../../pages/fast-entry-claim.page');
var overviewPage = require('../../pages/overview.page');
var newClaimPage = require('../../pages/new-claim.page');
var postingTab = require('../../pages/posting.tab');


describe('WC2TC1117', function() {
  beforeAll(async function() {
    await overviewPage.RefreshOverview();
  });


  
  it('C329-Create Fast Entry Claim', async function() {
    await gCommonUse.NewFastEntry();
    await fastEntryClaim.SelectManagingOffice('aachen');
    var orderDate = gCommonUse.GetBeforeFormatDate(35);
    await gCommonUse.BrowserScrollBy(100);
    await fastEntryClaim.OrderDateInput(orderDate);
    var transportDate = gCommonUse.GetBeforeFormatDate(25);
    await fastEntryClaim.TransportDateInput(transportDate);
    // input dates
    var consignorName = 'Aachener Tanzclub';
    await fastEntryClaim.SelectConsignor(consignorName);
    await gCommonUse.BrowserScrollBy(200);
    var claimantName = 'Aachener allround';
    await fastEntryClaim.SelectClaimant(claimantName);
    await gCommonUse.BrowserScrollTo(50);
    await fastEntryClaim.SelectTransportMode('Intermodal');
    await fastEntryClaim.ClaimedAmountInput('200');
    var policyName = 'AXA FFL 2018';
    await fastEntryClaim.SelectPolicy(policyName);

    await fastEntryClaim.DefaultCreatePostingDoc();
    await fastEntryClaim.UncheckedCreateLetter();
    await fastEntryClaim.SettleBtn.click();
    await browser.sleep(3000);

    await overviewPage.SelectFirstRow();
    // check properties
    //claim confirmed date = current date, claim received date = current date
    // manage office
    var manageOffice = await newClaimPage.GetManagingOffice();
    await expect(manageOffice.getText()).toContain('Aachen');
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
    await expect(newClaimPage.GetOrderDate()).toBe(orderDate);
    // transport date
    await expect(newClaimPage.GetTransportDate()).toBe(transportDate);
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
   await expect(newClaimPage.GetTransportMode()).toBe('Intermodal');
   //  claim parties
   await gCommonUse.BrowserScrollTo(100);
   var claimParty = await newClaimPage.GetClaimant();
   await expect(claimParty.getText()).toContain(claimantName);
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
   await expect(principal.getText()).toContain(claimantName);
   await gCommonUse.BrowserScrollBy(200);
   // consignor
   var consignor = await newClaimPage.GetConsignor();
   await expect(consignor.getText()).toContain(consignorName);
   await gCommonUse.BrowserScrollBy(300);
   // conveyor
   var conveyor = await newClaimPage.GetConveyor();
   await expect(conveyor.getText()).toContain('Aachen');

   await gCommonUse.BrowserScrollTo(50);
   // currency
   await expect(newClaimPage.GetCurrency()).toContain('EURO');
   // policy
   await expect(newClaimPage.GetPolicy()).toBe(policyName);
   await gCommonUse.BrowserScrollBy(450);
   // Liability
   await expect(newClaimPage.GetMaxLiability()).toBe('200');
   await gCommonUse.BrowserScrollBy(200);
   // claim amount
   await expect(newClaimPage.GetClaimedAmount()).toBe('200');
   // settlement code 
   await gCommonUse.BrowserScrollBy(600);
   await expect(newClaimPage.GetSettlementCode()).toBe('Fully settled');
   // convert to posting
   await gCommonUse.BrowserScrollTo(0);
   await newClaimPage.PostingTab.click();
   var status = await postingTab.GetClaimPostingStatus('Claimant Credit','200');
   await expect(status).toBe('Approved');


   
    
   
  });
    

})

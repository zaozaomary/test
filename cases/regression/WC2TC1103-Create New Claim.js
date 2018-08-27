// Create New Claim With Mandatory Fields Successfully
var loginArgs = require("../../common-use/login.args");
var newClaimPage = require('../../pages/new-claim.page');
var claimReferenceContext = require('../../common-use/static-context');
var overview = require('../../pages/overview.page');


describe('WC2TC1103', function() {
  beforeAll(async function () {
    //await loginArgs.defaultLogin();
    });
    var lossDate = gCommonUse.GetBeforeFormatDate(16);
    var reminderDate = gCommonUse.GetAfterFormatDate(5);
    var timebarDate = gCommonUse.GetAfterFormatDate(110);

   it('C316-Create New Claim With Mandatory Fields Successfully', async function() {
    await gCommonUse.NewClaim();
    await newClaimPage.SelectManagingOffice('hangzhou branch');
    // input dates
    await gCommonUse.BrowserScrollBy(200);
  
    await newClaimPage.LossDateInput(lossDate);
    await newClaimPage.ReminderDateInput(reminderDate);
    await newClaimPage.TimebarDateInput(timebarDate);
    // loss information
    await newClaimPage.SelectPlaceOfDamage('Domestic Terminal - inbound'); 
    await gCommonUse.BrowserScrollBy(100);
    await newClaimPage.SelectKindOfDamage('Delay');
    await newClaimPage.SelectReasonOfDamage('Missing deadline');
    // Goods information
    await gCommonUse.BrowserScrollTo(50);
    // it must close the tips that above the top. because they are cover the interface
    await newClaimPage.CloseTopTips();
    await newClaimPage.SelectGoodsCode('Building material, Goods out of Stone, cement');
    // transport mode
    await gCommonUse.BrowserScrollBy(350);
    await newClaimPage.SelectTransportMode('Maritime');
    // claim parties
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.SelectClaimant('hangzhou');
    await newClaimPage.SelectClaimOffice('hangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectResponsibleOffice('hangzhou')
    
    // transport parties
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectPrincipal('hangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectConsignor('hangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectConveyor('hangzhou');
    // Policy
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.SelectPolicy('PolicyTestData');
    // 
    await gCommonUse.BrowserScrollBy(450);
    await newClaimPage.InputMaxLiability(200);
    await newClaimPage.InputClaimedAmount(250);
    await gCommonUse.BrowserScrollBy(400);
    await newClaimPage.InputInitialProvision(100);

    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.Save();
    await browser.sleep(2000);
    claimReferenceContext.ReferenceClaimID = await newClaimPage.GetClaimReference();
    // back to overview and check characters
    await gCommonUse.Overview();
    await overview.SelectRowByClaimReference(claimReferenceContext.ReferenceClaimID);
     // manage office
     var manageOffice = await newClaimPage.GetManagingOffice();
     await expect(manageOffice.getText()).toContain('Hangzhou')
     // loss date
     await gCommonUse.BrowserScrollBy(200);
     var dateValue = newClaimPage.GetLossDate();
     await expect(dateValue).toBe(lossDate);
     // reminder date
     await gCommonUse.BrowserScrollBy(100);
     var reminderDateInput = newClaimPage.GetReminderDate();
     await expect(reminderDateInput).toBe(reminderDate);
     // timebar date
     var timebarDateInput = newClaimPage.GetTimebarDate();
     await expect(timebarDateInput).toBe(timebarDate);
    // place of damage
    await gCommonUse.BrowserScrollBy(100);
    var placeDamage = await newClaimPage.GetPlaceOfDamage();
    await expect(placeDamage).toBe('Domestic Terminal - inbound');
    // kind of damage
    var kindDamage = newClaimPage.GetKindOfDamage();
    await expect(kindDamage).toBe('Delay');
    // reason for damage 
    var reasonDamage = newClaimPage.GetReasonOfDamage();
    await expect(reasonDamage).toBe('Missing deadline');
    // goods code
    await gCommonUse.BrowserScrollTo(100);
    var goodsCode = newClaimPage.GetGoodsCode();
    await expect(goodsCode).toBe('Building material, Goods out of Stone, cement');
    // transport mode
    await gCommonUse.BrowserScrollBy(200);
    var transportMode = newClaimPage.GetTransportMode();
    await expect(transportMode).toBe('Maritime');
    //  claim parties
    await gCommonUse.BrowserScrollTo(100);
    var claimParty = await newClaimPage.GetClaimant();
    await expect(claimParty.getText()).toContain('HANGZHOU');
    // claim office 
    var claimOffice = await newClaimPage.GetClaimOffice();
    await expect(claimOffice.getText()).toContain('Hangzhou');
    await gCommonUse.BrowserScrollBy(250);
    // responsible office 
    var responsibleOffice = await newClaimPage.GetResponsibleOffice();
    await expect(responsibleOffice.getText()).toContain('Hangzhou');
    await gCommonUse.BrowserScrollBy(200);
    // principal
    var principal = await newClaimPage.GetPrincipal();
    await expect(principal.getText()).toContain('HANGZHOU');
    await gCommonUse.BrowserScrollBy(200);
    // consignor
    var consignor = await newClaimPage.GetConsignor();
    await expect(consignor.getText()).toContain('HANGZHOU');
    await gCommonUse.BrowserScrollBy(300);
    // conveyor
    var conveyor = await newClaimPage.GetConveyor();
    await expect(conveyor.getText()).toContain('Hangzhou');
 
    await gCommonUse.BrowserScrollTo(50);
    await expect(newClaimPage.GetCurrency()).toContain('CHINA YUAN');
    await expect(newClaimPage.GetPolicy()).toBe('PolicyTestData');
    await gCommonUse.BrowserScrollBy(400);
    await expect(newClaimPage.GetMaxLiability()).toBe('200');
    await gCommonUse.BrowserScrollBy(200);
    await expect(newClaimPage.GetClaimedAmount()).toBe('250');
    });


})

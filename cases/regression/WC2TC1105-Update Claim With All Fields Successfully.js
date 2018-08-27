// WC2TC1105-Update Claim With All Fields Successfully

var loginArgs = require("../../common-use/login.args");
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var claimReferenceContext = require('../../common-use/static-context');
describe('WC2TC1105', function() {

  var claimReference = '18CNHGH00700';

  beforeAll(async function () {
    claimReference = await claimReferenceContext.ReferenceClaimID;
    await gCommonUse.Overview();
    });
   
   it('C317-Update Claim With All Fields Successfully', async function() {
    await overviewPage.SelectRowByClaimReference(claimReference);
    await browser.sleep(3000);
    // input dates
    var lossDate = gCommonUse.GetBeforeFormatDate(16);
    var reminderDate = gCommonUse.GetAfterFormatDate(5);
    var timebarDate = gCommonUse.GetAfterFormatDate(110);
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.LossDateInput(lossDate);
    await newClaimPage.ReminderDateInput(reminderDate);
    await newClaimPage.TimebarDateInput(timebarDate);
    // loss information
    await newClaimPage.SelectPlaceOfDamage('Fair Ground'); 
    await gCommonUse.BrowserScrollBy(100);
    await newClaimPage.DamagePiecesInput('2');
    await newClaimPage.DamageWeightInput('20');
    await newClaimPage.SelectKindOfDamage('Damage - Obvious');
    await newClaimPage.SelectReasonOfDamage('Wrong Delivery');
    // Goods information
    await gCommonUse.BrowserScrollTo(50);
    // it must close the tips that above the top. because they are cover the interface
    await newClaimPage.CloseTopTips();
    await newClaimPage.SelectGoodsCode('Chemicals');
    // transport mode
    await gCommonUse.BrowserScrollBy(450);
    await newClaimPage.SelectFreightTerm('AutoTest FreightTerm');
    await newClaimPage.SelectTransportMode('Rail');
    // claim parties
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.ModifyClaimant('hangzhou');
    await newClaimPage.ModifyClaimOffice('hangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.ModifyResponsibleOffice('hangzhou')
      
    // transport parties
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.ModifyPrincipal('guangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.ModifyConsignor('guangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.ModifyConveyor('guangzhou');
    // Policy
    await gCommonUse.BrowserScrollTo(50);
    await gCommonUse.BrowserScrollBy(450);
    await newClaimPage.InputMaxLiability(100);
    await newClaimPage.InputClaimedAmount(350);

    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.Save();
    // ******* check all properties ***************
     // loss date
     await gCommonUse.BrowserScrollBy(200);
     var dateValue = newClaimPage.GetLossDate();
     await expect(dateValue).toBe(lossDate);
     // reminder date
     await gCommonUse.BrowserScrollBy(100);
     var acturalReminderDate = newClaimPage.GetReminderDate();
     await expect(acturalReminderDate).toBe(reminderDate);
     // timebar date
     var acturalTimebarDate = newClaimPage.GetTimebarDate();
     await expect(acturalTimebarDate).toBe(timebarDate);
    // place of damage
    await gCommonUse.BrowserScrollBy(100);
    var placeDamage = await newClaimPage.GetPlaceOfDamage();
    await expect(placeDamage).toBe('Fair Ground');
    // damage pieces
    await expect(newClaimPage.GetDamagePieces()).toBe('2');
    // damage weight 
    await expect(newClaimPage.GetDamageWeight()).toContain('20');
    // kind of damage
    var kindDamage = newClaimPage.GetKindOfDamage();
    await expect(kindDamage).toBe('Damage - Obvious');
    // reason for damage 
    var reasonDamage = newClaimPage.GetReasonOfDamage();
    await expect(reasonDamage).toBe('Wrong Delivery');
    // goods code
    await gCommonUse.BrowserScrollTo(100);
    var goodsCode = newClaimPage.GetGoodsCode();
    await expect(goodsCode).toBe('Chemicals');    
    await gCommonUse.BrowserScrollBy(200);
    // Freight term
    await expect(newClaimPage.GetFreightTerm()).toBe('AutoTest FreightTerm');
    // transport mode
    var transportMode = newClaimPage.GetTransportMode();
    await expect(transportMode).toBe('Rail');
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
    await expect(principal.getText()).toContain('GUANGZHOU');
    await gCommonUse.BrowserScrollBy(200);
    // consignor
    var consignor = await newClaimPage.GetConsignor();
    await expect(consignor.getText()).toContain('GUANGZHOU');
    await gCommonUse.BrowserScrollBy(300);
    // conveyor
    var conveyor = await newClaimPage.GetConveyor();
    await expect(conveyor.getText()).toContain('Guangzhou');
 
    await gCommonUse.BrowserScrollTo(450);
    await expect(newClaimPage.GetMaxLiability()).toBe('100');
    await gCommonUse.BrowserScrollBy(200);
    await expect(newClaimPage.GetClaimedAmount()).toBe('350');
    
   });

  

});

//WC2TC1112-Variant 3-Close Claim with Additional Mandatory Fields
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var closeClaimTip = require('../../pages/close-claim-tip.dialog');
var OverviewPage = require('../../pages/overview.page');
var adminSearch = require('../../common-use/admin-search');
var legalEntitySetting = require('../../pages/legal-entity-setting.page')

describe('WC2TC1112', function() {

    var claimReference = '';  
    beforeAll(async function () {
      await gLoginArgs.switchUser('LINJIAN3');
      await gCommonUse.AdminMenuSetting('Legal Entity Settings');
      await adminSearch.LegalEntitySearch('SCHENKER CHINA LTD.');
      await browser.sleep(3000);
      await legalEntitySetting.FieldTab.click();
      await legalEntitySetting.SelectFieldFromTable('Freight Term','Claim - Closed');
      await legalEntitySetting.SelectFieldFromTable('Incoterm','Claim - Closed');
      var tag = await legalEntitySetting.SaveBtnClick();
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
      if(tag) {
        await gCommonUse.UpdateData();
      } 
      });
     
     it('C338-Close Claim with Additional Mandatory Fields', async function() {
      await claimPageArgs.Save();
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
      await newClaimPage.CloseClaimTool.click();
      var warningTip = $('.alert.alert-warning>div>span');
      await browser.wait(ExpectedConditions.visibilityOf(warningTip,3000));
      // add transport date,damaged pieces,damaged weight,settlement code
      await gCommonUse.BrowserScrollBy(200);
      var date = gCommonUse.GetBeforeFormatDate(11);
      await newClaimPage.SelectTransportDate(date);
      await newClaimPage.SelectIncoTerm('AutoTest Incoterm');
      await newClaimPage.SelectFreightTerm('AutoTest FreightTerm');
      await gCommonUse.BrowserScrollBy(250);
      await newClaimPage.DamagePiecesInput('2');
      await newClaimPage.DamageWeightInput('30');
      await gCommonUse.BrowserScrollBy(800);
      await newClaimPage.SetSettlementCode('Partly settled');

      await newClaimPage.SaveTool.click();
      await closeClaimTip.CloseButton.click();
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
      // check claim status in claim
      await gCommonUse.BrowserScrollTo(250);
      await expect(newClaimPage.GetProcessingStatus()).toBe('File closed');
      await OverviewPage.RefreshOverview();
      // check claim status in table
      var statusItem = await OverviewPage.GetSpecificRowColumn(1,2);
      await expect(statusItem.getText()).toBe('File closed');
        
     });

     afterAll(async function () {
      await gCommonUse.AdminMenuSetting('Legal Entity Settings');
      await adminSearch.LegalEntitySearch('SCHENKER CHINA LTD.');
      await browser.sleep(3000);
      await legalEntitySetting.FieldTab.click();
      await legalEntitySetting.SelectFieldFromTable('Freight Term','No');
      await legalEntitySetting.SelectFieldFromTable('Incoterm','No');
      var tag = await legalEntitySetting.SaveBtnClick();
      await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
      if(tag) {
        await gCommonUse.UpdateData();
      } 

     })
  
    
  
  });
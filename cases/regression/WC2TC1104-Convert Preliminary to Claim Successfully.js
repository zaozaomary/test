// Convert Preliminary to Claim
//var gCommonUse = require("../../common-use/common-use");
var newClaimPage = require('../../pages/new-claim.page');
var claimReferenceResult = require('../../pages/search.page');
var claimReferenceContext = require('../../common-use/static-context');
var overviewPage = require('../../pages/overview.page');
//var gCommonControls = require('../../common-controls/common-controls');


describe('WC2TC1104', function() {
  //claimReferenceContext.PreliminaryID = '18CNNKG00373';
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    });

   it('C326-Convert Preliminary to Claim Successfully', async function() {  
    await overviewPage.PersonalChecked();
    await overviewPage.PreliminaryChecked();
    await overviewPage.SelectRowByClaimReference(claimReferenceContext.PreliminaryID);
    /*var firstRow = $('[ng-table="claimTableParams"]').$('tbody>tr:first-child>td:first-child');
    await browser.wait(ExpectedConditions.visibilityOf(firstRow,5000));
    await firstRow.click();*/
    //await browser.wait(ExpectedConditions.elementToBeClickable(newClaimPage.ConvertToClaimTool,5000));
    await newClaimPage.ConvertToClaim();
    await gCommonUse.BrowserScrollBy(500);
    await newClaimPage.SelectPlaceOfDamage('Cross docking Terminal'); 
    await gCommonUse.BrowserScrollBy(100);
    await newClaimPage.SelectKindOfDamage('Damage - Concealed');
    await newClaimPage.SelectReasonOfDamage('Fire');
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.SelectGoodsCode('Apples');
    await gCommonUse.BrowserScrollBy(350);
    await newClaimPage.SelectTransportMode('Intermodal');
    // claim parties
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.SelectClaimant('guangzhou');
    await newClaimPage.SelectClaimOffice('guangzhou');
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectResponsibleOffice('guangzhou')   
    // transport parties
    await gCommonUse.BrowserScrollBy(200);
    await newClaimPage.SelectPrincipal('hangzhou');
    await gCommonUse.BrowserScrollBy(500);
    await newClaimPage.SelectConveyor('hangzhou');
    // Policy
    await gCommonUse.BrowserScrollTo(50);
    await newClaimPage.SelectPolicy('PolicyTestData');
    // 
    await gCommonUse.BrowserScrollBy(450);
    await newClaimPage.InputMaxLiability(250);
    await newClaimPage.InputClaimedAmount(300);
    await gCommonUse.BrowserScrollBy(400);
    await newClaimPage.InputInitialProvision(100);

    await gCommonUse.BrowserScrollTo(0);
    await newClaimPage.Save();
    await browser.sleep(2000);
    var claimReference = await newClaimPage.GetClaimReference();
    // search claim reference 
    await gCommonUse.SearchClaim();
    await gCommonControls.SearchItemControlManage(1);
    await gCommonControls.SearchItemControlInput('Claim Reference','equals',claimReference);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetClaimReferenceFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(claimReference);

   });

})
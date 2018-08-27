var loginArgs = require("../../common-use/login-args");
var commonUse = require("../../common-use/common-use");
var newClaimPage = require('../../pages/newClaim-page');
var claimPageArgs = require('../../common-use/newClaim-args');
var overviewPage = require('../../pages/overview-page');

describe('test', function() {
  beforeAll(async function () {
    await loginArgs.defaultLogin();
    await browser.sleep(2000);
    await claimPageArgs.SetManagingOfficeName('nanjing');
    await claimPageArgs.Save();
    claimReference = await newClaimPage.GetClaimReference();
    await commonUse.Overview();
    });

  var claimReference = '';
  beforeEach(async function() {
    var url = browser.baseUrl +'overview';
    await browser.get(url,6000);
  });
  

    it('add new incident to a claim',async function() {
     await overviewPage.SelectRowByClaimReference(claimReference);
     var incidentName = 'AutoTest:' + commonUse.GetAfterFormatDate(0);
     await newClaimPage.AddNewIncident(incidentName);
     // var ID = await newClaimPage.GetClaimReference();
     await browser.sleep(2000);
     await commonUse.BrowserScrollBy(60);
     var claimIncidentName = await newClaimPage.GetIncidentNameElement();
     // check points
     await expect(claimIncidentName.getText()).toBe(incidentName);
    });

    it('select existed incident to a claim',async function() {
      await overviewPage.SelectRowByClaimReference(claimReference);    
      await newClaimPage.SelectExistedIncident('test');
      await browser.sleep(2000);
      await commonUse.BrowserScrollBy(100);
      var claimIncidentName = await newClaimPage.GetIncidentNameElement();
      // check points
      await expect(claimIncidentName.getText()).toBe('test');
      /*var  assignIncidentTool = element(by.buttonText('Assign Incident'));
      await browser.wait(ExpectedConditions.elementToBeClickable(assignIncidentTool,5000));
      await assignIncidentTool.click();
      var searchButton = element(by.buttonText('Search'));
      var resultElement = $('#found');
      await browser.wait(ExpectedConditions.elementToBeClickable(searchButton,5000));
      await searchButton.click();       
      await browser.wait(ExpectedConditions.visibilityOf(resultElement,5000));
      var temp = await element.all(by.repeater('t in datas').column('description'));
      await  browser.actions().mouseMove(temp[2]).doubleClick().perform();
      await browser.sleep(5000);*/
     });


});
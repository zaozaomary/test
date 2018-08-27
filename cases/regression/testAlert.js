var loginArgs = require("../../common-use/login-args");
var commonUse = require("../../common-use/common-use");
var newClaimPage = require('../../pages/newClaim-page');
var claimPageArgs = require('../../common-use/newClaim-args');
var overviewPage = require('../../pages/overview-page');
var claimReferenceContext = require('../../common-use/staticContext');

describe('test', function() {
  beforeAll(async function () {
    await loginArgs.defaultLogin();
    await browser.sleep(2000);
    });
 
    var claimReference = '18CNHGH00439';
    it('Change Managing office to a claim',async function() {
     await commonUse.Overview();
     await overviewPage.SelectRowByClaimReference(claimReference);
     await browser.sleep(3000);
     var EC = protractor.ExpectedConditions;
     // Waits for an alert pops up.
     await browser.wait(EC.alertIsPresent(), 5000);
     await browser.switchTo().alert().accept();

      
    });

  })
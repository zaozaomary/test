//login-spec.js 
var loginPage = require('../../pages/login-page');
//var commonUse = require('../../common-use/common-use');

describe('test login', function() {
  beforeAll(async function() {
    await loginPage.open();
    await browser.sleep(9000); //must add this,because the web jumps to different urls.
  });

  afterEach(async function() {
    await gCommonUse.Logout();
    await browser.sleep(4000);
  });
    
  
  it('Linjian login should be succeed', async function() {
    await loginPage.setUsername('LINJIAN3');
    await loginPage.setPassword('Pasword04.');
    await loginPage.submission();
    await browser.wait(ExpectedConditions.presenceOf(loginPage.HomeElement()),9000);
    await expect(loginPage.HomeElement().getText()).toBe("WebClaims");
    });

  it('mary login should be succeed', async function() {
    await loginPage.setUsername('MARYMA01');
    await loginPage.setPassword('Abmc%003');
    await loginPage.submission();
    await browser.wait(ExpectedConditions.presenceOf(loginPage.HomeElement()),5000);
    await expect(loginPage.HomeElement().getText()).toBe("WebClaims");
    });
   





   /*var originalTimeout;
    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 34000;
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });*/



}
)
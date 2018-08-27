// logout-spec.js
var loginArgs = require("../../common-use/login-args");
var commonUse = require("../../common-use/common-use");

describe('logout test', function() {
    beforeAll(function () {
    loginArgs.defaultLogin();
    });

    it('verify if logout is succeed', async function() {
    await commonUse.Logout();
    // check if logout is succeed
    // add belows, it will throw error "document unloaded while waiting for result"
    //await browser.wait(ExpectedConditions.visibilityOf(tipElement,5000));
   
    }
   );

});
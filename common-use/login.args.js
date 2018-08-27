//login-args.js
var loginPage = require("../pages/login.page");
//var gCommonUse = require('../common-use/common-use');


var LoginArgs = function() {
    this.defaultLogin = async function() {
        await loginPage.open();
        await browser.sleep(10000); //must add this,because the web jumps to different urls.
        await loginPage.setUsername('MARYMA01');
        await loginPage.setPassword(USERS.MARYMA01);
        await loginPage.submission();
        await browser.wait(ExpectedConditions.presenceOf(loginPage.HomeElement()),10000);
    };
    this.othersLogin = async function (name) {
        var password = USERS[name];
        await loginPage.open();
        await browser.sleep(10000); //must add this,because the web jumps to different urls.
        await loginPage.setUsername(name);
        await loginPage.setPassword(password);
        await loginPage.submission();
        await browser.wait(ExpectedConditions.presenceOf(loginPage.HomeElement()),10000);
    }
    this.switchUser = async function(userName) {
        var password = USERS[userName];
        await gCommonUse.Logout();
        await browser.sleep(3000);
        await loginPage.setUsername(userName);
        await loginPage.setPassword(password);
        await loginPage.submission();
        await browser.wait(ExpectedConditions.presenceOf(loginPage.HomeElement()),6000);

    }
};

var USERS = {
    MARYMA01: 'Abmc%002',
    LINJIAN3: 'Pasword04.',
    TCADE001: '-rU17e?t',
    TCACN001: 'Huf?X2U%',
    TCACN004: 'fSw7U?bX',
    TCACN005: 'RX9/MFo!',
    TCATH001: 'Password01.',
    TCAVN002: 'Password01.',
    TCVTH002: '*Mjnt5%g',
    TNODEF01: 'Password01.',
    TNODEV01: 'Password01.',
    TSUCN001: 'Password01.',
    TSUTH001: 'Password01.',
    TSUVNTHC: 'qmS2?3yc',
    TWCLCORP: 'Password10.',
    TWCLSUM1: 'Password01.'
};

module.exports = new LoginArgs();

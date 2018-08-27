// Changing Managing Office of Claim with Multiple Payments

//var gLoginArgs = require("../../common-use/login-args");
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var postingTab = require('../../pages/posting.tab');
var postingPage = require('../../pages/posting.page');

describe('WC2TC1106-1', function() {

  var claimReference = '';
  var originalTimeout;

  beforeAll(async function () {   
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 3200000;
    });

  afterAll(async function () { 
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })
    
  beforeEach(async function() {
    await overviewPage.RefreshOverview();
    await claimPageArgs.Save();
    claimReference = await newClaimPage.GetClaimReference();
    await overviewPage.SelectRowByClaimReference(claimReference);

    await gCommonControls.WaitUntilPanel_Invisable(3000);

    await newClaimPage.PostingTab.click();
    await postingTab.PayMoneyTo('Claimant',2000,'Cheque');
    //await browser.sleep(2000);
    await postingTab.PayMoneyTo('Claimant',1501,'Cheque');

    await gLoginArgs.switchUser('LINJIAN3');
    //await browser.sleep(2000);
    await overviewPage.OfficeChecked();
    await overviewPage.SelectRowByClaimReference(claimReference);
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    await newClaimPage.PostingTab.click();  
    await postingTab.SelectPostingByTypeAmount('Claimant Credit','2000');
    await browser.sleep(3000);
    await postingPage.ApproveBtn.click();
    await browser.sleep(4000);
    await gLoginArgs.switchUser('MARYMA01');
    })
   
   it('C322-Changing Managing Office of Claim with Multiple Payments', async function() {
    //await browser.sleep(2000);
    await overviewPage.SelectRowByClaimReference(claimReference);
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    await newClaimPage.SelectManagingOffice('shenzhen branch');
    await newClaimPage.Save();
    await gCommonControls.WaitUntilPanel_Invisable(3000);
     // check
    var manageOffice = await newClaimPage.GetManagingOffice();
    await expect(manageOffice.getText()).toContain('Shenzhen');
    await newClaimPage.PostingTab.click();
    await postingTab.SelectPayMoneyTo('Claimant');
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    await expect(postingPage.CostCenter.getAttribute('title')).toContain('Shenzen');

   });


})
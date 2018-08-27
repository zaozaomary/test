// WC2TC0732-Post a Claimant Payment Requiring Level 4 direct L3 Approval
var newClaimPage = require('../../pages/new-claim.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var overviewPage = require('../../pages/overview.page');
var postingTab = require('../../pages/posting.tab');
var postingPage = require('../../pages/posting.page');
var permissionPage = require('../../pages/permission.page');

describe('WC2TC0732', function() {
    var claimReference = '';
    var originalTimeout;
  
    beforeAll(async function () {   
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 3200000;
        await gLoginArgs.switchUser('LINJIAN3');
        await permissionPage.GrantPermission('TCACN004','L2 Approver - Role to allow users to do an level 2 approval','SCHENKER CHINA LTD');
        await gLoginArgs.switchUser('MARYMA01');
        await claimPageArgs.SetManagingOfficeName('nanjing');
        await claimPageArgs.Save();
        claimReference = await newClaimPage.GetClaimReference();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        });
    
      afterAll(async function () { 
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        })
     
     it('C313-Payment Requiring Level 4 direct L3 Approval', async function() {
        await newClaimPage.PostingTab.click();
        await postingTab.PayMoneyTo('Claimant',5000,'Cheque');
        //await browser.sleep(2000);
        await postingTab.PayMoneyTo('Claimant',8000,'Cheque');
        // switch user of level 2
        await gLoginArgs.switchUser('TCACN004');
        await browser.sleep(2000);
        await overviewPage.SelectRowByClaimReference(claimReference);
        await newClaimPage.PostingTab.click();  
        await postingTab.SelectPostingByTypeAmount('Claimant Credit','5000');
        //await browser.sleep(3000);
        await postingPage.ApproveBtn.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await postingPage.BackBtn.click(); 
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await postingTab.SelectPostingByTypeAmount('Claimant Credit','8000');
        await expect(postingPage.ApproveBtn.getAttribute('disabled')).toBe('true');
        // switch user of level 4
        await gLoginArgs.switchUser('LINJIAN3');
        await browser.sleep(2000);
        await overviewPage.SelectRowByClaimReference(claimReference);
        await newClaimPage.PostingTab.click();  
        await postingTab.SelectPostingByTypeAmount('Claimant Credit','8000');
        await postingPage.ApproveBtn.click();
     })

     afterAll(async function() {
      await permissionPage.DeletePermission('TCACN004','L2 Approver - Role to allow users to do an level 2 approval');
      await gLoginArgs.switchUser('MARYMA01');
     })

    

        
    
  
  });
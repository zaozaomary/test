// Search claims with invalid data
var claimReferenceResult = require('../../pages/search.page');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1116-1', function() {
    beforeAll(async function () {
        await overviewPage.RefreshOverview();
    
    });

    it('C334-Quick claim reference search with invalid data', async function() {
        var testClaimReference = '18CNNKG000000156';
        await gCommonUse.SearchClaim();
        await gCommonControls.SearchItemControlManage(1);
        await gCommonControls.SearchItemControlInput('Claim Reference','equals',testClaimReference);
        await claimReferenceResult.SearchButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
        var actualReferenceRowCount = await claimReferenceResult.GetTotalRowsFromClaimTable();
        await expect(actualReferenceRowCount).toEqual(0);   
        
        var testPostingNumber = '16SEGOT00392-35';
        await gCommonUse.SearchPosting();
        await gCommonControls.SearchItemControlManage(1);
        await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
        await claimReferenceResult.SearchButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
        var actualReferenceRowCount = await claimReferenceResult.GetTotalRowsFromPostingTable();
        await expect(actualReferenceRowCount).toEqual(0);    
       } );

       afterAll(async function() {
           await gLoginArgs.switchUser('MARYMA01');
       })

    
    })

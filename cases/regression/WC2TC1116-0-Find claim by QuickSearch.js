// Search claims with valid data
var claimReferenceResult = require('../../pages/search.page');

describe('WC2TC1116', function() {
  beforeAll(async function () {
    await gLoginArgs.switchUser('LINJIAN3');
    await gCommonUse.SearchClaim();
    await gCommonControls.SearchItemControlManage(1);
    });

   it('C333-Find claim by QuickSearch', async function() {
    var testClaimReference = '18CNNKG00156';
    await gCommonControls.SearchItemControlInput('Claim Reference','equals',testClaimReference);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetClaimReferenceFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testClaimReference);
    await console.log('Find claim reference:'+testClaimReference+',succeed!');

    testClaimReference = '12FRPAR100003';
    await gCommonControls.SearchItemControlInput('Claim Reference','equals',testClaimReference);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetClaimReferenceFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testClaimReference);
    await console.log('Find claim reference:'+testClaimReference+',succeed!');

    await gCommonUse.SearchPosting();
    await gCommonControls.SearchItemControlManage(1);
    var testPostingNumber = '18DEAAH00148-01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);
    await console.log('Find posting number:'+testPostingNumber+',succeed!');

    testPostingNumber = '18DEAAH00148-01-P01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);

    testPostingNumber = '17SE091-07-0001';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);

    testPostingNumber = '18DEAAH00104-03-C01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);

   } );

  /*
   xit('Quick search claim reference with valid data', async function() {
    var testClaimReference = 'D/61/15/000001';
    await gCommonControls.SearchItemControlInput('Claim Reference','equals',testClaimReference);
    // check if the result exists
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetClaimReferenceFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testClaimReference);
   } );
  
   it('Quick search posting number with valid data', async function() {
    await gCommonUse.SearchPosting();
    await gCommonControls.SearchItemControlManage(1);
    var testPostingNumber = '18DEAAH00148-01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    // check if the result exists 
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);
   } );

   it('Quick search posting number with valid data', async function() {
    var testPostingNumber = '18DEAAH00148-01-P01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    // check if the result exists 
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);
   } );

   it('Quick search posting number with valid data', async function() {
    var testPostingNumber = '17SE091-07-0001';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    // check if the result exists 
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);
   } );

   it('Quick search posting number with valid data', async function() {
    var testPostingNumber = '18DEAAH00104-03-C01';
    await gCommonControls.SearchItemControlInput('Number','equals',testPostingNumber);
    // check if the result exists 
    await claimReferenceResult.SearchButton.click();
    await browser.wait(ExpectedConditions.visibilityOf(claimReferenceResult.SearchButton,5000));
    var actualReferenceElement = await claimReferenceResult.GetPostingNumberFromTable(1);
    await expect(actualReferenceElement.getText()).toBe(testPostingNumber);
   } );*/

})
// WC2TC1100-Variants 1-Reassign GBS Claim to Office Which is Same with Managing Office
var permissionPage = require('../../pages/permission.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var gbsReassign_dialog = require('../../pages/gbs-reassign.dialog');
var overviewPage = require('../../pages/overview.page');
var claimTaskTab = require('../../pages/claim-tasks.tab');
var newClaimPage = require('../../pages/new-claim.page');

describe('WC2TC1100', function() {
  beforeAll(async function() {
    await gLoginArgs.switchUser('LINJIAN3');
    await permissionPage.GrantPermission('MARYMA01','GBS User - GBS User','SCHENKER CHINA LTD');
    await gLoginArgs.switchUser('MARYMA01');
    await claimPageArgs.SetManagingOfficeName('nanjing');
    await claimPageArgs.Save();
    claimReference = await newClaimPage.GetClaimReference();
    });

   var claimReference = '';
   it('C350-Reassign GBS Claim to Office Which is Same with Managing Office', async function() {
    await newClaimPage.ReassignTool.click();
    await gbsReassign_dialog.ReassignOffice('guangzhou');
    await gLoginArgs.switchUser('LINJIAN3');
    await overviewPage.OfficeChecked();
    await overviewPage.SelectRowByClaimReference(claimReference);
    await gCommonControls.WaitUntilPanel_Invisable(3000);
    await newClaimPage.TasksTab.click();
    await claimTaskTab.AcceptAssignedClaim('Reassign From Create Office','Mary Ma');
    await overviewPage.RefreshOverview();
    var isGBS = await overviewPage.CheckGBSClaim(claimReference);
    await expect(isGBS).toEqual(false);

  
   } );

   afterAll(async function() {
     await permissionPage.DeletePermission('MARYMA01','GBS User - GBS User');
     await gLoginArgs.switchUser('MARYMA01');


   });
})
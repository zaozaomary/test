// Create New Preliminary With Mandatory Fields Successfully

var newClaimPage = require('../../pages/new-claim.page');
var claimReferenceContext = require('../../common-use/static-context');
var overviewPage = require('../../pages/overview.page');

describe('WC2TC1102', function() {
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    });
   var path = './test-date/claim/preliminary-default-fields.yaml';
   var data = gCommonUse.getDate_from_YAML(path);
   var lossDateText = gCommonUse.GetFormatDate(data.lossDate);
   var reminderDateText = gCommonUse.GetFormatDate(data.reminderDate);
   var timebarDateText =  gCommonUse.GetFormatDate(data.timebarDate);
   it('C315-Create New preliminary With Mandatory Fields Successfully', async function() {
    await gCommonUse.NewPreliminary();
    await newClaimPage.SelectManagingOffice(data.managingBranch);
    await newClaimPage.CloseTopTips();
    // input dates
    await gCommonUse.BrowserScrollBy(200);  
    await newClaimPage.LossDateInput(lossDateText);  
    await newClaimPage.ReminderDateInput(reminderDateText);
    await gCommonUse.BrowserScrollBy(100);
    await newClaimPage.TimebarDateInput(timebarDateText);

    await gCommonUse.BrowserScrollTo(50);   
    // transport parties
    await newClaimPage.SelectConsignor(data.consignor);
    await newClaimPage.Save();
    await browser.sleep(2000);
    claimReferenceContext.PreliminaryID = await newClaimPage.GetClaimReference();
    // back to overview and check characters
    await gCommonUse.Overview();
    await overviewPage.SelectRowByClaimReference(claimReferenceContext.PreliminaryID);
     // manage office
     var manageOffice = await newClaimPage.GetManagingOffice();
     await expect(manageOffice.getText()).toContain('nanjing');
     // loss date
     await gCommonUse.BrowserScrollBy(200);
     var dateValue = newClaimPage.GetLossDate();
     await expect(dateValue).toBe(lossDateText);
     // reminder date
     await gCommonUse.BrowserScrollBy(100);
     var reminderDate = newClaimPage.GetReminderDate();
     await expect(reminderDate).toBe(reminderDateText);
     // timebar date
     var timebarDate = newClaimPage.GetTimebarDate();
     await expect(timebarDate).toBe(timebarDateText);
     // consignor
    var consignor = await newClaimPage.GetConsignor();
    await expect(consignor.getText()).toContain('HANGZHOU');
    }
   );

});


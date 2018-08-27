// fastEntryClaim-page.js
var financialDocDlg = require('../pages/finance-doc.dialog');
var FastEntryClaimPage = function()  {
    var settleBtn = element(by.buttonText('Settle'));
    var refuseBtn = element(by.buttonText('Refuse'));
    var cancelBtn = element(by.buttonText('Cancel'));
    var createLetterChecked = element(by.model('vm.createLetter'));
    var createPreliminaryBtn = $('[tooltip="Create Preliminary"]');

    this.SettleBtn = settleBtn;
    this.RefuseBtn = refuseBtn;
    this.CancelBtn = cancelBtn;
    this.CreatePreliminaryBtn = createPreliminaryBtn;
    this.CheckedCreateLetter = async function() {
        var isChecked = false;
        await createLetterChecked.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(!isChecked) {
          var label = createLetterChecked.$('label');
          await label.click();
        }      
    }

    this.UncheckedCreateLetter = async function() {
        var isChecked = false;
        await createLetterChecked.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(isChecked) {
          var label = createLetterChecked.$('label');
          await label.click();
        }      
    }
    // Tab
    var tabs = $$('.nav.nav-tabs');
    var claimTab = tabs.get(0);
    var transportTab = tabs.get(1);
    var documentsTab = tabs.get(2);

     // ***** general setting ******//
     var managingOfficeBox = element(by.model('claim.managingBranch'));
     // search branch elements
     this.SelectManagingOffice = async function(name) {
        await gCommonControls.SelectModifyPartyBox(managingOfficeBox,name);
    }
    this.GetManagingOffice = async function() {
       var boxElement = await gCommonControls.GetPartyBoxName(managingOfficeBox);
       return boxElement;
    }
    // order date
    var orderDateInput = $('[ng-model="claim.transport.orderDate"][ng-required="required.orderDate"]').$('div>div>input'); 
    this.OrderDateInput = async function(orderDate) {
        await orderDateInput.clear();
        await orderDateInput.sendKeys(orderDate);
    }
    this.GetOrderDate =  function() {
        return orderDateInput.getAttribute('value');
    }
    // transport date
    var transportDateInput = $('[ng-model="claim.transport.transportDate"][ng-required="true"]').$('div>div>input');
    this.TransportDateInput = async function(transportDate) {
        await transportDateInput.clear();
        await transportDateInput.sendKeys(transportDate);
    }
    this.GetOrderDate =  function() {
        return transportDateInput.getAttribute('value');
    }
     // ***** claimant ********//
    var claimantBox = element(by.model('vm.claim.claimant'));
    this.SelectClaimant = async function(claimantName) {
        await gCommonControls.SelectNewPartyBox(claimantBox,claimantName);
    }
    this.GetClaimant = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(claimantBox);
        return boxElement;
    }

    // ****** consignor ******************//
    var consignorBox = element(by.model('vm.claim.transport.shipper'));
    this.SelectConsignor = async function(consignorName) {
        await gCommonControls.SelectNewPartyBox(consignorBox,consignorName);
    }
    this.GetConsignor = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(consignorBox);
        return boxElement;
    }

    // ***** transport information ********//
    var transportModeButton = element(by.model('vm.claim.transport.mode')).$('fieldset>div');
    var transportModeResultItems = transportModeButton.$$('div>ul>li');
    this.SelectTransportMode = async function(transportMode) {
        await gCommonControls.SelectDropdownList(transportModeButton,transportModeResultItems,transportMode);
    }
    this.GetTransportMode = function() {
        var transportBox = transportModeButton.$('a');
        return transportBox.getAttribute('title');
    }

     // ***** requested amounts information *****//
     var claimedAmountInput = element(by.model('vm.claim.financialInfo.claimedAmount')).$('div>.row>div:first-child>input');
     this.ClaimedAmountInput = async function(claimedAmount) {
         await claimedAmountInput.clear();
         await claimedAmountInput.sendKeys(claimedAmount);
     }
     this.GetClaimedAmount = function() {
         return claimedAmountInput.getAttribute('value');
     }

     // dropdown list style is different from normal drop down list
    var policyButton = $("[ng-model='claim.policy']+div");
    var policyResultItems = policyButton.$$('div>ul>li');
    this.SelectPolicy = async function(policy) {
        await gCommonControls.SelectDropdownList(policyButton,policyResultItems,policy);
    }
    this.GetPolicy = function() {
        var policyBox = policyButton.$('a');
        return policyBox.getAttribute('title');
    }
    
    // *******register or creat posting document *****//
    var docButton = $('[ng-click="vm.openFinancialDocumentDialog()"]');
    this.DefaultCreatePostingDoc = async function() {
        await docButton.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),8000);
        await browser.sleep(2000);
        await financialDocDlg.defaultCreat();
        //await browser.sleep(3000);
    }
    // table
    var tableElement = $('.table.table-striped.uploadTable');

  // ********* create preliminary tip dialogue ******//
  var createPreliminaryOK = $('.draggable.ng-scope>.modal-footer>.pull-right>button:first-child');
  var createPreliminaryCancel = $('.draggable.ng-scope>.modal-footer>.pull-right>button:last-child');
  this.CreatePreliminaryOK = async function() {
      await createPreliminaryOK.click();
  }
  this.CreatePreliminaryCancel = async function() {
    await createPreliminaryCancel.click();
}
    
    

};
module.exports = new FastEntryClaimPage();
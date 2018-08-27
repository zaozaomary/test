
var financialDocDlg = require('../pages/finance-doc.dialog');

var PostingPage = function() {
    var buttonCollection = $$('.payment-buttons-block');
    var buttonStart = buttonCollection.get(0);
    // save,posting,approve,deny,withdraw,cancel,delete
    var saveBtn = $('[ng-click="save()"]');
    var postBtn = $('[ng-click="post()"]');
    var approveBtn = $('[ng-click="approve()"]');
    var denyBtn = $('[ng-click="deny()"]');
    var withdrawBtn = $('[ng-click="Withdraw()"]');
    var cancelBtn =  $('[ng-click="cancel()"]');
    var deleteBtn =  $('[ng-click="delete()"]');
    
    this.SaveBtn = saveBtn;
    this.PostBtn = postBtn;
    this.ApproveBtn = approveBtn;
    this.DenyBtn = denyBtn;
    this.WithdrawBtn = withdrawBtn;
    this.CancelBtn = cancelBtn;
    this.DeleteBtn = deleteBtn;
    // pay money to, request money from
    var moneyCollection = buttonCollection.get(1).$$('div');
    var payMoneyToBtn = moneyCollection.get(0);
    var requestMoneyFromBtn = moneyCollection.get(1);
    // audio log,provisions,new delay letter,back
    var lastBtnCollection = buttonCollection.get(3);
    var audioLogBtn = lastBtnCollection.$('[title="Audit log"]');
    var provisionBtn = lastBtnCollection.$('[title="Provisions"]');
    var newDelayLetterBtn = lastBtnCollection.$('[title="new delayed letter"]');
    var backBtn = lastBtnCollection.$('[title="Back"]');   
    var ccButton = lastBtnCollection.$('[title="child postings disabled"]');  

    this.BackBtn = backBtn;

    var registerDocBtn = $('[ng-if="isFinancialDocDialogEnabled(currentPosition)"]>span');

    
    this.CostCenter = $('[ng-model="currentPosition.costCenter"]+div>.chosen-single.chosen-single-with-deselect');
    var costCenterResults = $$('[ng-model="currentPosition.costCenter"]+div>div>ul>li');
    this.SelectCostCenter = async function(name)  {
        await gCommonControls.SelectDropdownList(this.CostCenter,costCenterResults,name);
    }
  
    
    // there are three same elements by model, so I write a long css to locator only one
    var netAmountElement = $$('[ng-model="currentPosition.costCenter"]+div+div>div:first-child>fieldset>div>input').first();
    this.SetNetAmountValue = async function(number) {
        await netAmountElement.clear();
        await netAmountElement.sendKeys(number);
    }

    var paymentMethod = $('[ng-model="currentPosition.reconciliationMethod"]+div');
    var paymentMethodResults = paymentMethod.$$('div>ul>li');
    this.SelectPaymentMethod = async function(name) {
        await gCommonControls.SelectDropdownList(paymentMethod,paymentMethodResults,name);
    }

    // add notes
    var notesTextElement = element(by.model('payment.currentNote.noteText'));
    var addNotesBtn = element(by.buttonText('Add Note'));
    this.AddNotes = async function(text) {
        await notesTextElement.sendKeys(text);
        await addNotesBtn.click();
    }

    // create a new posting
    this.ClaimantToCreateNewPosting = async function(netAmount,paymentMethod,notes) {
        await this.SetNetAmountValue(netAmount);
        await gCommonUse.BrowserScrollBy(200);
        await this.SelectPaymentMethod(paymentMethod);
        await registerDocBtn.click();
        await browser.sleep(5000);
        //await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await financialDocDlg.defaultCreat();
        await saveBtn.click();
        //await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await browser.sleep(3000);
        await postBtn.click();
        //await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),8000);
        await browser.sleep(4000);
    }
    
}
module.exports = new PostingPage();
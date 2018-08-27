// financialDoc-dialog.js
var FinancialDocDialog = function()  {
    var registerBtn = $('[btn-radio="ctrl.types.register"]');
    var createBtn = $('[btn-radio="ctrl.types.create"]');     
    var docNumber = element(by.model('ctrl.financialDocumentNumber'));
    var docDate = $("[name='ctrl.financialDocumentDate']");
    var uploadBtn = $("input[uploader='attCtrl.uploader']");

    var applyBtn = $('[ng-click="ctrl.apply()"]');
    var cancelBtn = $('.controls.text-right>[ng-click="ctrl.cancel()"]');  
    var previewBtn = $('[ng-click="ctrl.preview()"]'); 
    
    this.DocumentNumberInput = async function(number) {
        await docNumber.sendKeys(number);
    }

    this.DocumentDateInput = async function(date) {
        await docDate.sendKeys(date);
    }

    this.UploadDocument = async function(docPath) {
        
    }
 
 
   this.UploadInTable = async function(docName) {

   }
   
   this.RemoveInTable = async function(docName) {

   }
   this.CancelUploadInTable = async function(docName) {

   }

   async function FindRowByName(name) {
       rows = element.all(by.repeater('item in attCtrl.uploader.queue track by $index'));
       for(var row in rows) {
          var nameElement =  row.$('td');
          nameElement.getText().then(function(text) {

          });
       }
   }

   async  function callExePrograms(fullPath) {
        var shellActiveXObject = new ActiveXObject("WScript.Shell");
        if (!shellActiveXObject) {
            alert('WScript.Shell starts wrongly!');
            return;
        }
        shellActiveXObject.Run(fullPath, 1, false);
        shellActiveXObject = null;
}

this.defaultCreat = async function() {
    await createBtn.click();
    //await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
    await browser.sleep(5000);
    await applyBtn.click();
    //await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),8000);
    await browser.sleep(7000);
}






};
module.exports = new FinancialDocDialog();
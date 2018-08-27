
var PostingTab = function() {
    var paymentTypesElements = $$('[ng-model="select.createPaymentType"]+div');
    var payMoneyTo = paymentTypesElements.get(0);
    var requestMoneyFrom = paymentTypesElements.get(1);
    var showOrHidePostingBtn = $("[ng-show='payments']>.payment-type-identifier.toggle");

    var payMoneyToDropdownItems = payMoneyTo.$$('div>ul>li');
    var requestMoneyFromDropdownItems = requestMoneyFrom.$$('div>ul>li');
    var rowsElements = $$('#payments>tbody>tr');

    async function selectPayMoneyToType(typeName) {
        var payMoneyToBtn = payMoneyTo.$('a');
        await gCommonControls.SelectDropdownList(payMoneyToBtn,payMoneyToDropdownItems,typeName);
    }
    async function selectRequestMoneyFromType(typeName) {
        var requestMoneyFromBtn = requestMoneyFrom.$('a');
        await gCommonControls.SelectDropdownList(requestMoneyFromBtn,requestMoneyFromDropdownItems,typeName);
    }
    
    this.SelectPostingByTypeAmount = async function(typeName,amountNumber)  {
        var findRow = await findPostingRow(typeName,amountNumber);
        await  browser.actions().mouseMove(findRow).doubleClick().perform();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
    }

    this.GetClaimPostingStatus = async function(typeName,amountNumber)  {
        var findRow = await findPostingRow(typeName,amountNumber);
        var status = findRow.$$('td').get(3);
        return status.getText();  
    }

    async function findPostingRow(typeName,amountNumber)  {
        var rowsElements = await element.all(by.css('#payments>tbody>tr'));
        var len = rowsElements.length;
       for(var i = 0;i<len;i++) {
           var item = rowsElements[i];
           var columns = await item.$$('td');
           var type = columns[0];
           var amount = columns[2];
           var acturalType = '';
           var acturalAmount = '';
           await type.getText().then(function(text) {
              acturalType = text;
           });
           // actural text is format like that: '8,900,123 CNY'
           await amount.getText().then(function(text) {
               console.log(text);
               var temp = text.split(' ')[0];
               var str = temp.split(',').join('');
               acturalAmount = str;
           });
           // compare the amount 
           
           if(typeName == acturalType && amountNumber == acturalAmount) {
               return item;
           }
       }
    }

    this.SelectPayMoneyTo = async function(payType) {
        await selectPayMoneyToType(payType);
    }

   
    this.PayMoneyTo = async function(payType,netAmount,paymentMethod) {
        var postingPage = require('../pages/posting.page');
        await selectPayMoneyToType(payType);
        if(payType == 'Claimant') {
        await postingPage.ClaimantToCreateNewPosting(netAmount,paymentMethod);
        }
        await postingPage.BackBtn.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),8000);

    }

    // get current row numbers
    this.GetCurrentRowNumbers = async function() {
        return element.all(by.css('#payments>tbody>tr')).count();
    }
}

module.exports = new PostingTab();
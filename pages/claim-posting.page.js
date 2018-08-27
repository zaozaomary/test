
var ClaimPostingPage = function()  {

var payMoneyToStart = $("[ng-model='select.createPaymentType']+div");
var payMoneyToButton = payMoneyToStart.$('a');
var payMoneyToInput = payMoneyToStart.$('div>div>input');
var payMoneyResultElements = payMoneyToStart.$$('div>ul>li');

this.SelectPayMoneyTo = async function(name)  {
    await gCommonControls.SelectDropdownList(payMoneyToInput,payMoneyResultElements,name);
    
}









}


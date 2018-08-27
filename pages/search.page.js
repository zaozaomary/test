// search-page.js
var SearchPage = function()  {
    var searchButton = $('#search');
    this.SearchButton = searchButton;
    
    // important, the row should be from zero in "element.all(by.repeater('t in datas')).get(0)"
	this.GetClaimReferenceFromTable = async function(rowNumber) { 
        var numberIndex = rowNumber -1;      
        var selectRow = element.all(by.repeater('t in datas')).get(numberIndex);
        var claimReferenctElement = selectRow.$('td:first-child>.claim-ref>a');
        return claimReferenctElement;	
    }

    this.GetPostingNumberFromTable = async function(rowNumber) { 
        var numberIndex = rowNumber -1;      
        var selectRow = element.all(by.repeater('l in data')).get(numberIndex);
        var postingNumberElement = selectRow.$('td:first-child>span:last-child>payment-link>a');
        return postingNumberElement;	
    }

    this.GetTotalRowsFromClaimTable = async function() {
        return element.all(by.repeater('t in datas')).count();
    }

    this.GetTotalRowsFromPostingTable = async function() {
        return element.all(by.repeater('l in data')).count();
    }
	
};
module.exports = new SearchPage();
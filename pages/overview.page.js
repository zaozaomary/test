// overview-page.js
var OverviewPage = function () {
    var personButton = $("[ng-change='changeClaimSearchForUser()']");
    var officeButton = $("[ng-change='changeClaimSearchForBranch()']");
    var searchButton = element(by.buttonText(' Search'));
    var refreshButton = element(by.buttonText(' Refresh'));
    var openCheckBox = element(by.model('c.claimOpen'));
    var closedCheckBox = element(by.model('c.claimClosed'));
    var deleteCheckBox =  element(by.model('c.claimDeleted'));
    var preliminaryCheckBox = element(by.model('c.isPreliminary'));
    var claimCheckBox = element(by.model('c.isClaim'));
    var standardCheckBox = element(by.model('c.isStandard'));
    var strategicCheckBox = element(by.model('c.isStrategicPartner'));

    this.RefreshOverview = async function() {
        await  browser.get('overview');
    }
    this.PersonalChecked =async function() {
        var isChecked = false;
        await personButton.getAttribute('class').then(function(text) {
            if(text.indexOf('active')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == false) {
            await personButton.click();
        }
    }

    this.OfficeChecked =async function() {
        var isChecked = false;
        await officeButton.getAttribute('class').then(function(text) {
            if(text.indexOf('active')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == false) {
            await officeButton.click();
        }
    }

    this.PreliminaryChecked = async function() {
        var isChecked = false;
        await preliminaryCheckBox.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == false) {
            await preliminaryCheckBox.click();
        }
    }

    this.PreliminaryUnchecked = async function() {
        var isChecked = false;
        await preliminaryCheckBox.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == true) {
            await preliminaryCheckBox.click();
        }
    }

    this.ClaimChecked = async function() {
        var isChecked = false;
        await claimCheckBox.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == false) {
            await claimCheckBox.click();
        }
    }

    this.ClaimUnchecked = async function() {
        var isChecked = false;
        await claimCheckBox.getAttribute('class').then(function(text) {
            if(text.indexOf('checked')>-1) {
                isChecked = true;
            }
        });
        if(isChecked == true) {
            await claimCheckBox.click();
        }

    }

    this.SelectRowByClaimReference = async function(claimReference) {
       await gCommonControls.TableDoubleClickRow('t in datas','claimRef',claimReference);
       await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
    }

    this.SelectFirstRow = async function() { 
       var firstRow = $('[ng-table="claimTableParams"]').$('tbody>tr:first-child>td:first-child');
       await browser.wait(ExpectedConditions.visibilityOf(firstRow,5000));
       await firstRow.click();
    }

    this.CheckGBSClaim = async function(claimReference) {
        var isGBS = false;
        var temp = await element.all(by.repeater('t in datas').column('claimRef'));
        for(var i = 0;i < temp.length;i++) {
            var findEqual = false;
            await temp[i].getText().then(function(text) {
                    if(text == claimReference) {
                        findEqual = true;                       
                        return;
                    }           
            });
            // if you find the equal text, it must return,or it will throw error
            if(findEqual == true) {
                var item = temp[i].$('claim-image>i:nth-child(2)');
                await item.getAttribute('title').then(function(text) {
                   if(text.indexOf('GBS')>-1) {
                     isGBS = true;
                     return isGBS;
                   }
                });
            }
        }
        return isGBS;

    }

    // get the item of specific row and specific column
    var tableElement = $('[ng-table="claimTableParams"]')
    this.GetSpecificRowColumn = async function(rowNumber,columnNumber) {
       var cssFormat = 'tbody>tr:nth-child('+rowNumber.toString()+')>td:nth-child('+columnNumber.toString()+')';
       return tableElement.$(cssFormat);

    }

    
}
module.exports = new OverviewPage();
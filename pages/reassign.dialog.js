
var ReassignDialog = function()  {
    var reassignOffice = element(by.model('selected.branch'));  
    var reassignButton = $('[ng-show="selected.branch"]');
    var searchInputText = $('#select2-drop>div>input');
    var firstResultItem = $('#select2-drop>ul>li:first-child');
    var cancelReassignBtn = element(by.buttonText('Cancel reassignment'));
    var tipSpan = $('[ng-show="reassignBranch"]');
    var closeBtn = $('.controls.pull-right>button:last-child');

    this.CancelBtn = cancelReassignBtn;
    this.CloseBtn = closeBtn;

    this.ReassignOffice = async function(officeName) {
        await browser.wait(ExpectedConditions.visibilityOf(closeBtn),3000);
        await gCommonControls.SelectNewPartyBox(reassignOffice,officeName);
        await reassignButton.click();
        await browser.wait(ExpectedConditions.invisibilityOf(closeBtn),3000);
    }

    this.ReassignOffice_Close = async function(officeName) {
        await browser.wait(ExpectedConditions.visibilityOf(closeBtn),3000);
        await gCommonControls.SelectNewPartyBox(reassignOffice,officeName);
        await closeBtn.click();
        await browser.wait(ExpectedConditions.invisibilityOf(closeBtn),3000);
    }

    this.IsReassigned = async function() {
        var tag = false;
        await tipSpan.getAttribute('class').then(function(text) {
            if(text.indexOf('hide')>-1) {
                tag = false;
            }
            else {
                tag = true;
            }
        })
        return tag;
    }

}
module.exports = new ReassignDialog();

var GBSReassignDialog = function()  {
    var reassignOffice = $("[lookup='REASSIGN_BRANCHES']");
    var reason_checkbox1 = $("[tooltip='Claimant requests indemnification above EUR 200']");
    var reason_checkbox2 = $("[tooltip='Transport mode Contract Logistics']");
    var reason_checkbox3 = $("[tooltip='Country-specific insurance policy']");
    var reason_checkbox4 = $("[tooltip='External recovery to be performed']");
    var searchInputText = $('#select2-drop>div>input');
    var firstResultItem = $('#select2-drop>ul>li:first-child');
    var closeBtn = $(".controls.pull-right>[ng-click='reassign()']+button");
    var reassignBtn = $(".controls.pull-right>[ng-click='reassign()']");

    this.ReassignOffice = async function(officeName,reasonIndex) {
        await gCommonControls.SelectNewPartyBox(reassignOffice,officeName);
        if(reasonIndex == 1) {
            await reason_checkbox1.click();
        }
        else if(reasonIndex == 2) {
            await reason_checkbox2.click();
        }
        else if(reasonIndex == 3) {
            await reason_checkbox3.click();
        }
        else {
            await reason_checkbox4.click();
        }
        await reassignBtn.click();

    }

}
module.exports = new GBSReassignDialog();
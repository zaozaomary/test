// closeClaimTip-dialog.js
var CloseClaimTipPage = function() {
    var cancelButton = element(by.buttonText('Cancel'));
    var closeButton = element(by.buttonText('Close'));

    this.CancelButton = cancelButton;
    this.CloseButton = closeButton;
}

module.exports = new CloseClaimTipPage();
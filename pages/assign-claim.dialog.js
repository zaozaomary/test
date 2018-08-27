// AssignedClaim-page.js
var AssignedClaimPage = function() {
    var reasonForDenyInput = element(by.model('task.noteText'));
    var acceptButton = element(by.buttonText('Accept'));
    var rejectButton = element(by.buttonText('Reject'));
    var markButton = element(by.buttonText('Mark'));
    var closeButton = element(by.buttonText('Close'));

    this.AcceptButton = acceptButton;
    this.RejectButton = rejectButton;
    this.MarkButton = markButton;
    this.CloseButton = closeButton;
    this.ReasonForDenyInput = reasonForDenyInput;

    this.InputReasonForDeny = async function(reason) {
      await reasonForDenyInput.sendKeys(reason);
    }
}

module.exports = new AssignedClaimPage();

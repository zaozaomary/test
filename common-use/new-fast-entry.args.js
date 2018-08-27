// newFastEntry-args.js
var fastEntryClaim = require('../pages/fast-entry-claim.page');

function NewFastEntryArgs() {
    var path = './test-date/claim/fast-entry-default-fields.yaml';
    var data = gCommonUse.getDate_from_YAML(path);
    var managingOfficeName = data.managingBranch;
    var orderDate = gCommonUse.GetFormatDate(data.orderDate);
    var transportDate = gCommonUse.GetFormatDate(data.transportDate);
    var transportMode = data.transportMode;
   
    var principal = data.principal;
    var consignor = data.consignor;
    var conveyor = data.conveyor;
    var claimant = data.claimant;
    var policy = data.policy;
    var claimedAmount = data.claimedAmount;

    var goodsCode = 'Fast Entry Goods Code';
    this.GetGoodsCodeText = function() {
        return goodsCode;
    }


    // ***** Set characters ******//
    this.SetManagingOfficeName = function(name) {
        managingOfficeName = name;
        //conveyor = managingOfficeName;
    }
    this.GetManagingOfficeNameText = function() {
       return managingOfficeName;
    }
    
    this.SetOrderDate = function(date) {
        orderDate = date;
    }
    this.GetOrderDateText = function() {
        return orderDate;
    }

   
    this.SetTransportDate = function(date) {
        transportDate = date;
    }
    this.GetTransportDateText = function() {
        return transportDate;
    }
    
    this.SetConsignor = function(party) {
        consignor = party;
    }
    this.GetConsignorText = function() {
        return consignor;
    }
    
    this.SetClaimant = function(party) {
        claimant = party;
    }
    this.GetClaimantText = function() {
        return claimant;
    }
   
    this.SetTransportMode= function(mode) {
        transportMode = mode;
    }
    this.GetTransportModeText = function() {
        return transportMode;
    }

    this.SetClaimedAmount = function(number) {
        claimedAmount = number.toString();
    }
    this.GetClaimedAmountText = function() {

        return claimedAmount;
    }
   

    this.SetPrincipal = function(party) {
        principal = party;
    }
    this.GetPrincipalText = function() {
        return principal;
    }
   

    this.SetPolicy = function(name) {
        policy = name;
    }
    this.GetPolicyText = function() {
        return policy;
    }

    // conveyor
    this.GetConveyorText = function() {
        return conveyor;
    }

 

    // save a fast entry
    this.CreatFastEntry = async function()  {
        await gCommonUse.NewFastEntry();
        await fastEntryClaim.SelectManagingOffice(managingOfficeName);
        await gCommonUse.BrowserScrollBy(100);
        await fastEntryClaim.OrderDateInput(orderDate);
        await fastEntryClaim.TransportDateInput(transportDate);
        // input dates
        await fastEntryClaim.SelectConsignor(consignor);
        await gCommonUse.BrowserScrollBy(200);
        await fastEntryClaim.SelectClaimant(claimant);
        await gCommonUse.BrowserScrollTo(50);
        await fastEntryClaim.SelectTransportMode(transportMode);
        await fastEntryClaim.ClaimedAmountInput(claimedAmount);
        await fastEntryClaim.SelectPolicy(policy);
    
        await fastEntryClaim.DefaultCreatePostingDoc();
        await fastEntryClaim.UncheckedCreateLetter();
    }
}
module.exports = new NewFastEntryArgs();
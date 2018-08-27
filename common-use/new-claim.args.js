//newClaim-args.js
var newClaimPage = require('../pages/new-claim.page');

function NewClaimArgs() {
    var path = './test-date/claim/claim-default-fields.yaml';
    var data = gCommonUse.getDate_from_YAML(path);
    var managingOfficeName = data.managingBranch;
    var lossDate = gCommonUse.GetFormatDate(data.lossDate);
    var reminderDate = gCommonUse.GetFormatDate(data.reminderDate);
    var timebarDate = gCommonUse.GetFormatDate(data.timebarDate);
    var placeOfDamage = data.placeOfDamage;
    var kindOfDamage = data.kindOfDamage;
    var reasonOfDamage = data.reasonOfDamage;
    var goodsCode = data.goodsCode;
    var transportMode = data.transportMode;
    var claimant = data.claimant;
    var claimOffice = data.claimedOffice;
    var responsibleOffice = data.responsibleOffice;
    var principal = data.principal;
    var consignor = data.consignor;
    var conveyor = data.conveyor;
    var policy = data.policy;
    var maxLiability = data.maxLiability;
    var claimedAmount = data.claimedAmount;
    var initialProvision = data.initialProvision;

    // no mandatory fields
    var orderDate = gCommonUse.GetFormatDate(data.orderDate);
    var damagedPieces = data.damagedPieces;
    var damagedWeight = data.damagedWeight;
    var totalPieces = data.totalPieces;
    var totalWeight = data.totalWeight;
    var packageType = data.packageType;
    var incoTerm = data.incoTerm;
    var freightTerm = data.freightTerm;
    var transportType = data.transportType;
    var product = data.product;
    var productOption = data.productOption;
    var claimRemarks = data.claimRemarks;
    var updateMessage = data.updateMessage;
    var insurerClaimNo = data.insurerClaimNo;
    var freightCharges = data.freightCharges;
    var valueOfGoods = data.valueOfGoods;
    var insurancePremium = data.insurancePremium;
    var amountLawyer = data.amountLawyer;
    var amountSuryeror = data.amountSuryeror;
    var amountOthers = data.amountOthers;
    var expectedRecovery = data.expectedRecovery;
    var settlementCode = data.settlementCode;
    var recoveryCode = data.recoveryCode;
    var financeRemark = data.financeRemark;

    // ***** Set characters ******//
    this.SetManagingOfficeName = function(name) {
        managingOfficeName = name;
    }
    this.GetManagingOfficeNameText = function() {
        return managingOfficeName;
    }
    this.SetLossDate = function(date) {
        lossDate = date;
    }
    this.GetLossDateText = function() {
        return lossDate;
    }
    this.SetReminderDate = function(date) {
        reminderDate = date;
    }
    this.GetReminderDateText = function() {
        return reminderDate;
    }
    this.SetTimebarDate = function(date) {
        timebarDate = date;
    }
    this.GetTimebarDateText = function() {
        return timebarDate;
    }
    this.SetPlaceOfDamage = function(damage) {
        placeOfDamage = date;
    }
    this.GetPlaceOfDamage = function()  {
        return placeOfDamage;
    }
    this.SetKindOfDamage = function(damage) {
        kindOfDamage = damage;
    }
    this.GetKindOfDamage = function()  {
        return kindOfDamage;
    }
    this.SetReasonOfDamage = function(damage) {
        reasonOfDamage = damage;
    }
    this.GetReasonOfDamage = function()  {
        return reasonOfDamage;
    }
    this.SetGoodsCode = function(code) {
        goodsCode = code;
    }
    this.GetGoodsCode = function()  {
        return goodsCode;
    }
    this.SetTransportMode= function(mode) {
        transportMode = mode;
    }
    this.GetTransportMode = function()  {
        return transportMode;
    }
    
    this.SetClaimant = function(party) {
        claimant = party;
    }
    this.GetClaimant = function() {
        return claimant;
    }

    this.SetClaimOffice = function(party) {
        claimOffice = party;
    }
    this.GetClaimOffice = function() {
        return claimOffice;
    }
    this.SetResponsibleOffice = function(party) {
        responsibleOffice = party;
    }
    this.GetResponsibleOffice = function() {
        return responsibleOffice;
    }
    this.SetPrincipal = function(party) {
        principal = party;
    }
    this.GetPrincipal = function() {
        return principal;
    }
    this.SetConsignor = function(party) {
        consignor = party;
    }
    this.GetConsignor = function() {
        return consignor;
    }
    this.SetConveyor = function(party) {
        conveyor = party;
    }
    this.GetConveyor = function() {
        return conveyor;
    }
    this.SetPolicy = function(name) {
        policy = name;
    }
    this.GetPolicy = function() {
       return policy;
    }
    this.SetMaxLiability = function(number) {
        maxLiability = number;
    }
    this.GetMaxLiability = function() {
        return maxLiability;
    }
    this.SetClaimedAmount = function(number) {
        claimedAmount = number;
    }
    this.GetClaimedAmount = function() {
        return claimedAmount;
    }
    this.SetInitialProvision = function(number) {
        initialProvision = number;
    }
    this.GetInitialProvision = function() {
        return initialProvision;
    }
    // ******************others fields ****************//
    // damaged pieces
    this.SetDamagedPieces = function(number) {
        damagedPieces = number.toString();
    }
    this.GetDamagedPieces = function() {
        return damagedPieces;
    }
    // damaged weight
    this.SetDamagedWeight = function(number) {
        damagedWeight = number.toString();
    }
    this.GetDamagedWeight = function() {
        return damagedWeight;
    }
    // total pieces
    this.SetTotalPieces = function(number) {
        totalPieces = number.toString();
    }
    this.GetTotalPieces = function() {
        return totalPieces;
    }
    // total weight
    this.SetTotalWeight = function(number) {
        totalWeight = number.toString();
    }
    this.GetTotalWeight = function() {
        return totalWeight;
    }
    // packageType
    this.SetPackageType = function(name) {
        packageType = name;
    }
    this.GetPackageType = function() {
        return packageType;
    }

    // incoTerm 
    this.SetIncoTerm = function(name) {
        incoTerm = name;
    }
    this.GetIncoTerm = function() {
        return incoTerm;
    }
    // freightTerm 
    this.SetFreightTerm = function(name) {
        freightTerm = name;
    }
    this.GetFreightTerm = function() {
        return freightTerm;
    }
    // transportType 
    this.SetTransportType = function(name) {
        transportType = name;
    }
    this.GetTransportType = function() {
        return transportType;
    }
    // product 
    this.SetProduct = function(name) {
        product = name;
    }
    this.GetProduct = function() {
        return product;
    }
    // productOption 
    this.SetProductOption = function(name) {
        productOption = name;
    }
    this.GetProductOption = function() {
        return productOption;
    }
    //claimRemarks 
    this.SetClaimRemarks = function(name) {
        claimRemarks = name;
    }
    this.GetClaimRemarks = function() {
        return claimRemarks;
    }
    // updateMessage 
    this.SetUpdateMessage = function(name) {
        updateMessage = name;
    }
    this.GetUpdateMessage = function() {
        return updateMessage;
    }
    // insurerClaimNo 
    this.SetInsurerClaimNo = function(name) {
        insurerClaimNo = name;
    }
    this.GetInsurerClaimNo = function() {
        return insurerClaimNo;
    }
    // freightCharges 
    this.SetFreightCharges = function(name) {
        freightCharges = name;
    }
    this.GetFreightCharges = function() {
        return freightCharges;
    }
    // valueOfGoods 
    this.SetValueOfGoods = function(name) {
        valueOfGoods = name;
    }
    this.GetValueOfGoods = function() {
        return valueOfGoods;
    }
    // insurancePremium 
    this.SetInsurancePremium = function(name) {
        insurancePremium = name;
    }
    this.GetInsurancePremium = function() {
        return insurancePremium;
    }
    // amountLawyer = '100';
    this.SetAmountLawyer = function(name) {
        amountLawyer = name;
    }
    this.GetAmountLawyer = function() {
        return amountLawyer;
    }
    // amountSuryeror 
    this.SetAmountSuryeror = function(name) {
        amountSuryeror = name;
    }
    this.GetAmountSuryeror = function() {
        return amountSuryeror;
    }
    // amountOthers 
    this.SetAmountOthers = function(name) {
        amountOthers = name;
    }
    this.GetAmountOthers = function() {
        return amountOthers;
    }
    // expectedRecovery 
    this.SetExpectedRecovery = function(name) {
        expectedRecovery = name;
    }
    this.GetExpectedRecovery= function() {
        return expectedRecovery;
    }
    // settlementCode 
    this.SetSettlementCode = function(name) {
        settlementCode = name;
    }
    this.GetSettlementCode= function() {
        return settlementCode;
    }
    // recoveryCode 
    this.SetRecoveryCode = function(name) {
        recoveryCode = name;
    }
    this.GetRecoveryCode= function() {
        return recoveryCode;
    }
    // financeRemark 
    this.SetFinanceRemark = function(name) {
        financeRemark = name;
    }
    this.GetFinanceRemark= function() {
        return financeRemark;
    }

    // save a claim 
    this.Save = async function()  {
        await gCommonUse.NewClaim();
        await newClaimPage.SelectManagingOffice(managingOfficeName);
        // input dates
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.LossDateInput(lossDate);
        await newClaimPage.ReminderDateInput(reminderDate);
        await newClaimPage.TimebarDateInput(timebarDate);
        // loss information
        await newClaimPage.SelectPlaceOfDamage(placeOfDamage); 
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.SelectKindOfDamage(kindOfDamage);
        await newClaimPage.SelectReasonOfDamage(reasonOfDamage);
        // Goods information
        await gCommonUse.BrowserScrollTo(50);
        // it must close the tips that above the top. because they are cover the interface
        await newClaimPage.CloseTopTips();
        await newClaimPage.SelectGoodsCode(goodsCode);
        // transport mode
        await gCommonUse.BrowserScrollBy(350);
        await newClaimPage.SelectTransportMode(transportMode);
        // claim parties
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.SelectClaimant(claimant);
        await newClaimPage.SelectClaimOffice(claimOffice);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectResponsibleOffice(responsibleOffice);
        
        // transport parties
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectPrincipal(principal);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectConsignor(consignor);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectConveyor(conveyor);
        // Policy
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.SelectPolicy(policy);
        // charge
        await gCommonUse.BrowserScrollBy(450);
        await newClaimPage.InputMaxLiability(maxLiability);
        await newClaimPage.InputClaimedAmount(claimedAmount);
        await gCommonUse.BrowserScrollBy(400);
        await newClaimPage.InputInitialProvision(initialProvision);
        // click save button
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.Save();
    }

    // save a claim with all fields
    this.SaveAllFields = async function() {
        await gCommonUse.NewClaim();
        await newClaimPage.SelectManagingOffice(managingOfficeName);
        // input dates
        await gCommonUse.BrowserScrollBy(250);
        await newClaimPage.LossDateInput(lossDate);
        await newClaimPage.ReminderDateInput(reminderDate);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.OrderDateInput(orderDate);
        await newClaimPage.TimebarDateInput(timebarDate);
        // loss information
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectPlaceOfDamage(placeOfDamage); 
        await newClaimPage.DamagePiecesInput(damagedPieces);
        await newClaimPage.DamageWeightInput(damagedWeight);

        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.SelectKindOfDamage(kindOfDamage);
        await newClaimPage.SelectReasonOfDamage(reasonOfDamage);
        // Goods information
        await gCommonUse.BrowserScrollTo(50);
        // it must close the tips that above the top. because they are cover the interface
        await newClaimPage.CloseTopTips();
        await newClaimPage.SelectGoodsCode(goodsCode);
        await newClaimPage.TotalPiecesInput(totalPieces);
        await newClaimPage.TotalWeightInput(totalWeight);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.SelectPackageType(packageType);
        await newClaimPage.SelectIncoTerm(incoTerm);
        await newClaimPage.SelectFreightTerm(freightTerm);
        // transport mode
        await gCommonUse.BrowserScrollBy(250);
        await newClaimPage.SelectTransportMode(transportMode);
        await newClaimPage.SelectTransportType(transportType);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.SelectProduct(product);
        await newClaimPage.ProductOptionInput(productOption);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.ClaimRemarksInput(claimRemarks);
        await newClaimPage.UpdateMessageInput(updateMessage);
        // claim parties
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.SelectClaimant(claimant);
        await newClaimPage.SelectClaimOffice(claimOffice);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectResponsibleOffice(responsibleOffice);    
        // transport parties
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectPrincipal(principal);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectConsignor(consignor);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SelectConveyor(conveyor);
        // Policy
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.SelectPolicy(policy);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.InsurerClaimNoInput(insurerClaimNo);
        await newClaimPage.FreightChargeInput(freightCharges);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.ValueOfGoodsInput(valueOfGoods);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.InsurancePremiumInput(insurancePremium);
        // charge
        await gCommonUse.BrowserScrollBy(250);
        await newClaimPage.InputMaxLiability(maxLiability);
        await newClaimPage.InputClaimedAmount(claimedAmount);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.AmountLawyerInput(amountLawyer);
        await newClaimPage.AmountSurveyorInput(amountSuryeror);
        await newClaimPage.AmountOthersInput(amountOthers);

        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.InputInitialProvision(initialProvision);
        await gCommonUse.BrowserScrollBy(200);
        await newClaimPage.SetExpectedRecovery(expectedRecovery);
        await newClaimPage.SetSettlementCode(settlementCode);
        await gCommonUse.BrowserScrollBy(100);
        await newClaimPage.SetRecoveryCode(recoveryCode);
        await newClaimPage.InputFinancialRemarks(financeRemark);
        // click save button
        await gCommonUse.BrowserScrollTo(50);
        await newClaimPage.Save();
    }
}
module.exports = new NewClaimArgs();
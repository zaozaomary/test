// newClaim-page.js
var NewClaimPage = function()  {
    // top of tools
    var saveTool = element(by.buttonText('Save*'));
    var convertToClaimTool = element(by.buttonText('Convert to claim'));
    var convertToPreliminaryTool = element(by.buttonText('Convert to preliminary')); 
    var printTool = element(by.buttonText('Print Claim'));
    var assignTransportTool = element(by.buttonText('Assign Transport'));
    var assignIncidentTool = element(by.buttonText('Assign Incident'));
    var reassignTool = element(by.buttonText('Reassign'));
    var closeClaimTool = element(by.buttonText('Close Claim'));
    var discardTool = element(by.buttonText('Discard'));
    // in order to call convenient 
    this.SaveTool = saveTool;
    this.ConvertToClaimTool = convertToClaimTool;
    this.ConvertToPreliminaryTool = convertToPreliminaryTool;
    this.PrintTool = printTool;
    this.AssignTransportTool = assignTransportTool;
    this.AssignIncidentTool = assignIncidentTool;
    this.ReassignTool = reassignTool;
    this.CloseClaimTool = closeClaimTool;  
    this.DiscardTool = discardTool;         
    // tab items 
    var tabItems = $$('#claimForm>.ng-isolate-scope>ul>li');
    var claimTab = tabItems.get(0);
    var transportTab = tabItems.get(1);
    var postingTab = tabItems.get(2);
    var documentsTab = tabItems.get(3);
    var communicationTab = tabItems.get(4);
    var tasksTab = tabItems.get(5);
    var auditLogTab = tabItems.get(6);

    this.ClaimTab = claimTab;
    this.TransportTab = transportTab;
    this.PostingTab = postingTab;
    this.DocumentsTab = documentsTab;
    this.CommunicationTab = communicationTab;
    this.TasksTab = tasksTab;
    this.AuditLogTab = auditLogTab;

    // Claim ID
    var claimReference = $('.claim-status.row>div:first-child>div:last-child>span:nth-child(5)');
    //var IncidentName = $('[ng-if]=claim.incident>p:last-child'); property can not use ng-if
    var IncidentName = $('.p-hover.ng-scope>p:last-child');
    // ***** Tools function ***** //
    this.Save = async function() {
        await saveTool.click();
    }
    this.ConvertToPreliminary = async function() {
        await convertToPreliminary.click();
    }

    this.ConvertToClaim = async function() {
        await convertToClaimTool.click();
    }

    // ***** general setting ******//
    var managingOfficeBox = element(by.model('claim.managingBranch'));
    // search branch elements
    var searchInputText = $('#select2-drop>div>input');
    var firstResultItem = $('#select2-drop>ul>li:first-child');
    this.SelectManagingOffice = async function(name) {
        await gCommonControls.SelectModifyPartyBox(managingOfficeBox,name);
    }
    this.SelectUnexistedManagingOffice = async function(name) {
        var modifyElement = managingOfficeBox.$('div>.party-part>div>span:nth-child(2)');
        await browser.actions().mouseMove(managingOfficeBox).perform();
        await modifyElement.click();
        await browser.wait(ExpectedConditions.visibilityOf(firstResultItem),4000);
        await searchInputText.sendKeys(name);
        await browser.sleep(2000);
        // should release focus
        //var managingOfficeInput = managingOfficeBox.$('.party-search>div>a>.select2-chosen');
        //await browser.actions().mouseMove(managingOfficeInput).click().perform();
        return firstResultItem;
    }

    this.GetManagingOffice = async function() {
       var boxElement = await gCommonControls.GetPartyBoxName(managingOfficeBox);
       return boxElement;
    }

    // processing status
    var processingStatusElement = $('[original-ng-model="claim.processingStatus"]+div>a>span');
    this.GetProcessingStatus = async function() {
        return processingStatusElement.getText();
    }
   // ***** dates setting ********//
   var lossDateInput = element(by.model('claim.lossDate')).$('div>div>input');
   var reminderDateInput = element(by.model('claim.reminderDate')).$('div>div>input');  
   var orderDateInput = element(by.model('claim.transport.orderDate')).$('div>div>input'); 
   var timeBarDateInput = element(by.model('claim.timeBarDate')).$('div>div>input');

    this.LossDateInput = async function(lossDate) {
     
        /*var item = browser.findElement(by.css('[ng-model="claim.lossDate"]>div>div>input'));
        var jsStr = 'argument[0].value=\"'+ lossDate + '\"';
        console.log(jsStr);
        await browser.executeScript('argument[0].value=\"'+ lossDate + '\"',item);*/

        /*await lossDateInput.clear();
        await lossDateInput.sendKeys(lossDate);*/
        var len = 0;
        await lossDateInput.getAttribute('value').then(function(text) {
           len = text.length;
        });
        for(var i=0;i<len;i++) {
            await lossDateInput.sendKeys(protractor.Key.BACK_SPACE);
          }
          await lossDateInput.sendKeys(lossDate);
    }
    
    this.LossDateInputError = async function(lossDate) {
        //await lossDateInput.click();
        var lossLabel = $('[ng-model="claim.lossDate"]>div>label');     
        await lossLabel.click();
        await this.LossDateInput(lossDate);
        var lossDateTip =  $('[ng-model="claim.lossDate"]>div>span');
        await lossLabel.click();
        return lossDateTip;

    }

    this.GetLossDate =  function() {
        return lossDateInput.getAttribute('value');
    }
    this.ReminderDateInput = async function(reminderDate) {
        //await reminderDateInput.clear();
        // because the function of clear is not effective,use key instead
        for(var i=0;i<10;i++) {
          await reminderDateInput.sendKeys(protractor.Key.BACK_SPACE);
        }
        await reminderDateInput.sendKeys(reminderDate);
    }
    this.GetReminderDate = function() {
          return reminderDateInput.getAttribute('value');
    }

    this.OrderDateInput = async function(orderDate) {
        //await orderDateInput.clear();
        var len = 0;
        await orderDateInput.getAttribute('value').then(function(text) {
           len = text.length;
        });
        for(var i=0;i<len;i++) {
            await orderDateInput.sendKeys(protractor.Key.BACK_SPACE);
          }
        await orderDateInput.sendKeys(orderDate);
    }
    this.GetOrderDate =  function() {
        return orderDateInput.getAttribute('value');
    }
    
    this.TimebarDateInput =  async function(timebarDate) {
        //await timeBarDateInput.clear();
        var len = 0;
        await timeBarDateInput.getAttribute('value').then(function(text) {
           len = text.length;
        });
        for(var i=0;i<len;i++) {
            await timeBarDateInput.sendKeys(protractor.Key.BACK_SPACE);
          }
        await timeBarDateInput.sendKeys(timebarDate);
    }
    this.GetTimebarDate =  function() {
        return timeBarDateInput.getAttribute('value');
    }

    //***** loss information *******//
    var placeOfDamageButton = element(by.model('claim.placeOfDamage')).$('fieldset>div');
    var damagePlaceResultItems = placeOfDamageButton.$$('div>ul>li');
    var kindOfDamageButton = element(by.model('claim.lossCode')).$('fieldset>div');
    var damageKindResultItems = kindOfDamageButton.$$('div>ul>li');
    var reasonForDamageButton = element(by.model('claim.reasonForDamage')).$('fieldset>div');
    var damageReasonResultItems = reasonForDamageButton.$$('div>ul>li');
    this.SelectPlaceOfDamage = async function(damageName) {
        await gCommonControls.SelectDropdownList(placeOfDamageButton,damagePlaceResultItems,damageName);
    }
    this.SelectKindOfDamage = async function(damageKind) {
        await gCommonControls.SelectDropdownList(kindOfDamageButton,damageKindResultItems,damageKind);
    }
    this.SelectReasonOfDamage = async function(damageReason) {
        await gCommonControls.SelectDropdownList(reasonForDamageButton,damageReasonResultItems,damageReason);
    }

    this.GetPlaceOfDamage = function() {
        var placeBox = placeOfDamageButton.$('a');
        return placeBox.getAttribute('title');
    }
    this.GetKindOfDamage = function() {
        var kindBox = kindOfDamageButton.$('a');
        return kindBox.getAttribute('title');
    }
    this.GetReasonOfDamage = function() {
        var reasonBox = reasonForDamageButton.$('a');
        return reasonBox.getAttribute('title');
    }

    // ***** goods information *******//
    var goodsCodeButton = element(by.model('claim.transport.goodsCode')).$('fieldset>div');
    var goodsCodeResultItems = goodsCodeButton.$$('div>ul>li');
    this.SelectGoodsCode = async function(goodsCode) {
        await gCommonControls.SelectDropdownList(goodsCodeButton,goodsCodeResultItems,goodsCode);
    }
   
    this.GetGoodsCode = function() {
        var goodBox = goodsCodeButton.$('a');
        return goodBox.getAttribute('title');
    }
    // ***** transport information ********//
    var transportModeButton = element(by.model('claim.transport.mode')).$('fieldset>div');
    var transportModeResultItems = transportModeButton.$$('div>ul>li');
    this.SelectTransportMode = async function(transportMode) {
        await gCommonControls.SelectDropdownList(transportModeButton,transportModeResultItems,transportMode);
    }
    this.GetTransportMode = function() {
        var transportBox = transportModeButton.$('a');
        return transportBox.getAttribute('title');
    }

    // ***** claim parties ********//
    var claimantBox = element(by.model('claim.claimant'));
    var claimOfficeBox = element(by.model('claim.claimedBranch'));
    var responsibleOfficeBox = element(by.model('claim.responsibleBranch'));
    this.SelectClaimant = async function(claimantName) {
        await gCommonControls.SelectNewPartyBox(claimantBox,claimantName);
    }
    this.SelectClaimOffice =  async function(claimOfficeName) {
        await gCommonControls.SelectNewPartyBox(claimOfficeBox,claimOfficeName);
    }
    this.SelectResponsibleOffice =  async function(responsibleOfficeName) {
        await gCommonControls.SelectNewPartyBox(responsibleOfficeBox,responsibleOfficeName);
    }
    // modify 
    this.ModifyClaimant = async function(claimantName) {
        await gCommonControls.SelectModifyPartyBox(claimantBox,claimantName);
    }
    this.ModifyClaimOffice =  async function(claimOfficeName) {
        await gCommonControls.SelectModifyPartyBox(claimOfficeBox,claimOfficeName);
    }
    this.ModifyResponsibleOffice =  async function(responsibleOfficeName) {
        await gCommonControls.SelectModifyPartyBox(responsibleOfficeBox,responsibleOfficeName);
    }
    this.GetClaimant = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(claimantBox);
        return boxElement;
    }
    this.GetClaimOffice = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(claimOfficeBox);
        return boxElement;
    }
    this.GetResponsibleOffice = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(responsibleOfficeBox);
        return boxElement;
    }

    // ***** transport parties ******//
    var principalBox = element(by.model('claim.principal'));
    var consignorBox = element(by.model('claim.transport.shipper'));
    var conveyorBox = element(by.model('claim.transport.conveyor'));

    this.SelectPrincipal = async function(principalName) {
        await gCommonControls.SelectNewPartyBox(principalBox,principalName);
    }
    this.SelectConsignor = async function(consignorName) {
        await gCommonControls.SelectNewPartyBox(consignorBox,consignorName);
    }
    this.SelectConveyor = async function(conveyorName) {
        await gCommonControls.SelectNewPartyBox(conveyorBox,conveyorName);
    }
    // modify 
    this.ModifyPrincipal = async function(principalName) {
        await gCommonControls.SelectModifyPartyBox(principalBox,principalName);
    }
    this.ModifyConsignor = async function(consignorName) {
        await gCommonControls.SelectModifyPartyBox(consignorBox,consignorName);
    }
    this.ModifyConveyor = async function(conveyorName) {
        await gCommonControls.SelectModifyPartyBox(conveyorBox,conveyorName);
    }
    this.GetPrincipal = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(principalBox);
        return boxElement;
    }
    this.GetConsignor = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(consignorBox);
        return boxElement;
    }
    this.GetConveyor = async function() {
        var boxElement = await gCommonControls.GetPartyBoxName(conveyorBox);
        return boxElement;
    }

    // ***** currency ********//
    var currencyButton = element(by.model('fi.displayCurrency')).$('fieldset>div');
    var currencyResultItems = currencyButton.$$('div>ul>li');
    this.SelectCurrency = async function(currency) {
        await gCommonControls.SelectDropdownList(currencyButton,currencyResultItems,currency);
    }
    this.GetCurrency = function() {
        var currencyBox = currencyButton.$('a');
        return currencyBox.getAttribute('title');
    }
    
    // ***** insurer/policy *****// 
    // policy dropdown list style is different from normal drop down list
    var policyButton = $('[ng-model="claim.policy"]+div');
    //var policyReadButton = $('.chosen-container.chosen-container-single.form-control.input.ng-pristine.ng-untouched.ng-valid.ng-valid-required.claim-policy')
    var policyResultItems = policyButton.$$('div>ul>li');
    this.SelectPolicy = async function(policy) {
        await gCommonControls.SelectDropdownList(policyButton,policyResultItems,policy);
    }
    this.GetPolicy = async function() { 
        var policyBox = policyButton.$('a');
        return policyBox.getAttribute('title');
    }
    // add this function
    this.IsContainPolicyList = async function(policyName) { 
        await policyButton.click();
        await browser.wait(ExpectedConditions.visibilityOf(policyResultItems.get(0)),2000);
        policyResultItems = await policyButton.$$('div>ul>li');
        var len = policyResultItems.length;
        var isContain = false;
    
        for(var i = 0;i<len;i++) {
            var item = policyResultItems[i];
            var acturalName = '';
            await item.getText().then(function(text) {
                console.log(text);
                acturalName = text;
             });
             if(acturalName ==policyName) {
                 isContain = true;
             }
       }
       return isContain;
    }
    this.IsPolicyEnabled = async function() { 
        var isEnabled = true;
        await policyButton.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('disabled') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }

    var maxLiabilityInput = element(by.model('fi.maxLiability')).$('div>.row>div:first-child>input');
    this.InputMaxLiability = async function(maxLiability) {
        await maxLiabilityInput.clear();
        await maxLiabilityInput.sendKeys(maxLiability);
    }
    this.GetMaxLiability = function() {
        return maxLiabilityInput.getAttribute('value');
    }

    // ***** requested amounts information *****//
    var claimedAmountInput = element(by.model('fi.claimedAmount')).$('div>.row>div:first-child>input');
    this.InputClaimedAmount = async function(claimedAmount) {
        await claimedAmountInput.clear();
        await claimedAmountInput.sendKeys(claimedAmount);
    }
    this.GetClaimedAmount = function() {
        return claimedAmountInput.getAttribute('value');
    }
    this.IsClaimedAmountEnabled = async function()  {
        var isEnabled = true;
        await claimedAmountInput.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('untouched') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }

    // ***** reserve information ******//   
    var initialProvisionsInput = element(by.model('fi.initialProvisions')).$('div>.row>div:first-child>input');
    this.InputInitialProvision = async function(initialProvision) {
        await initialProvisionsInput.clear();
        await initialProvisionsInput.sendKeys(initialProvision);
    }
    var openProvisionLabel = $$('.ng-scope>.sum').get(0);
    var transferProvisionLabel = $$('.ng-scope>.sum').get(1);
    var totalProvisionLable = $$('.ng-scope>.sum').get(2);
    this.GetOpenProvision = function() {
        return openProvisionLabel.$('lable:last-child');
    }
    this.GetTransferProvision = function() {
        return transferProvisionLabel.$('lable:last-child');
    }
    this.GetTotalProvisio = function() {
        return totalProvisionLable.$('lable:last-child');
    }

    this.CloseTopTips = async function() {
        //await gCommonControls.CloseAboveTips();
        await gCommonControls.DismissMessage();
    }

    // **** add incident *****//
    this.AddNewIncident = async function(description) {
        await browser.wait(ExpectedConditions.elementToBeClickable(assignIncidentTool,5000));
        await assignIncidentTool.click();
        var claimIncident = require('../pages/claimIncident-page');
        await claimIncident.AddIncident(description);
    }
    this.SelectExistedIncident = async function(description) {
        await browser.wait(ExpectedConditions.elementToBeClickable(assignIncidentTool,5000));
        await assignIncidentTool.click();
        var claimIncident = require('../pages/claimIncident-page');
        await claimIncident.SearchDetailIncident(description);
    }

    // ***** get claim reference ******//
    this.GetClaimReference = async function() {
        var claimID = '';
        await claimReference.getText().then(function(text) {
            console.log(text);
            claimID = text;
        });
        return claimID;
        };
    // *** Get incicent Name element ******//
    this.GetIncidentNameElement = async function() {
        return IncidentName;
    }

    // ***** tasks assigned claim *****// 
    this.TasksAssignedClaim = async function() {
        await tasksTab.click();
        var temp = await element.all(by.repeater('t in tasksShown').column('taskType'));
        
        for(var i = 0;i < temp.length;i++) {
            var findEqual = false;
            await temp[i].getText().then(function(text) {
                    if(text == 'Active Reminder') {
                        temp[i].click();
                        findEqual = true;
                        return;
                    }           
            });
            // if you find the equal text, it must return,or it will throw error
            if(findEqual == true) {
                return;
            }
        }
    }


    // ***** addition properties *******//////
    var damagePieces = element(by.model('claim.damagedPiecesCount'));
    this.DamagePiecesInput = async function (number) {
        await damagePieces.clear();
        await damagePieces.sendKeys(number);
    }
    this.GetDamagePieces = async function()  {
        return damagePieces.getAttribute('value');
    }
   
    var damageWeight = element(by.model('claim.damagedWeight.value'));
    this.DamageWeightInput = async function (weight) {
        await damageWeight.clear();
        await damageWeight.sendKeys(weight);
    }
    this.GetDamageWeight = async function()  {
        return damageWeight.getAttribute('value');
    }

    // total pieces
    var totolPieces = element(by.model('claim.transport.totalPieces'));
    this.TotalPiecesInput = async function (number) {
        await totolPieces.clear();
        await totolPieces.sendKeys(number);
    }
    this.GetTotalPieces = async function()  {
        return totolPieces.getAttribute('value');
    }
    // total weight 
    var totalWeight = element(by.model('claim.transport.totalWeight.value'));
    this.TotalWeightInput = async function (number) {
        await totalWeight.clear();
        await totalWeight.sendKeys(number);
    }
    this.GetTotalWeight = async function()  {
        return totalWeight.getAttribute('value');
    }

    // package type
    var packageType = element(by.model('claim.transport.packing')).$('fieldset>div');
    var packageResultItems = packageType.$$('div>ul>li');
    this.SelectPackageType = async function(name) {
        await gCommonControls.SelectDropdownList(packageType,packageResultItems,name);
    }  
    this.GetPackageType = function() {
        var packageBox = packageType.$('a');
        return packageBox.getAttribute('title');
    }
    

    // ***** Freight Term *******//
    var freightTermButton = element(by.model('claim.transport.freightTerm')).$('fieldset>div');
    var freightResultItems = freightTermButton.$$('div>ul>li');
    this.SelectFreightTerm = async function(name) {
        await gCommonControls.SelectDropdownList(freightTermButton,freightResultItems,name);
    }
   
    this.GetFreightTerm = function() {
        var freightTermBox = freightTermButton.$('a');
        return freightTermBox.getAttribute('title');
    }

    // inco Term 
    var incoTermButton = element(by.model('claim.transport.incoTerms')).$('fieldset>div');
    var incoResultItems = incoTermButton.$$('div>ul>li');
    this.SelectIncoTerm = async function(name) {
        await gCommonControls.SelectDropdownList(incoTermButton,incoResultItems,name);
    }
   
    this.GetIncoTerm = function() {
        var incoTermBox = incoTermButton.$('a');
        return incoTermBox.getAttribute('title');
    }

    // transport type
    var transportTypeButton = element(by.model('claim.transport.type')).$('fieldset>div');
    var typeResultItems = transportTypeButton.$$('div>ul>li');
    this.SelectTransportType = async function(name) {
        await gCommonControls.SelectDropdownList(transportTypeButton,typeResultItems,name);
    }
   
    this.GetTransportType = function() {
        var transportTypeBox = transportTypeButton.$('a');
        return transportTypeBox.getAttribute('title');
    }

    // Product    
    var productButton = element(by.model('claim.transport.product')).$('fieldset>div');
    var productResultItems = productButton.$$('div>ul>li');
    this.SelectProduct = async function(name) {
        await gCommonControls.SelectDropdownList(productButton,productResultItems,name);
    }
   
    this.GetProduct = function() {
        var productBox = productButton.$('a');
        return productBox.getAttribute('title');
    }
    // product option
    var productOption = element(by.model('claim.transport.productOption'));
    this.ProductOptionInput = async function(name) {
        await productOption.clear();
        await productOption.sendKeys(name);
    }
    this.GetProductOption = function() {
        return productOption.getAttribute('tooltip');
    }
    // claim remarks
    var claimRemarks = element(by.model('claim.remarks'));
    this.ClaimRemarksInput = async function(name) {
        await claimRemarks.clear();
        await claimRemarks.sendKeys(name);
    }
    this.GetClaimRemarks = function() {
        return claimRemarks.getAttribute('value');
    }
    // update message
    var updateMessage = element(by.model('claim.updateMessage'));
    this.UpdateMessageInput = async function(name) {
        await updateMessage.clear();
        await updateMessage.sendKeys(name);
    }
    this.GetUpdateMessage = function() {
        return updateMessage.getAttribute('value');
    }
    // insurer claim no
    var insurerClaimNo = element(by.model('claim.insurerClaimNumber'));
    this.InsurerClaimNoInput = async function(name) {
        await insurerClaimNo.clear();
        await insurerClaimNo.sendKeys(name);
    }
    this.GetInsurerClaimNo = function() {
        return insurerClaimNo.getAttribute('value');
    }
    // Freight charges
    var freightCharge = $('[ng-model="fi.freightCharge"]>div>div:last-child>div:first-child>input');
    this.FreightChargeInput = async function(name) {
        await freightCharge.clear();
        await freightCharge.sendKeys(name);
    }
    this.GetFreightCharge = function() {
        return freightCharge.getAttribute('value');
    }
    // value goods
    var valueOfGoods = $('[ng-model="fi.goodsValue"]>div>div:last-child>div:first-child>input');
    this.ValueOfGoodsInput = async function(name) {
        await valueOfGoods.clear();
        await valueOfGoods.sendKeys(name);
    }
    this.GetValueOfGoods = function() {
        return valueOfGoods.getAttribute('value');
    }
    // insurance premium
    var insurancePremium = $('[ng-model="fi.insurancePremium"]>div>div:last-child>div:first-child>input');
    this.InsurancePremiumInput = async function(name) {
        await insurancePremium.clear();
        await insurancePremium.sendKeys(name);
    }
    this.GetInsurancePremium = function() {
        return insurancePremium.getAttribute('value');
    }
    // amount lawyer
    var amountLawyer = $('[ng-model="fi.requestedAmountLawyer"]>div>div:last-child>div:first-child>input');
    this.AmountLawyerInput = async function(number) {
        await amountLawyer.clear();
        await amountLawyer.sendKeys(number);
    }
    this.GetAmountLawyer = function() {
        return amountLawyer.getAttribute('value');
    }
    // amount surveyor
    var amountSurveyor = $('[ng-model="fi.requestedAmountSurveyor"]>div>div:last-child>div:first-child>input');
    this.AmountSurveyorInput = async function(number) {
        await amountSurveyor.clear();
        await amountSurveyor.sendKeys(number);
    }
    this.GetAmountSurveyor = function() {
        return amountSurveyor.getAttribute('value');
    }
    // amount others
    var amountOthers = $('[ng-model="fi.requestedAmountOthers"]>div>div:last-child>div:first-child>input');
    this.AmountOthersInput = async function(number) {
        await amountOthers.clear();
        await amountOthers.sendKeys(number);
    }
    this.GetAmountOthers = function() {
        return amountOthers.getAttribute('value');
    }


    // reserve Expected Recovery
    var expectedRecovery = element(by.model('fi.expectedRecoveryInsurance'));
    var expectedRecoveryInput = expectedRecovery.$('[ng-model="money.value"]');
    this.SetExpectedRecovery = async function(number) {
        await expectedRecoveryInput.clear();
        await expectedRecoveryInput.sendKeys(number);
    }
    this.IsExpectedRecoveryEnabled = async function()  {
        var isEnabled = true;
        await expectedRecoveryInput.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('untouched') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }
    // Financial Remarks
    // settlement code
    var settlementCode = element(by.model('fi.settlementCode')).$('fieldset>div');
    var settlementCodeResultItems = settlementCode.$$('div>ul>li');
    this.SetSettlementCode = async function(name) {
        await gCommonControls.SelectDropdownList(settlementCode,settlementCodeResultItems,name);
    }
    this.IsSettlementCodeEnabled = async function() { 
        var isEnabled = true;
        await settlementCode.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('disabled') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }
    this.GetSettlementCode = async function(name) {
        var settlementText = settlementCode.$('a');
        return settlementText.getAttribute('title');
    }
    // Recovery code
    var recoveryCode = element(by.model('claim.recoveryCode')).$('fieldset>div');
    var recoveryCodeResultItems = recoveryCode.$$('div>ul>li');
    this.SetRecoveryCode= async function(name) {
        await gCommonControls.SelectDropdownList(recoveryCode,recoveryCodeResultItems,name);
    }
    this.IsRecoveryCodeEnabled = async function() { 
        var isEnabled = true;
        await recoveryCode.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('disabled') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }

    // Finance remarks
    var financialRemarks = element(by.model('claim.financialRemarks'));
    this.InputFinancialRemarks = async function(remarks) {
        await financialRemarks.clear();
        await financialRemarks.sendKeys(remarks);
    }

    this.IsFinancialRemarksEnabled = async function()  {
        var isEnabled = true;
        await financialRemarks.getAttribute('class').then(function(text) {
            var temp = true;
            if(text.indexOf('untouched') >-1) {
                temp = false;
            }
            isEnabled = temp;
        });
        return isEnabled;
    }

    // claim received date
    var receivedDateInput = element(by.model('claim.receiveDate')).$('div>div>input');
    this.GetReceivedDate =  function() {
        return receivedDateInput.getAttribute('value');
    }

    // claim confirmed date   
    var confirmedDateInput = element(by.model('claim.confirmDate')).$('div>div>input');
    this.GetConfirmedDate =  function() {
        return confirmedDateInput.getAttribute('value');
    }

    // transport datet
    var transportDateInput = element(by.model('claim.transport.transportDate')).$('div>div>input');
    this.GetTransportDate =  function() {
        return transportDateInput.getAttribute('value');
    }
    this.SelectTransportDate = async function(transportDate) {
        var len = 0;
        await transportDateInput.getAttribute('value').then(function(text) {
           len = text.length;
        });
        for(var i=0;i<len;i++) {
            await transportDateInput.sendKeys(protractor.Key.BACK_SPACE);
          }
        await transportDateInput.sendKeys(transportDate);
    }
};
module.exports = new NewClaimPage();
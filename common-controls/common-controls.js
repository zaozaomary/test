//common-controls.js
var CommonControls = function () {
     // about webclaims common controls
    // 1. drop-down list
    this.SelectDropdownList = async function(inputElement,resultElements,inputText) {
        await inputElement.click();
        await browser.wait(ExpectedConditions.visibilityOf(resultElements.get(0)),2000);
        await selectFilterType(inputText,resultElements);
    }

    async function selectFilterType(inputText,resultElements) {
        await resultElements.filter(function(elem,index) {
                  return elem.getText().then(function(text) {
                      return text === inputText;
            })
         }).first().click();
    }

    // 2. select party box,modify party
    var searchInputElement = $('#select2-drop>div>input');
    var firstResultElement = $('#select2-drop>ul>li:first-child');
    this.SelectModifyPartyBox = async function(partyBoxElement,partyName) {
        var modifyElement = partyBoxElement.$('div>.party-part>div>span:nth-child(2)');
        await browser.actions().mouseMove(partyBoxElement).perform();
        await modifyElement.click();
        await browser.wait(ExpectedConditions.visibilityOf(firstResultElement),4000);
        await searchInputElement.sendKeys(partyName);
        await browser.sleep(2000);
        await firstResultElement.click();
    }

     // 3. select party box,new party
     this.SelectNewPartyBox = async function(partyBoxElement,partyName) {
        var modifyElement = partyBoxElement.$('div>.party-part>div>span:nth-child(1)');
        await browser.actions().mouseMove(partyBoxElement).perform();
        await modifyElement.click();
        await browser.wait(ExpectedConditions.visibilityOf(firstResultElement),4000);
        await searchInputElement.sendKeys(partyName);
        await browser.sleep(2000);
        await firstResultElement.click();
    }

    // 4. Get party box name
    this.GetPartyBoxName = async function(partyBoxElement) {  
        var editModeElement = partyBoxElement.$('div>div:first-child>div>div>.wc-animate+div+div'); 
        var partyNameElement = editModeElement.$('div>div:last-child>p:first-child>strong');
        return partyNameElement;
    }

    // 5. alert tips above the top
    this.CloseAboveTips = async function()  {
        await $$('.alert.alert-warning').count().then(function(number) {
         var i = parseInt(number);
         var temp = i;
         while(i >= 1) {
            $$('.alert.alert-warning>button').first().click();
            i--;
         }
         return temp;
        });    
    }

    this.DismissMessage = async function() {
        await  element.all(by.css('.alert button.close')).click();
    }

    // 6. table
    this.TableDoubleClickRow =  async function(ngRepeatName,columnName,keyStr)  {
        var temp = await element.all(by.repeater(ngRepeatName).column(columnName));
        for(var i = 0;i < temp.length;i++) {
            var findEqual = false;
            await temp[i].getText().then(function(text) {
                    if(text == keyStr) {
                        browser.actions().mouseMove(temp[i]).doubleClick().perform();
                        findEqual = true;                       
                        return;
                    }           
            });
            // if you find the equal text, it must return,or it will throw error
            if(findEqual == true) {
                return;
            }
        }
    };

    // 7. search item control,the third control is "select"
    this.SearchItemControlSelect = async function(searchItemElement,searchText1,searchText2,searchText3)  {
        var tempElements = searchItemElement.$$(div>div);
        var subElement1 = tempElements.get(0);
        var subElement2 = tempElements.get(1);
        var subElement3 = tempElements.get(2);
        // click sub-element
        var subResultElements1 = subElement1.$$('div>div>ul>li');
        var subResultElements2 = subElement2.$$('div>div>ul>li');
        var subResultElements3 = subElement3.$$('div>div>ul>li');
        await subElement1.click();
        await selectFilterType(searchText1,subResultElements1);
        await subElement2.click();       
        await selectFilterType(searchText2,subResultElements2);
        await subElement3.click();       
        await selectFilterType(searchText3,subResultElements3);
    };
   
      // 8. search item control,the third control is "input"
      this.SearchItemControlInput = async function(searchText1,searchText2,searchText3)  {
        var subElement1 = $('#searchForm>ul>li>div>div:nth-child(1)');
        var subElement2 = $('#searchForm>ul>li>div>div:nth-child(2)');
        var subElement3 = $('#searchForm>ul>li>div>div:nth-child(3)');
        // click sub-element
        var subResultElements1 = subElement1.$$('div>div>ul>li');
        var subResultElements2 = subElement2.$$('div>div>ul>li');
        var subInputElement = subElement3.$('input');
        await subElement1.click();
        await selectFilterType(searchText1,subResultElements1);
        await subElement2.click();       
        await selectFilterType(searchText2,subResultElements2);
        await subElement3.click(); 
        await subInputElement.clear();   
        await subInputElement.sendKeys(searchText3);
    };
    this.SearchItemControlAdd = async function(searchItemElement) {
        var addButton = searchItemElement.$('div>div:last-child>span>button:first-child');
        await addButton.click();
    };

    this.SearchItemControlDelete = async function(searchItemElement) {
        var deleteButton = searchItemElement.$('div>div:last-child>span>button:last-child');
        await deleteButton.click();
    };
    // in order to search conveniently, close extra search item controls
    this.SearchItemControlManage = async function(remainSearchControlNum) {
        await element.all(by.repeater('criterion in selectedCriteria')).count().then(function(number) {
            var i = parseInt(number);
            while(i > remainSearchControlNum) {
               var searchItemElement = element.all(by.repeater('criterion in selectedCriteria')).first();
               var deleteButton = searchItemElement.$('div>div:last-child>span>button:last-child');
               deleteButton.click();
               i--;
            }
        });
        };
        
     // waiting control 
     this.WaitingPanel = $('[ng-show="state.blocking"]');
     this.WaitUntilPanel_Invisable = async function(milliSeconds) {
       await browser.wait(ExpectedConditions.invisibilityOf(this.WaitingPanel),milliSeconds);
     }
     
     var blockElement = $('div.block-ui-overlay.ng-hide');
     this.WaitForPageBlockerToDisappear = async function() {
      await browser.wait(ExpectedConditions.presenceOf(blockElement),5000);
     }
    };

   


module.exports = new CommonControls();
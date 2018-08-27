//legalEntitySetting-page
var LegalEntitySettingPage = function()  {
    var tabItems = $$('#leForm>div>div>ul>li');
    var generalTab = tabItems.get(0);
    var postingTab = tabItems.get(1);
    var businessPartnerTab = tabItems.get(2);
    var fieldTab =  tabItems.get(3);
    var communicationTab = tabItems.get(4);
    var tasksTab =  tabItems.get(5);
    var saveBtn = element(by.buttonText('Save'));
    var cancelBtn = element(by.buttonText('Cancel'));

    this.FieldTab = fieldTab;

    this.SaveBtnClick = async function() {
        await browser.actions().mouseMove(saveBtn).perform();
        var disableTag = null;
        await saveBtn.getAttribute('disabled').then(function(text) {
            disableTag = text;
        });
        if(disableTag == 'true') {
          await cancelBtn.click();
          return false;
        }
        else {
          await saveBtn.click();
          return true;
        }      
    }

    this.CancelBtnClick = async function() {
        await  browser.actions().mouseMove(cancelBtn).perform();
        await  cancelBtn.click();
    }
 
    //var tableRows = $$('#leForm > div > div > div > div.tab-pane.ng-scope.active > div > data-ng-include > div > table > tbody > tr');
    var tableRow_css = '#leForm > div > div > div > div.tab-pane.ng-scope.active > div > data-ng-include > div > table > tbody > tr';
    this.SelectFieldFromTable = async function(name,selectName) {
        var tableRows = await $$(tableRow_css);
        for(var i = 0;i<tableRows.length;i++) {
            var findEqual = false;
            var j = i + 1;
            var rowLabel_css = tableRow_css + ':nth-child('+ j.toString() +')>td:nth-child(1)';
            var label_element = $(rowLabel_css);
            await label_element.getText().then(function(text) {
                if(text == name) {
                  findEqual = true;
                }});
            if(findEqual == true) {
                var temp_element = $(rowLabel_css+'+td>div');
                //await temp_element.click();
                // current element also hide UI, go to find the next element
                var nextRow_element = null;
                if(j == tableRows.length) {
                    nextRow_element = saveBtn;
                }
                else  {
                    var temp = j + 1;
                    var nextRow_css = tableRow_css + ':nth-child('+ temp.toString() +')';
                    nextRow_element = $(nextRow_css)
                }
                
                await browser.actions().mouseMove(nextRow_element).perform();
                await temp_element.click();
                var dropDown_elements = temp_element.$$('div>ul>li');
                await dropDown_elements.filter(function(elem,index) {
                    return elem.getText().then(function(text) {
                        return text === selectName;
                    })
                }).first().click();                     
                return;
            }
           
        }
        

    }

	

};
module.exports = new LegalEntitySettingPage();
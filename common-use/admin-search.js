//var gCommonControls = require('../common-controls/common-controls');

var AdminSearch = function() {
    this.GroupSearch = async function(groupName) {
       await gCommonControls.TableDoubleClickRow('g in datas','name',groupName);
    }
    this.RolesSearch = async function(roleName) {
        await gCommonControls.TableDoubleClickRow('d in datas','name',roleName);
    }
    this.UserSearch = async function(simsID) {
        await gCommonControls.SearchItemControlManage(1);
        await gCommonControls.SearchItemControlInput('SIMS ID','equals',simsID);
        var searchBtn = element(by.buttonText('Search'));
        await searchBtn.click();
        await gCommonControls.TableDoubleClickRow('u in datas','simsId',simsID);
    }
    this.LegalEntitySearch = async function(legalEntityName) {
        var searchBtn = element(by.buttonText('Search'));
        if(legalEntityName == 'SCHENKER CHINA LTD.' ) {
         await searchBtn.click();
         await selectTable_LegalEntityName(legalEntityName);
        }
        else
        {
           
        }
    }

    var tableRow_css = '[ng-table="tableParams"]>tbody>tr';
    async function selectTable_LegalEntityName(legalEntityName) {
        legalEntityName_css = "[data-title-text='Legal Entity']";
        tableRows = await $$(tableRow_css);
        for(var i = 0;i<tableRows.length;i++) {
            var findEqual = false;
            var j = i + 1;
            row_css = tableRow_css + ':nth-child(' + j.toString()+ ')';
            name_css = row_css + '>' + legalEntityName_css +'>span>a';
            var item = $(name_css);
            await item.getText().then(function(text) {
                if(text == legalEntityName) {
                    console.log(text);
                    browser.actions().mouseMove(tableRows[i]).doubleClick().perform();
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

    async function tableSearch(ngRepeatName,columnName,keyStr)  {
        var temp = await element.all(by.repeater(ngRepeatName).column(columnName));
        for(var i = 0;i < temp.length;i++) {
            var findEqual = false;
            var item_cssPath = temp[i].locator().vaule +'>span>a';
            await console.log(item_cssPath);
            var item = $(item_cssPath);
            await item.getText().then(function(text) {
                    if(text == keyStr) {
                        console.log(text);
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
}

module.exports = new AdminSearch();
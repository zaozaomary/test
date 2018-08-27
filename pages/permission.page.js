// admin grant permission to normal users
var adminSearch = require('../common-use/admin-search');

var PermissionPage = function() {
    var tabsElement = $$('.container>ng-view>div:last-child>.nav.nav-tabs>li');
    var userTab = tabsElement.get(0);
    var permissionTab = tabsElement.get(1);
    var preferenceTab = tabsElement.get(2);

    this.UserTab = userTab;
    this.PermissionTab = permissionTab;
    this.PreferenceTab = preferenceTab;

    var saveBtn = $('.list-unstyled+input');
    var addPermissionBtn = $('.list-unstyled+input+button');
    var cancelBtn = $('.list-unstyled+input+button+button');

    var roleElement = element.all(by.repeater('permission in profile.permissions')).last();

    // ...rest means the input arguments can changeable
    async function selectRoleAndLegalEntity(roleName,...rest) {
        await addPermissionBtn.click();
        var selectRole = roleElement.$("[ng-model='permission.role']");
        await gCommonUse.BrowserScrollBy(100);
        //await selectRole.click();
        await browser.actions().mouseMove(selectRole).click().perform();
        await selectRole.click();
        await roleElement.$$("[ng-model='permission.role']>option").filter(function(item,index) {
            return item.getText().then(function(text) {
                return text == roleName;
            })
        }).first().click();
        await gCommonUse.BrowserScrollBy(100);
        // must click 'Legal Entity'.
        var legalEntityBtn = roleElement.$('#permissionLE');
        await legalEntityBtn.click();
        var addButton = roleElement.$('.list-inline.list-group>li:last-child>a');
        var currentEntity = element.all(by.repeater('r in permission.restrictions')).last();
        var totalEntity = rest.length;
        var searchInputText = $('#select2-drop>div>input');
        var firstResultItem = $('#select2-drop>ul>li:first-child');        
        for(var i = 0;i < rest.length;i++) {
            if(i != 0) {
             await addButton.click();
            }
            var entityBox = currentEntity.element(by.model('r.legalEntity'));
            await selectLegalEntity(entityBox,rest[i],searchInputText,firstResultItem);
            if(i == rest.length-1) {
                break;
            }
            else  {
                await addButton.click();
            }
        }
        await gCommonUse.BrowserScrollBy(100);
        await saveBtn.click(); 
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);    
    }

    async function selectLegalEntity(partyBoxElement,partyName,searchInputElement,firstResultElement) {
        var modifyElement = partyBoxElement.$('div>.party-part>div>span:nth-child(1)');
        await browser.actions().mouseMove(partyBoxElement).perform();
        await modifyElement.click();
        await browser.wait(ExpectedConditions.visibilityOf(firstResultElement),4000);
        await searchInputElement.sendKeys(partyName);
        await browser.sleep(2000);
        await firstResultElement.click();
    }
    
    // this function includes logining,choosing menus
    this.GrantPermission = async function(simsID,roleName,...rest) {
        await gCommonUse.AdminMenuSetting('Security','User Search');
        await adminSearch.UserSearch(simsID);
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await permissionTab.click();
        await gCommonUse.BrowserScrollBy(800);
        await selectRoleAndLegalEntity(roleName,...rest);
        await gCommonUse.BrowserScrollTo(0);
    }

    this.DeletePermission = async function(userName,roleName) {
        await gCommonUse.AdminMenuSetting('Security','User Search');
        await adminSearch.UserSearch(userName);
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
        await permissionTab.click();
        await gCommonUse.BrowserScrollBy(800);


        var allRoles = await element.all(by.repeater('permission in profile.permissions'));
        for(var i = 0;i<allRoles.length;i++) {
            var findRole = false;
            var role = allRoles[i];
            var roleNameElement = role.$("[ng-model='permission.role']");
            var roleValue ='';
            await roleNameElement.getAttribute('value').then(function(text) {
              console.log(text);
              roleValue = text;
            })
            var currentName = await getRoleName_fromValue(role,roleValue);
            await browser.actions().mouseMove(roleNameElement).perform(); 
            if(currentName == roleName) {
                var deleteItem = role.$("[ng-click='removePermission(permission)']");
                await deleteItem.click();
                findRole = true;
            }         
            if(findRole == true) {
                await saveBtn.click(); 
                await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
                return;
            }
        }

    }
    async function getRoleName_fromValue(roleElement,roleValue) {
        var tempElement = await roleElement.$$("[ng-model='permission.role']>option").filter(function(item,index) {
            return item.getAttribute('value').then(function(text) {
                return text == roleValue;
            })
        }).first();
        var roleName = '';
        await tempElement.getText().then(function(text) {
            console.log(text);
            roleName = text;
        })
        return roleName;

    }  
}
module.exports = new PermissionPage();
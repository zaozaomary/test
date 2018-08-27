//common-use.js
var CommonUse = function()  {
    // left toolbar
    var mailIcon = $(".f-widgets.nav.nav-pills>li:first-child>a");
    var nameIcon = $(".f-widgets.nav.nav-pills>li:nth-child(2)");
    var languageIcon = $(".f-widgets.nav.nav-pills>li:last-child>a");
    // user name menu
    var nameMenus = nameIcon.$$("ul>li:last-child>ul>li");
    var preferenceMenuItem = nameMenus.first();
    var editProfileMenuItem = nameMenus.get(1); // index should begin at 0
    var logoutMenuItem = nameMenus.last().$("span>a"); // add "span>a",is the UI cause
    // top tools
    var toolItems = $$('.collapse.navbar-collapse.navbar-ex1-collapse>ul:first-child>li');
    var webclaimTool =  toolItems.get(0);
    var searchClaimTool = toolItems.get(1);
    var searchPostingTool = toolItems.get(2);
    var searchTransportTool = toolItems.get(3);
    var newPreliminaryTool = toolItems.get(4);
    var newClaimTool = toolItems.get(6);
    var newFastEntryTool = toolItems.get(7);
    // webclaim dropdown menu
    var webclaimMenus = webclaimTool.$$('ul>li');
    var overviewMenu = webclaimMenus.get(0);
    var searchContactMenu = webclaimMenus.get(1);
    var searchTaskMenu = webclaimMenus.get(2);
    var searchEmailMenu = webclaimMenus.get(3);
    var batchUploadMenu = webclaimMenus.get(4);
    var informationMenu = webclaimMenus.get(6);
    var reportingMenu =  webclaimMenus.get(7);
    // right setting menu
    var settingMenu = $('.nav.navbar-nav.navbar-right>li:last-child');

    
    this.SearchClaim = async function() {
        await searchClaimTool.click();
    }
    this.SearchPosting = async function() {
        await searchPostingTool.click();
    }
    this.SearchTransport = async function() {
        await searchPostingTool.click();
    }
    this.NewPreliminary = async function() {
        await newPreliminaryTool.click();
    }

    this.NewClaim = async function() {
        await newClaimTool.click();
    }

    this.NewFastEntry = async function() {
        await newFastEntryTool.click();
    }
   
   // click webclaim menus
    this.Overview = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(overviewMenu),2000);
        await overviewMenu.click();
    } 
   this.SearchContract = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(searchContactMenu),2000);
        await searchContactMenu.click();
    }
    this.SearchTask = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(searchTaskMenu),2000);
        await searchTaskMenu.click();
    }
    this.SearchEmail = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(searchEmailMenu),2000);
        await searchEmailMenu.click();
    }
    this.BatchUpload = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(batchUploadMenu),2000);
        await batchUploadMenu.click();
    }
    this.Information = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(informationMenu),2000);
        await informationMenu.click();
    }
    this.Reporting = async function() {
        await webclaimTool.click();
        await browser.wait(ExpectedConditions.visibilityOf(reportingMenu),2000);
        await reportingMenu.click();
    }

    this.Logout = async function() {
        var nameLabel = nameIcon.$('a>div');
        await nameLabel.click();
        await browser.wait(ExpectedConditions.visibilityOf(logoutMenuItem,5000));
        await browser.actions().mouseMove(logoutMenuItem).click().perform();
        await browser.sleep(1000); // add this,because different user login and logout, must wait several seconds
    }
    ////**** setting permission of admin *******///
    // if there is no sub-menu, you could input nothing
    var adminMenuPanel_cssPath = '.dropdown-menu.dropdown-menu-right';
    this.AdminMenuSetting = async function(menuName, subMenuName) {
        await settingMenu.click();
        menu_cssPath = adminMenuPanel_cssPath + '>li'
        menusElements = await $$(menu_cssPath);
        for(var i = 0;i< menusElements.length;i++) {
           var name = '';
           await menusElements[i].getText().then(function(text) {
              name = text;
            });
            if(name == menuName) {
                await menusElements[i].click();
                if(subMenuName == undefined) {
                    return;
                }
                else {
                    index = i + 1;
                    subMenu_cssPath = menusElements[i].locator().value + ':nth-child('+index.toString()+
                    ')>ul>li';
                    subMenuElements = $$(subMenu_cssPath);      
                    await subMenuElements.filter(function(elem,index) {
                        return elem.getText().then(function(text) {
                            return text === subMenuName;
                        })
                    }).first().click();
                    return;
                }
            }
        }
     
    }

    //the scrollbar of browser
    this.BrowserScrollBy = async function(number) {
       await browser.executeScript('window.scrollBy(0,arguments[0])',number);
    }
    this.BrowserScrollTo = async function(number) {
        await browser.executeScript('window.scrollTo(0,arguments[0])',number);
     }

     // double click of an element 
     this.DoubleClick = async function(element) {
         await browser.actions().mouseMove(element).doubleClick().perform();
     }
     
    // relativeDays : '-3','0','1','3',such on
    this.GetFormatDate = function(relativeDays) {
        var isMinus = false;
        if(relativeDays.indexOf('-')>-1) {
            isMinus = true;
        }
        relativeDays = parseInt(relativeDays);
        var n = Math.abs(relativeDays);
        var d = new Date();
        if(isMinus) {
            d.setDate(d.getDate() - n);
        }
        else {
            d.setDate(d.getDate() + n);
        }
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;

     }

     // the date time format
     this.GetBeforeFormatDate = function(beforeDays) {
        var n = beforeDays;
        var d = new Date();
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
     }

     this.GetAfterFormatDate = function(afterDays) {
        var d = new Date();
        d.setDate(d.getDate() + afterDays);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
     }

     // update data from administrator
     this.UpdateData = async function() {
       await this.AdminMenuSetting('System Toolbox');
       var updateBtn = $('[ng-click="updateMasterData()"]');
       await updateBtn.click();
     }

     this.getDate_from_YAML = function(path) {
        var testData =  gYAML.load(path);  
        for (var test in testData) {
            return testData[test];
        }
    }


   
    
};
module.exports = new CommonUse();
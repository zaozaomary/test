
var ClaimTasksTab = function()  {
    var btnCollection = $$('#tasksTable>div>button');
    var docBtn = btnCollection.get(0);
    var manualTaskBtn = btnCollection.get(1);
    var markBtn = btnCollection.get(2);
    var openCheckbox = $('[ng-model="taskOpen"]>label');
    var cancelCheckbox = $('[ng-model="taskCanceled"]>label');
    var rejectCheckbox = $('[ng-model="taskRejected"]>label');
    var doneCheckbox = $('[ng-model="taskDone"]>label');

    var rowsElements = element.all(by.repeater('t in tasksShown'));

    this.selectTaskByTypeFrom = async function(typeName,formUserName) {
        var findRow = await  findTaskRow(typeName,formUserName);
        await  browser.actions().mouseMove(findRow).doubleClick().perform();
    }

    // there are three status:open,cancelled,done
    this.GetTask_IconType = async function(typeName,formUserName) {
        var findRow = await findTaskRow(typeName,formUserName);
        var columns = findRow.$$('td');
        var type = columns.get(0).$('a>i');
        var statusStr = '';
        await type.getAttribute('title').then(function(text) {
            statusStr = text;
         });
         return statusStr;
    }
    
    this.AcceptAssignedClaim = async function(typeName,formUserName) {
        await browser.executeScript('window.scrollBy(0,arguments[0])',500);
        var findRow = await findTaskRow(typeName,formUserName);
        await browser.actions().mouseMove(findRow).doubleClick().perform();
        var assignedDialog = require('../pages/assign-claim.dialog');  
        await assignedDialog.AcceptButton.click();
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
    }

    this.RejectAssignedClaim = async function(typeName,formUserName) {
        await browser.executeScript('window.scrollBy(0,arguments[0])',500);
        var findRow = await findTaskRow(typeName,formUserName);
        await browser.actions().mouseMove(findRow).doubleClick().perform();
        
        var assignedDialog = require('../pages/assign-claim.dialog');  
        await assignedDialog.InputReasonForDeny('Automatic deny by mary');
        await assignedDialog.RejectButton.click();
        
        await browser.wait(ExpectedConditions.invisibilityOf(gCommonControls.WaitingPanel),5000);
    }



    async function findTaskRow(typeName,formUserName)  {
        var testElements = await element.all(by.repeater('t in tasksShown').column('taskType'));
        var number = testElements.length;
        var length = '';
        await rowsElements.count().then(function(text) {
             length = text;            
        });
        length = parseInt(length);

        for(var i = 0;i < length;i++) {
            var item = rowsElements.get(i);
            var columns = item.$$('td');
            var type = columns.get(0).$('a');
            var fromWho = columns.get(2);
            var acturalType = '';
            var acturalWho = '';
            await type.getAttribute('title').then(function(text) {
               acturalType = text;
            });
            await fromWho.getText().then(function(text) {
                acturalWho = text;
            });
            if(typeName == acturalType && formUserName == acturalWho) {
                return item;
            }
        }     
     }


}

module.exports = new ClaimTasksTab();
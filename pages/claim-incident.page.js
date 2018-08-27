//claimIncident-page.js
var ClaimIncidentPage = function() {
    var searchButton = element(by.buttonText('Search'));
    var addButton = $('.fa.fa-plus');
    var closeButton = element(by.buttonText('Close'));
    // new incident dialog
    var descriptionInput = element(by.model('model.description'));
    var saveIncidentButton =  element(by.buttonText('Create Incident'));
    var closeIncidentButton = element(by.buttonText('Close'));
    // result show
    var resultElement = $('#found');

    this.AddIncident = async function(description) {
        await addButton.click();
        await descriptionInput.sendKeys(description);
        await saveIncidentButton.click();
    }
    this.SearchDetailIncident = async function(description) {
        await browser.wait(ExpectedConditions.elementToBeClickable(searchButton,5000));
        await searchButton.click();       
        await browser.wait(ExpectedConditions.visibilityOf(resultElement,5000));
    var temp = await element.all(by.repeater('t in datas').column('description'));
    for(var i = 0;i < temp.length;i++) {
        var findEqual = false;
        await temp[i].getText().then(function(text) {
                if(text == description) {
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

    }   
};
module.exports = new ClaimIncidentPage();
// page class should inherit BasePage
function BasePage()  {  

}
BasePage.prototype = Object.create({}, {
    absoluteUrl: { get: function() {
        return browser.getLocationAbsUrl();
    }},
    goHome: { value: function() {
        browser.get('overview');
    }}
});
module.exports = BasePage;
    


describe('login in', function() {
      
    
    it('Test login by browser.driver.get', function() {
        browser.driver.get(browser.baseUrl,20000);
        $('#username').sendKeys('MARYMA01');
        $('#password').sendKeys('Abmc%002');
        element(by.buttonText('Sign in')).click();
        console.log('666');
        browser.sleep(5000);
        console.log('ggg');
      });
    })
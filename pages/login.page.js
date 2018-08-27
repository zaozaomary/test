// login-page.js
var LoginPage = function()  {
	var nameInput = $('#username');
	var passwordInput = $('#password');
	var submitBtn = element(by.buttonText('Sign in'));

	this.open =  async function() {
		//browser.waitForAngularEnabled(true);
	    await browser.get(browser.baseUrl,20000);
	
	}
	this.setUsername = async function(name) {
	   await nameInput.sendKeys(name);
	};
	this.setPassword = async function(password) {
	   await passwordInput.sendKeys(password);
	}
	this.submission = async function()  {
	   await submitBtn.click();
	   await browser.sleep(4000);
	}

	//check point
	this.HomeElement = function()  {
		return $(".nav.navbar-nav>li:first-child>a");
	}

};
module.exports = new LoginPage();
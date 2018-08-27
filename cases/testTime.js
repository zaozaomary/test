describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function(done) {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        console.log(originalTimeout);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
        setTimeout(function() {
            console.log("time start");
            console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL)
            done();
        }, 10000);
    });

    it("testTimeout", function(done) {
        //browser.waitForAngularEnabled(false);
        /*setTimeout(function() {
            done();
        }, 9000);*/
        console.log('test');
        done();
        /*setTimeout(function() {
            console.log("time start");
            done();
        }, 8000);*/
    });

    xit("test sleep",function() {
        browser.waitForAngularEnabled(false);
        browser.driver.get("http://www.baidu.com/");
        console.log('sleep start!')
        browser.sleep(2000);
        console.log("sleep end!")
        console.log('test 1');
        console.log('test 2');
        console.log('end');
        
    })



    afterEach(function(done) {
        setTimeout(function() {
            console.log("time end");
            console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL)
            done();
        }, 10000);
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
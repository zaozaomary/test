describe('test asynchonous ', function(){
    var value = 0, originalTimeout;

    beforeEach(function(done){
        //originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        // 设置jasmine超时时间为10秒
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
        setTimeout(function(){
            value += 1;
            // 只有执行done函数,后面的it才会执行
            done();
        }, 200);
    });

    afterEach(function(){
        // 还原jasmine超时时间
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    })

    it('expect value toEqual 1', function(done){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 8000;
        setTimeout(function(){
            expect(value).toEqual(1);
            // 只有执行这个,后面的it才会执行
            done();
        }, 9000);
    });

    it('until above spec complete ', function(done){
        //expect(value).toBe(2);
        setTimeout(function(){
            expect(value).toEqual(2);
            // 只有执行这个,后面的it才会执行
            done();
        }, 7000);
    });


})
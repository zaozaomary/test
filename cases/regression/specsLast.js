describe('CTest testrail',function() {
    var a;
  it('api',async function(){
      expect(false).not.toBe(true);
      var a = {foo:'foo'};
      expect(a.foo).toBeDefined();
      
      
  });



  afterAll(async function() {
   await browser.sleep(8000);
  })

  
})
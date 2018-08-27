describe("long asynchronous specs", function() {
var value=-2;

// setTimeout代表一个异步操作。
beforeEach(function(done) {
  console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
  jasmine.DEFAULT_TIMEOUT_INTERVAL=5000;
  setTimeout(function() {
    value = 0;
    console.log('execute done');
    done();
  }, 7000);
});

// 如果在beforeEach中的setTimeout的回调中没有调用done，最终导致下面的it因超时而失败。
it("should support async execution of test preparation and expectations", function(done) {
  value++;
  console.log(value);
  console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
  expect(value).toBeGreaterThan(0);
  done();
  //setTimeout(function() { done();},7000);
});
})
describe('default login',function() {
  it('login',async function(){
    var path = './test-date/claim/claim-with-all-fields.yaml';
    var testData =  await gYAML.load(path);  
    for (var test in testData) {
      await console.log(test);
      await console.log(testData[test].managingBranch);
      await console.log(testData[test].lossDate);
      await console.log(testData[test].placeOfDamage);
    }
      
  });

  
})
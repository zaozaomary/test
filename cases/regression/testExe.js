
describe('test exe', function() {

  
     it('exe',function()  {
         process.argv.forEach( function (val, index) 
         { 
             console.log(index + ':' + val)
         });
         console.log(process.cwd() + '--' +__filename);
         var currentFolder = process.cwd();
         var currentExe = currentFolder +'\\' + "autoit" + '\\' +'selectFile.exe';
         console.log(currentExe);
         var temp = './../../autoit/selectFile.exe';
         var shell = require('C:/Users/MARYMA01/AppData/Roaming/npm/node_modules/shelljs');
         var path = 'C:/Mary/autoIt/selectFile.exe';
         var task = shell.exec(currentExe);
         
         if(task.code !== 0) {
             shell.echo('failed');
             shell.exit(1);
         }

     });

    });
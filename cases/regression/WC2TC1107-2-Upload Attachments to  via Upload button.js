//WC2TC1107-Variants 2-Upload Attachments to  via Upload button
var newClaimPage = require('../../pages/new-claim.page');
var overviewPage = require('../../pages/overview.page');
var claimPageArgs = require('../../common-use/new-claim.args');
var documentPage = require('../../pages/document.page');
var shell = require('C:/Users/MARYMA01/AppData/Roaming/npm/node_modules/shelljs');


describe('WC2TC1107', function() {
  beforeAll(async function () {
    await overviewPage.RefreshOverview();
    await claimPageArgs.Save();
    await browser.sleep(3000);
    await newClaimPage.DocumentsTab.click();

   })

 
    it('C320-Upload Attachments to via Upload button',async function() {
      await documentPage.UploadBtn.click();
      await browser.sleep(2000);
      var currentFolder = process.cwd() + '\\'+"autoit"+'\\';
      // upload txt
      var txt_exe = 'select_txt.exe';
      var currentExe = currentFolder + txt_exe;
      var task = await shell.exec(currentExe);         
      if(task.code !== 0) {
          shell.echo('upload txt failed');
          shell.exit(1);
        }
      await browser.sleep(2000); // this should be wait a moment. because await is invalid for shell.exec
      await documentPage.Exist_toUpload_table('finance.txt');
      await documentPage.ToUploadBtn.click();
      await browser.wait(ExpectedConditions.invisibilityOf(documentPage.ToUploadBtn,5000));
      await documentPage.Exist_uploaded_table('finance.txt');

      // upload xls
      await documentPage.UploadBtn.click();
      await browser.sleep(2000);
      var xls_exe = 'select_xls.exe';
      var currentExe = currentFolder + xls_exe;
      var task = await shell.exec(currentExe);         
      if(task.code !== 0) {
          shell.echo('upload xls failed');
          shell.exit(1);
        }
      await browser.sleep(2000);
      await documentPage.Exist_toUpload_table('Success-Port.XLS');
      await documentPage.ToUploadBtn.click();
      await browser.wait(ExpectedConditions.invisibilityOf(documentPage.ToUploadBtn,5000));
      await documentPage.Exist_uploaded_table('Success-Port.XLS');

      // upload jpg
      await documentPage.UploadBtn.click();
      await browser.sleep(2000);
      var jpg_exe = 'select_jpg.exe';
      var currentExe = currentFolder + jpg_exe;
      var task = await shell.exec(currentExe);         
      if(task.code !== 0) {
          shell.echo('upload jpg failed');
          shell.exit(1);
        }
      await browser.sleep(2000);
      await documentPage.Exist_toUpload_table('fruit.jpg');
      await documentPage.ToUploadBtn.click();
      await browser.wait(ExpectedConditions.invisibilityOf(documentPage.ToUploadBtn,5000));
      await documentPage.Exist_uploaded_table('fruit.jpg');
      
        

    });

  })

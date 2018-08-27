// document-page.js
var DocumentPage = function()  {
    var uploadBtn = $('#attachmentsUpLoad');
    var toBe_upload_row = $("[ng-repeat='item in uploader.queue track by $index']");
    var toBe_upload_name = $("[ng-repeat='item in uploader.queue track by $index']>td:first-child");
    var toBe_upload_uploadBtn = $("[ng-repeat='item in uploader.queue track by $index']>td:last-child>button:nth-child(1)");
    var toBe_upload_cancelBtn = $("[ng-repeat='item in uploader.queue track by $index']>td:last-child>button:nth-child(2)");
    var toBe_upload_removeBtn = $("[ng-repeat='item in uploader.queue track by $index']>td:last-child>button:nth-child(3)");
    var uploaded_table = $('.table.table-hover.table-condensed.table-striped');

    this.UploadBtn = uploadBtn;
    this.ToUploadBtn = toBe_upload_uploadBtn;

    this.Exist_toUpload_table = async function(fileName) {
        var toUploadName = '';
        await toBe_upload_name.getText().then(function(text) {
            toUploadName = text;
        });
        await expect(fileName).toBe(toUploadName);
    }

    this.Exist_uploaded_table = async function(fileName) {
        var rowsElements = uploaded_table.$$('tbody>tr');
        var length = '';
        await rowsElements.count().then(function(text) {
             length = text;            
        });
        length = parseInt(length);

        for(var i = 0;i < length;i++) {
            var currentFile = '';
            var item = rowsElements.get(i);
            var columns = item.$$('td');
            var type = columns.get(2).$('div>a');
            await type.getText().then(function(text) {
                currentFile = text;
            });
           if(currentFile == fileName) {
               return true;
           }
        }
        return false;
    }
    


}
module.exports = new DocumentPage();
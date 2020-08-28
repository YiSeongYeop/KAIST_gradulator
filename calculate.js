function excelExport(event){
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName){
	        var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
	        console.log(JSON.stringify(rowObj));
        })
    };
    reader.readAsBinaryString(input.files[0]);
}
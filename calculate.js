updateList = function() {
    var input = document.getElementById('file');
    var output = document.getElementById('fileList');
    var children = "";
    for (var i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + '</li>';
    }
    output.innerHTML = '<ul>'+children+'</ul>';
}
/*
excelExport = function() {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName){
            var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            console.log(JSON.stringify(rowObj));
            alert(JSON.stringify(rowObj)[0]);
        })
    };
    reader.readAsBinaryString(input.files[0]);
}
*/
excelExport = function() {
    var input = event.target;
    var i,f;

    for (i=0; i<input.files.length; ++i) {
        f = input.files[i];
        var reader = new FileReader();
        reader.onload = function(){
            var fileData = reader.result;
            var wb = XLSX.read(fileData, {type : 'array'});
            wb.SheetNames.forEach(function(sheetName){
                var rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                console.log(JSON.stringify(rowObj));
                alert(JSON.stringify(rowObj))
            })
        };
        reader.readAsArrayBuffer(f);
    }
}
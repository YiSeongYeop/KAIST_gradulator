$(document).ready( function() {
    updateList = function() {
        var input = document.getElementById('file');
        var output = document.getElementById('fileList');
        var children = "";
        for (var i = 0; i < input.files.length; ++i) {
            children += '<li>' + input.files.item(i).name + '</li>';
        }
        output.innerHTML = '<ul>'+children+'</ul>';
    }

    excelExport = function() {
        alert("aaa");
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

});
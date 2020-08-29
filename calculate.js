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
    let input = event.target;
    let i,f;

    for (i=0; i<input.files.length; ++i) {
        f = input.files[i];
        let reader = new FileReader();
        reader.onload = function(){
            let fileData = reader.result;
            let wb = XLSX.read(fileData, {type : 'array'});
            wb.SheetNames.forEach(function(sheetName){
                let rowObj =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
                console.log(JSON.stringify(rowObj));
            })
        };
        reader.readAsArrayBuffer(f);
    }
}

dataParser = function(rowObj) {
    
}
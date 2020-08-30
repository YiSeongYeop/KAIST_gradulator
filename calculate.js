selected1 = function(e) {
    //let target = document.getElementById("ethics-and-safety").text
    let selTxt1 = document.querySelector('select#ethics-and-safety option:checked').text;
    console.log(selTxt1);
}

selected2 = function(e) {
    //let target = document.getElementById("ethics-and-safety").text
    let selTxt2 = document.querySelector('select#english option:checked').text;
    console.log(selTxt2);
}

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
                //console.log(JSON.stringify(rowObj));
                let info = dataParser(rowObj);
                console.log(info);
            })
        };
        reader.readAsArrayBuffer(f);
    }
}

dataParser = function(rowObj) {
    let info = new Array();
    let day = new Array("월","화","수","목","금","토","일");
    let personal_info = {};

    let semester = Object.keys(rowObj[0])[0];
    let main_department = rowObj[0]["__EMPTY_1"];
    let course = rowObj[0]["__EMPTY_8"];

    let name = rowObj[1]["__EMPTY_1"];
    let student_id = rowObj[1]["__EMPTY_8"];
    let application_credit = rowObj[1]["__EMPTY_15"];
    if (application_credit == "") {
        console.log("empty semester");
        return 0;
    }

    personal_info["semester"] = semester;
    personal_info["main_department"] = main_department;
    personal_info["course"] = course;
    personal_info["name"] = name;
    personal_info["student_id"] = student_id;
    personal_info["application_credit"] = application_credit;

    info.push(personal_info);

    let i = 4;
    while (Object.keys(rowObj[i])[1] != " 수강 신청 내역") {
        let first_value = rowObj[i][semester];
        if (day.indexOf(first_value) == -1) {//과 코드
            let sub_info = {};

            let computer_code = rowObj[i]["__EMPTY"];
            let subject_code = rowObj[i]["__EMPTY_3"];
            let subject_classification = rowObj[i]["__EMPTY_4"];
            let subject_name = rowObj[i]["__EMPTY_5"];
            let AU = rowObj[i]["__EMPTY_10"];
            let credit = rowObj[i]["__EMPTY_12"];
            let professor = rowObj[i]["__EMPTY_13"];
            let retake = rowObj[i]["__EMPTY_16"];
            let kind = rowObj[i]["__EMPTY_17"];

            sub_info["computer_code"] = computer_code;
            sub_info["subject_code"] = subject_code;
            sub_info["subject_classification"] = subject_classification;
            sub_info["subject_name"] = subject_name;
            sub_info["AU"] = AU;
            sub_info["credit"] = credit;
            sub_info["professor"] = professor;
            sub_info["retake"] = retake;
            sub_info["kind"] = kind;

            info.push(sub_info);
        }
        ++i;
    }
    return info;
}
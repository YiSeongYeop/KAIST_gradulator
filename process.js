alerting = function() {
    var result = confirm("Really Logout?");
    if (result == true) {
        window.location.replace("/index");
    }
}

ethics = function(e) {
    //let target = document.getElementById("ethics-and-safety").text
    let selTxt1 = document.querySelector('select#ethics-select option:checked').text;
    return selTxt1;
}

english = function(e) {
    //let target = document.getElementById("ethics-and-safety").text
    let selTxt2 = document.querySelector('select#english-select option:checked').text;
    return selTxt2;
}

submj = function(e) {
    //let target = document.getElementById("ethics-and-safety").text
    let selTxt3 = document.querySelector('select#submj-select option:checked').text;
    return selTxt3;
}

subtype = function(e) {
    let selTxt4 = document.querySelector('select#subtype-select option:checked').text;
    return selTxt4;
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

function processxl(callback) {
    let input = document.getElementById('file');//event.target;
    let i,f;
    let count_reader = 0;
    let info_list = new Array();

    if (input.files.length == 0) {
        alert("excel file not exist");
        return;
    } 

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
                //console.log(info);
                info_list.push(info);
            })
            count_reader += 1;
            if (count_reader == input.files.length) {
                callback(info_list);
            }
        };
        reader.readAsArrayBuffer(f);
    }
}

function calculate(info_list) {
    let list_for_jihun = new Array();
    let others = new Array();
    for (var k = 0; k < 5; ++k) {
        others.push(0);
    }
    let course_codes = new Array();
    list_for_jihun.push(others);
    list_for_jihun.push(course_codes);

    let major = "";

    for (var i = 0; i < info_list.length; ++i){
        if (info_list[i] != 0) {
            major = info_list[i][0]["main_department"];
            break;
        }
    }
    
    list_for_jihun[0][0] = major;
    list_for_jihun[0][1] = subtype();
    console.log(list_for_jihun[0][1]);
    list_for_jihun[0][2] = submj();
    list_for_jihun[0][3] = english();
    list_for_jihun[0][4] = ethics();

    for (var j = 0; j < info_list.length; ++j) {
        if (info_list[j] == 0) {
            continue;
        }
        for (var p = 0; p < (info_list[j].length-1); ++p) {
            list_for_jihun[1].push(info_list[j][p+1]["subject_code"]);
        }
    }
    //console.log(list_for_jihun);
    let student = new Student(list_for_jihun[0][0], list_for_jihun[0][1],
     list_for_jihun[0][2], list_for_jihun[1]);
    console.table(student.requirements);
    console.table(student.missingRequirements);
    for (let [requirementTypeJson, normalizedRequirement] of student.missingRequirements) {
      let requirementTypeString = RequirementType.fromJson(requirementTypeJson).toString();
      console.log(`# ${requirementTypeString}`);
      console.log(`Total ${normalizedRequirement.credit} credit required`);
      console.log('Breakdown:');
      for (let requiredCourse of normalizedRequirement.requiredCourses) {
        console.log(`* ${requiredCourse.credit} credit required from ${requiredCourse.courses}`);
      }
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
let info = {};
let temp = new Array();

function login_check() {
	info["aaa"] = ["bbb", "ccc"];
  let id = document.getElementById("ID_input").value;
  let pw = document.getElementById("PW_input").value;
  if ((id in info) && (info[id][0] == pw)) {
    window.location.href = "calculate.html";
  }
  else {
    alert("ID or Password mismatch");
  }
}

function signup_check() {
	temp = new Array();
	let id = document.getElementById("ID_input").value;
  	let pw = document.getElementById("PW_input").value;
  	let email = document.getElementById("EMAIL_input").value;
  	temp.push(pw);
  	temp.push(email);

  	info[id] = temp;
  	alert("success : sign up");
  	window.location.href = "login.html";
}
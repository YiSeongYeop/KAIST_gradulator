String id = document.getElementById("ID_input");
String pw = document.getElementById("PW_input");

function login_check() {
  if (id == "aaa") && (pw == "aaa") {
    window.location.href = "file:///C:/Users/닭다리/Desktop/KAIST_gradulator/calculate.html";
  }
  else {
    alert("ID or Password mismatch");
  }
}
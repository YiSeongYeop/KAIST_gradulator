function login_check() {
  let id = document.getElementById("ID_input").value;
  let pw = document.getElementById("PW_input").value;
  if ((id == "aaa") && (pw == "aaa")) {
    window.location.href = "file:///C:/Users/닭다리/Desktop/KAIST_gradulator/calculate.html";
  }
  else {
    alert("ID or Password mismatch");
  }
}

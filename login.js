function login_check() {
  let id = document.getElementById("ID_input").value;
  let pw = document.getElementById("PW_input").value;
  if ((id == "aaa") && (pw == "aaa")) {
    window.location.href = "calculate.html";
  }
  else {
    alert("ID or Password mismatch");
  }
}

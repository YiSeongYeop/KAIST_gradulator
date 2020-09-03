alerting = function() {
    var result = confirm("Really Logout?");
    if (result == true) {
        window.location.replace("/index");
    }
}
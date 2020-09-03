var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/signin'){
      if (request.method =='POST') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var login_id = post.id;
            var login_pw = post.pw;
            login_check(login_id, login_pw,request,response);
        });
      }
      else {
        fs.readFile(__dirname + "/signin.html", function (err,data) {
          if (err) {
            response.writeHead(404);
            console.error(_url);
            response.end(JSON.stringify(err));
            return;
          }
          response.writeHead(200);
          response.end(data, 'utf-8');
        });
      }
      //response.end(__dirname + '/process.html');
    } 
    else if (pathname === '/signup'){
      if (request.method == 'POST') {
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var signup_id = post.id;
            var signup_pw = post.pw;
            var signup_email = post.email;
            signup_check(signup_id, signup_pw, signup_email,request,response);
        });
      }
      else {
        fs.readFile(__dirname + "/signup.html", function (err,data) {
          if (err) {
            response.writeHead(404);
            console.error(_url);
            response.end(JSON.stringify(err));
            return;
          }
          response.writeHead(200);
          response.end(data, 'utf-8');
        });
      }
      //response.end(__dirname + '/process.html');
    }
    else if (pathname === '/index') {
      fs.readFile(__dirname + "/index.html", function (err,data) {
        if (err) {
          response.writeHead(404);
          console.error(_url);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
      });
    }
    else if (pathname === '/process') {
      fs.readFile(__dirname + "/process.html", function (err,data) {
        if (err) {
          response.writeHead(404);
          console.error(_url);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
      });
    }
    else if (pathname === '/contact') {
      fs.readFile(__dirname + "/contact.html", function (err,data) {
        if (err) {
          response.writeHead(404);
          console.error(_url);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
      });
    }
    else if (pathname === '/') {
      fs.readFile(__dirname + "/index.html", function (err,data) {
        if (err) {
          response.writeHead(404);
          console.error(_url);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
      });
    }
    else {
      fs.readFile(__dirname + _url, function (err,data) {
        if (err) {
          response.writeHead(404);
          console.error(_url);
          response.end(JSON.stringify(err));
          return;
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
      });
    }
});
app.listen(3000);

login_check = function(login_id, login_pw,request,response) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a5251565',
    database : 'gradulator'
  });
    
  connection.connect();
    
  connection.query('SELECT * FROM login', function (error, results, fields) {
      if (error) {
          console.log(error);
      }
      if (ID_check(results, login_id)) {
        if (PW_check(results, login_pw)) {
          console.log("sign in");
          fs.readFile(__dirname + "/process.html", (err, data) => { 
            if (err) {
              return console.error(err); 
            }
            response.writeHead(200);
            response.end(data, 'utf-8');
          });
        }
        else {
          fs.readFile(__dirname + "/signin_alert.html", (err, data) => { 
            if (err) {
              return console.error(err); 
            }
            response.writeHead(200);
            response.end(data, 'utf-8');
          });
        }
      }
      else {
        fs.readFile(__dirname + "/signin_alert.html", (err, data) => { 
          if (err) {
            return console.error(err); 
          }
          response.writeHead(200);
          response.end(data, 'utf-8');
        });
      }
      //console.log(results[0]['id']);
  });
  connection.end();
  return 0;
}

ID_check = function(results, login_id) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['id'] == login_id) {
      return 1;
    }
  }
  return 0;
}

PW_check = function(results, login_pw) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['pw'] == login_pw) {
      return 1;
    }
  }
  return 0;
}

signup_check = function(signup_id, signup_pw, signup_email,request,response) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a5251565',
    database : 'gradulator'
  });
    
  connection.connect();
    
  connection.query(`INSERT INTO login (id,pw,email) VALUES (?,?,?)`, [signup_id, signup_pw, signup_email], function (error, results, fields) {
      if (error) {
          console.log(error);
      }
      if (NID_check(results, signup_id)) {
        if (NPW_check(results, signup_pw)) {
          if (NEM_check(results, signup_email)) {
            console.log("signup");
            fs.readFile(__dirname + "/signin.html", (err, data) => { 
              if (err) {
                return console.error(err); 
              }
              response.writeHead(200);
              response.end(data, 'utf-8');
            });
          }
          else {
            console.log("email already exist");
            fs.readFile(__dirname + "/signup_alert_e.html", (err, data) => { 
              if (err) {
                return console.error(err); 
              }
              response.writeHead(200);
              response.end(data, 'utf-8');
            });
          }
        }
        else {
          console.log("password already exist");
          fs.readFile(__dirname + "/signup_alert_pw.html", (err, data) => { 
            if (err) {
              return console.error(err); 
            }
            response.writeHead(200);
            response.end(data, 'utf-8');
          });
        }
      }
      else {
        console.log("id already exist");
        fs.readFile(__dirname + "/signup_alert_id.html", (err, data) => { 
          if (err) {
            return console.error(err); 
          }
          response.writeHead(200);
          response.end(data, 'utf-8');
        });
      }
      //console.log(results[0]['id']);
  });
    
  connection.end();
  return 0;
}

NID_check = function(results, signup_id) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['id'] == signup_id) {
      return 0;
    }
  }
  return 1;
}

NPW_check = function(results, signup_pw) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['pw'] == signup_pw) {
      return 0;
    }
  }
  return 1;
}

NEM_check = function(results, signup_email) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['email'] == signup_email) {
      return 0;
    }
  }
  return 1;
}

/*
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a5251565',
  database : 'gradulator'
});
  
connection.connect();
  
connection.query('SELECT * FROM login', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    if (ID_check(results)) {
      if (PW_check(results)) {
        console.log("sign in");
      }
      else {
        console.log("check id or pw again");
      }
    }
    else {
      console.log("check id or pw again");
    }
    //console.log(results[0]['id']);
});
  
connection.end();

ID_check = function(results) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['id'] == input_id) {
      return 1;
    }
  }
  return 0;
}

PW_check = function(results) {
  for (var i = 0; i < results.length; ++i) {
    if (results[i]['pw'] == input_pw) {
      return 1;
    }
  }
  return 0;
}
*/
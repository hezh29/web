var http = require('http');
var urltools = require('url');
var pug = require('pug');
var fs = require('fs');
var validator = require("./validator.js");
var users = {};

http.createServer(function (req, res){
    switch (req.url){
        case "/signupStyle.css":
        sendFile(res, "signupStyle.css", "text/css");break;
        case "/detilStyle.css":
        sendFile(res, "detilStyle.css", "text/css");break;
        case "/signup.js":
        sendFile(res, "signup.js", "text/javascript");break;
        case "/validator.js":
        sendFile(res, "validator.js", "text/javascript");break;
    }
    if(req.method === 'POST'){         
        regist(req, res)
    }
    else{
        sendPage(req, res);
    }

}).listen(8000);

console.log("Server is listening at 8000");

function sendFile(res, file, type){
    res.writeHead(200, {"Content-Type": type});
    res.end(fs.readFileSync(file));
    console.log("Send File: ", file);
}

function regist(req, res){
    req.on('data', function(chunk){
        try{
            var user = getUser(chunk.toString());
            check(user);
            users[user.username] = user;
            res.writeHead(301,{Location: "?username=" + encodeURIComponent(user.username)});
            res.end();
        }
        catch(error){
            console.log("Regist error : ", error);
            sendSignup(res, user, error.message.split("&").join("<br />"));
        }
    });
}

function check(user){
    var errorMessage = [];

    for(var key in user){
        if(!validator.isDataValid(key, user[key])){
            errorMessage.push(validator.form[key].errorInfo);
        }

        if(!validator.isDataValueUnique(users, user, key)){
            errorMessage.push(key+" already exists.");
        }
    }

    if(errorMessage.length > 0){
        throw new Error(errorMessage.join("&"));
    }
}

function getUser(data){
    data = decodeURIComponent(data);
    var userData = data.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
    var user = {username: userData[1], sid: userData[2], phone: userData[3], email: userData[4]};
    console.log("Get user: ", user);
    return user;
}

function sendPage(req, res){
    var username = getUsername(req);
    if(!username || !isRegisted(username)){
        sendSignup(res, {username: username}, null);
    }
    else{
        sendDetils(res, username);
    }
}

function getUsername(req){
    return urltools.parse(req.url,true).query.username;
}

function isRegisted(username){
    return !!users[username];
}

function sendHtml(res, template, data){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(pug.renderFile(template, data));
    console.log("Show page :",template.substring(0, template.length - 4));
}

function sendSignup(res, user, error){
    sendHtml(res, "signup.pug", {user: user, error: error});
}

function sendDetils(res, username){
    sendHtml(res, "detil.pug", users[username]);
}
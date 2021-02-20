'use strict';

const userDatabaseFile = 'users.json';
const fs = require('fs');

exports.signUpAction = function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    console.log(username, password);

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Check duplicate username
    if(userDatabase.hasOwnProperty(username)) {
        res.json({
            "success": false,
            "reason": "Username already taken",
        });
    } else {
        userDatabase[username] = password;
        console.log(userDatabase);
        var data = JSON.stringify(userDatabase);
        fs.writeFileSync(userDatabaseFile, data, 'utf8');
        res.json({
            "success": true,
        });
    }
};

exports.logInAction = function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    console.log("Username:", username, "Password:", password);

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Check username exists
    if(userDatabase.hasOwnProperty(username) && userDatabase[username] === password) {
        res.json({
            "success": true,
        });
    } else {
        res.json({
            "success": false,
            "reason": "Username or password mismatch",
        });
    }
};
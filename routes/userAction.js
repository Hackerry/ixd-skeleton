'use strict';

const userDatabaseFile = 'users.json';
const fs = require('fs');

const activityUtil = require("../public/js/activities.js");

exports.signUpAction = function(req, res){
    var username = req.query.username;
    var password = req.query.password;
    console.log("Signup-Username:", username, "Password:", password);

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Check duplicate username
    if(userDatabase.hasOwnProperty(username)) {
        res.json({
            "success": false,
            "reason": "Username already taken",
        });
    } else {
        userDatabase[username] = {
            'password': password,
            'settings': {
                'startDay': "1",        // Report start day
            }
        };
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
    console.log("Login-Username:", username, "Password:", password);

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Check username exists and password is correct
    if(userDatabase.hasOwnProperty(username) && userDatabase[username]['password'] === password) {
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

exports.getActivities = function(req, res) {
    var username = req.query.username;

    res.json({
        "success": true,
        "activities": activityUtil.getActivites(username)
    });
}

exports.retrieveSettings = function(req, res) {
    var username = req.query.username;

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Check username exists
    if(userDatabase.hasOwnProperty(username)) {
        res.json({
            "success": true,
            "settings": userDatabase[username]['settings'],
        });
    } else {
        res.json({
            "success": false,
            "reason": "Can't find user with name " + username,
        });
    }
}

exports.setSettings = function(req, res) {
    var username = req.query.username;
    var startDay = req.query.startDay;

    // Read database
    var userDatabase = JSON.parse(fs.readFileSync(userDatabaseFile, 'utf8'));

    // Write to file
    // Check username exists
    if(userDatabase.hasOwnProperty(username)) {
        userDatabase[username]['settings']['startDay'] = startDay;
        var data = JSON.stringify(userDatabase);
        fs.writeFileSync(userDatabaseFile, data, 'utf8');
        res.json({
            "success": true,
        });
    } else {
        res.json({
            "success": false,
            "reason": "Can't find user with name " + username,
        });
    }
}
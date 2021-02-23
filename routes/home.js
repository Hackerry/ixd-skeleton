const activityDatabaseFile = "activities.json";
const fs = require("fs");

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/*
 * GET home page.
 */

exports.view = function(req, res){
    var activityDatabase = JSON.parse(fs.readFileSync(activityDatabaseFile, 'utf8'));

    // TODO store by username
    var date = new Date();
    var key = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    var count = 0;
    if(activityDatabase.hasOwnProperty(key)) {
        count = activityDatabase[key].length;
    }
    var dateStr = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    var data = {
        "noActivity": (count == 0),
        "singleActivity": (count == 1),
        "activitiesCount": count,
        "date": dateStr,
        "day": day[date.getDay()],
    };
    res.render('home', data);
};
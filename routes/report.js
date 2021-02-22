const activitiesFile = "activities.json";
const activityTypesFile = "activityTypes.json";
const fs = require("fs");

/*
 * GET report page.
 */

exports.view = function(req, res){
    var date = new Date();
    var key = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    var activities = JSON.parse(fs.readFileSync(activitiesFile, 'utf8'));
    var activityTypes = JSON.parse(fs.readFileSync(activityTypesFile, 'utf8'));

    // Intialize all types and fill in value
    var data = {};
    var typeData = [];
    for(var i = 0; i < activityTypes["types"].length; i++) {
        var type = activityTypes["types"][i];
        type["count"] = 0;
        typeData.push(type);
    }
    console.log("Types gathered:", typeData);

    if(!activities.hasOwnProperty(key)){
        data['hasData'] = false;
    } else {
        data['hasData'] = true;

        // Generate daily report (default)
        // -> TODO generate weekly/monthly report
        var dailyActivities = activities[key];
        for(var i = 0; i < dailyActivities.length; i++) {
            var activity = dailyActivities[i];
            for(var j = 0; j < typeData.length; j++) {
                if(typeData[j]["name"] === activity["type"])
                    typeData[j]["count"] += activity["duration"];
            }
        }

        // Remove types that have 0 hours
        typeData = typeData.filter(function(i) {
            return i["count"] !== 0
        })
        data['data'] = typeData;

        console.log("Data gathered:", data);
    }

    res.render('report', data);
};
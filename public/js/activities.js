const activitiesFile = "activities.json";
const activityTypesFile = "activityTypes.json";
const fs = require("fs");

const ONE_DAY_TIME = 1000 * 60 * 60 * 24;
const WEEK_TO_GEN = 3;

function getActivity(username) {
    // Get user setting start date
    var allUserActivities = JSON.parse(fs.readFileSync(activitiesFile, 'utf8'));
    var activityTypes = JSON.parse(fs.readFileSync(activityTypesFile, 'utf8'));

    // Intialize all types and fill in value
    var typeData = [];
    for(var i = 0; i < activityTypes["types"].length; i++) {
        var type = activityTypes["types"][i];
        type["count"] = [0,0,0];
        typeData.push(type);
    }

    // Collect activities
    var today = new Date();

    // Only store 3 weeks of activities
    var startDate = new Date(today - (today.getDay()*ONE_DAY_TIME));
    startDate = new Date((startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear());

    // Generate weekly report
    var userActivities = allUserActivities[username];
    for (var date in userActivities) {
        var dateActivities = userActivities[date];

        // Calculate how many day prior the activities are for
        var lastDate = new Date(date);
        var diffTime = startDate - lastDate;
        var diffDays = Math.ceil(diffTime / ONE_DAY_TIME);

        // 3 Weeks prior
        if(diffDays > 7 * WEEK_TO_GEN) continue;

        // Store activities by type
        for(var i = 0; i < dateActivities.length; i++) {
            var activity = dateActivities[i];
            for(var j = 0; j < typeData.length; j++) {
                if(typeData[j]["name"] === activity["type"]) {
                    if(diffDays <= 0) {
                        typeData[j]["count"][0] += activity["duration"];
                    } else if(diffDays <= 7) {
                        typeData[j]["count"][1] += activity["duration"];
                    } else {
                        typeData[j]["count"][2] += activity["duration"];
                    }
                    break;
                }
            }
        }
    }

    return typeData;
}

exports.getActivity = getActivity;
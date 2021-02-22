const activityTypes = require('../activityTypes.json');

/*
 * GET add page.
 */

exports.view = function(req, res){
    var data = {};
    var array = [];
    var types = activityTypes["types"];
    for(var i = 0; i < types.length; i++) {
        var activityType = types[i];
        array.push({
            "type": activityType["name"],
        });
    }
    data['options'] = array;
    console.log("Read Types:", data);
    res.render('add', data);
};
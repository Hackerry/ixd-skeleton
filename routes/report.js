const activityUtil = require("../public/js/activities.js");

/*
 * GET report page.
 */

exports.view = function(req, res){
    var username = req.cookies.username;

    var data = {};

    // Remove types that have no hours
    data['data'] = activityUtil.getActivity(username);

    console.log("Data gathered:", data['data']);

    res.render('report', data);
};
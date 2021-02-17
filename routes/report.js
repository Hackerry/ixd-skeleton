var activity = require("../activity.json");

/*
 * GET report page.
 */

exports.view = function(req, res){
    res.render('report', activity);
};
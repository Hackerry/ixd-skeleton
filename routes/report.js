
/*
 * GET report page.
 */

exports.view = function(req, res){
    res.render('report', {
        "activities": [
            {"name": "work", "hours": 9},
            {"name": "school", "hours": 7},
            {"name": "family", "hours": 4},
            {"name": "sleep", "hours": 4},
            {"name": "fun", "hours": 0},
        ],
    });
};
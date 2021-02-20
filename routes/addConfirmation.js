
/*
 * GET addConfirmation page.
 */

exports.view = function(request, res){
    var activityName = request.query.activityName;
    var type = request.query.type;
	var startTime = request.query.startTime;
    var endTime = request.query.endTime;
	console.log(activityName, type, startTime, endTime);

    var newData = {
        "activityName": activityName,
        "type": type,
        "startTime": startTime,
        "endTime": endTime,
    };

    res.render('addConfirmation', newData);
};
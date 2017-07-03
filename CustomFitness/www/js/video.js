

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var title = getParameterByName("list").replace(/%20/g, " ");

dataString = "name="+title;

console.log("data:" + dataString)

// Define helper funciton for POST and getJSON combo
$.postJSON = function(url, data, func) {
$.post(url, data, func, 'json');
}

// Post the data and create callback function for when we receive results from response.php
// $.postJSON("http://localhost/~ChristinaSchell/php/video.php", dataString, function(data) {
$.postJSON("http://christinasund.com/custom-fitness/video.php",dataString, function (data) {
    for (var i = 0; i < data.length; i++) {

        var description = data[i]["exercise_desc"];
        var titleString = data[i]["exercise_name"];
        var videoURL = data[i]["exercise_video"];

        jQuery('.description-new').html(description);
        jQuery('.w-video iframe').attr('src', videoURL);
        jQuery('.title-new').html(titleString);

    }

});
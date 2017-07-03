//$(function() {

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
    $.postJSON("http://localhost/~ChristinaSchell/php/video.php", dataString, function(data) {

        for (var i = 0; i < data.length; i++) {

            var description = data[i]["exercise_desc"];
            var titleString = data[i]["exercise_name"];
            var videoURL = data[i]["exercise_video"];

            jQuery('.description-new').html(description);
            jQuery('.w-video iframe').attr('src', videoURL);
            jQuery('.title-new').html(titleString);

        }

    });

// });


// function lookup(lookupIn, c, d, e, f) {
//     var output;
//     d = lookupIn;
//     if (typeof d == 'undefined')
//         return;
//     var m = false;
//     for (e = 0; e < c.length; e++) {
//         for (f in c[e]) {
//             if (d == f) {
//                 output = c[e][f];
//                 m = true
//             };
//         };
//         if (m)
//             break
//     }
//     return output
// }

// var descriptionObj = [{
//     '1': "1.  Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.<br>2.  From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.<br>3.  After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.<br>4.  Repeat the movement for the prescribed amount of repetitions.<br>5.  When you are done, place the bar back in the rack.<br><strong>Caution:</strong><br>If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with the amount of weight used.<br>Also, beware of letting the bar drift too far forward. You want the bar to touch your middle chest and nowhere else.<br>Don't bounce the weight off your chest. You should be in full control of the barbell at all times."
// }, {
//     '2': "1.  Approach the bar so that it is centered over your feet. Your feet should be about hip-width apart. Bend at the hip to grip the bar at shoulder-width allowing your shoulder blades to protract. Typically, you would use an alternating grip.<br>2.  With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head. Keep your chest up and your back arched, and begin driving through the heels to move the weight upward.<br>3.  After the bar passes the knees aggressively pull the bar back, pulling your shoulder blades together as you drive your hips forward into the bar.<br>4.  Lower the bar by bending at the hips and guiding it to the floor.<br>"
// }, {
//     '3': "1.  Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stance. (<strong>Note:</strong> For the purposes of this discussion we will use the medium stance described above which targets overall development; however you can choose any of the three stances described in the foot positioning section).<br>2.  Lower the safety bars holding the weighted platform in place and press the platform all the way up until your legs are fully extended in front of you. <strong>Tip:</strong> Make sure that you do not lock your knees. Your torso and the legs should make a perfect 90-degree angle. This will be your starting position.<br>3.  As you inhale, slowly lower the platform until your upper and lower legs make a 90-degree angle.<br>4.  Pushing mainly with the heels of your feet and using the quadriceps go back to the starting position as you exhale.<br>5.  Repeat for the recommended amount of repetitions and ensure to lock the safety pins properly once you are done. You do not want that platform falling on you fully loaded.<br>"
// }, {
//     '4': "1.  To begin, first set the bar on the height that best matches your height. Once the correct height is chosen and the bar is loaded, step under the bar and place the back of your shoulders (slightly below the neck) across it.<br>2.  Hold on to the bar using both arms at each side (palms facing forward), unlock it and lift it off the rack by first pushing with your legs and at the same time straightening your torso.<br>3.  Position your legs using a shoulder width medium stance with the toes slightly pointed out. Keep your head up at all times and also maintain a straight back. This will be your starting position. (Note: For the purposes of this discussion we will use the medium stance which targets overall development; however you can choose any of the three stances discussed in the foot stances section).<br>4.  Begin to slowly lower the bar by bending the knees as you maintain a straight posture with the head up. Continue down until the angle between the upper leg and the calves becomes slightly less than 90-degrees (which is the point in which the upper legs are below parallel to the floor). Inhale as you perform this portion of the movement. <br><strong>Tip:</strong> If you performed the exercise correctly, the front of the knees should make an imaginary straight line with the toes that is perpendicular to the front. If your knees are past that imaginary line (if they are past your toes) then you are placing undue stress on the knee and the exercise has been performed incorrectly.<br>5.  Begin to raise the bar as you exhale by pushing the floor with the heel of your foot as you straighten the legs again and go back to the starting position.<br>6.  Repeat for the recommended amount of repetitions.<br>"
// }, {
//     '5': "1.  Position a bar into a landmine or in a corner to keep it from moving. Load an appropriate weight onto your end.<br>2.  Stand over the bar, and position a Double D row handle around the bar next to the collar. Using your hips and legs, rise to a standing position.<br>3.  Assume a wide stance with your hips back and your chest up. Your arms should be extended. This will be your starting position.<br>4.  Pull the weight to your upper abdomen by retracting the shoulder blades and flexing the elbows. Do not jerk the weight or cheat during the movement.<br>5.  After a brief pause, return to the starting position.<br>"
// }];

// var videoObj = [{
//     '1': "https://www.youtube.com/embed/Vc63DPUoA40?ecver=2"
// }, {
//     '2': "https://www.youtube.com/embed/G13343CGcPs?ecver=2"
// }, {
//     '3': "https://www.youtube.com/embed/3R0SOJ3alTA?ecver=2"
// }, {
//     '4': "https://www.youtube.com/embed/aI21U16VmHg?ecver=2"
// }, {
//     '5': "https://www.youtube.com/embed/KDEl3AmZbVE?ecver=2"
// }];

// var titleObj = [{
//     '1': "Barbell Bench Press"
// }, {
//     '2': "Barbell Deadlift"
// }, {
//     '3': "Sled Leg Press"
// }, {
//     '4': "Smith Machine Squat"
// }, {
//     '5': "T-Bar Row"
// }];

// var description = lookup(getParameterByName("list"),descriptionObj);
// var videoUrl = lookup(getParameterByName("list"),videoObj);
// var title = lookup(getParameterByName("list"),titleObj);
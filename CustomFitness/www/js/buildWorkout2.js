  var calculateAge = function(m,y) {
    var now = new Date(); //Todays Date     

    var dobMonth= m; 
    var dobDay= '01';
    var dobYear= y;

    var nowDay= now.getDate();
    var nowMonth = now.getMonth() + 1;  //jan=0 so month+1
    var nowYear= now.getFullYear();

    var ageyear = nowYear- dobYear;
    var agemonth = nowMonth - dobMonth;
    var ageday = nowDay- dobDay;
    if (agemonth < 0) {
           ageyear--;
           agemonth = (12 + agemonth);
            }
    if (nowDay< dobDay) {
          agemonth--;
          ageday = 30 + ageday;
          }
    return ageyear;
  }

  // pull from local storage
  var storage = window.localStorage;
  var formData = storage.getItem("form_data")
  var formDataArray = formData ? formData.split(",") : ["", "", "", "", "","",""];

  var userAge = calculateAge(formDataArray[4], formDataArray[5]);

  // Create object for easier handling
  var data = {
    "location": formDataArray[0],
    "fitnessLevel": formDataArray[1],
    "goal": formDataArray[2],
    "desiredWorkout": formDataArray[3],
    "userAge": userAge,
    "fullName": formDataArray[6]
  };
 
  // Serialize data object to send in POST
  dataString = "foo=bar" + $(this).serialize() + "&" + $.param(data);

   console.log("data: " + dataString)

  // Define helper funciton for POST and getJSON combo
  $.postJSON = function(url, data, func) {
    $.post(url, data, func, 'json');
  }

  // Post the data and create callback function for when we receive results from response.php
  // $.postJSON("http://localhost/~ChristinaSchell/php/response.php", dataString, function(data) {
    $.postJSON("http://christinasund.com/custom-fitness/response.php",data, function (data) {

    var inputFitLevel = dataString.split("fitnessLevel=")[1].split("&")[0];
    var inputGoal = dataString.split("goal=")[1].split("&")[0].replace(/\+/g," ");
    var inputWorkout = dataString.split("desiredWorkout=")[1].split("&")[0];
    var inputName = dataString.split("fullName=")[1].replace(/\+/g," ");;


    console.log(inputFitLevel);
    console.log(inputGoal);
    console.log(inputWorkout);


    // Initialize variables and functions
    var level = exerciseCount = cardioTime = listItem = totalSets = totalTime = 0;
    var repRange, restTime, numSets, displayGoal;
    var html = img = "";
    var chestArray = [];
    var backArray = [];
    var armsArray = [];
    var legsArray = [];
    var absArray = [];
    var flexArray = [];
    var cardioArray = [];
    var exerciseList = [];
    var armsObj = {
      "tris": 0,
      "bis": 0,
      "delts": 0
    }
    var getRandomArbitrary = function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var exerciseListCreate = function(list, arr) {
        for (var l = 0; l < arr.length; l++) {
            list.push(arr[l]);
        }
        return list;
    }

    // Initialize the value of reps, sets, and resttime based on goal choice
    switch (inputGoal) {
      case 'gain strength':
        repRange = "6-8 reps";
        restTime = "2 min";
        numSets = "3-4 sets";
        displayGoal = "Gain Strength";
      break;
      case 'weight loss':
        repRange = "12-15 reps";
        restTime = "45 sec";
        numSets = "4-5 sets";
        displayGoal = "Weight Loss"
      break;
      case 'run faster':
        repRange = "5 mins w/u";
        restTime = "40 mins workout";
        numSets = "";
        displayGoal = "Run Faster";
      break;
      case 'increase mobility':
        repRange = "6-8 reps";
        restTime = "2 min";
        numSets = "3-4 sets";
        displayGoal = "Increase Mobility";
      break;
      case 'no goal':
        repRange = "8-10 reps";
        restTime = "1 min";
        numSets = "3 sets";
        displayGoal = inputWorkout;
      break;
    }

    // Create exercise count and exercise time for cardio and running 
    if (inputGoal == "run faster" || inputWorkout == "Running" || inputWorkout == "Generic+Cardio") {
      switch (inputFitLevel) {
        case 'beginner':
          level = 1;
          exerciseCount = 2;
          exerciseTime = "30 mins workout";
        break;
        case 'intermediate':
          level = 2;
          exerciseCount = 3;
          exerciseTime = "40 mins workout";
        break;
        case 'advanced':
          level = 3;
          exerciseCount = 4;
          exerciseTime = "55 mins workout";
        break;          
      }
    } 
    // create level variable, exercise count, total time, and total sets for weight loss and gain strength goals
    else if (inputGoal == "weight loss" || inputGoal == "gain strength") {
      switch (inputFitLevel) {
        case 'beginner':
          level = 1;
          exerciseCount = 5;
          totalTime = "45-60";
          totalSets = "20-25";
        break;
        case 'intermediate':
          level = 2;
          exerciseCount = 7;
          totalTime = "60-75";
          totalSets = "28-35";
        break;
        case 'advanced':
          level = 3;
          exerciseCount = 10;
          totalTime = "75-90";
          totalSets = "40-50";              
        break;          
      }

    }

    // Create exercise list for body parts and generic cardio choices  
    for (var i = 0; i < data.length; i++) {
      Object.keys(data[i]).forEach(function(key) {
        if (key == "desired_workout") {
          switch(data[i][key]) {
            case "Chest":
              chestArray.push(data[i]);
            break;
            case "Back":
              backArray.push(data[i]);
            break;
            case "Arms":
              inputWorksout = data[i]["desired_workout"] + " " + data[i]["goal3"];
              armsArray.push(data[i]);
            break;                  
            case "Legs":
              legsArray.push(data[i]);
            break;
            case "Abs":
              absArray.push(data[i]);
            break;  
            case "Generic Cardio":
              cardioArray.push(data[i]);
            break;                  
          } 
        } 
      }); 
    } 

    // Increase Mobility and Run Faster goals - create exercise list
    if (inputGoal == "increase mobility" || inputGoal == "run faster" || inputWorkout == "Running" || inputWorkout == "Flexability") {
      for (var i = 0; i < data.length; i++) {
        Object.keys(data[i]).forEach(function(key) {
          if (key == "goal1" || key == "goal2") {
            switch(data[i][key]) {
              case "increase mobility":
                flexArray.push(data[i]);
              break;
              case "run faster":
                cardioArray.push(data[i]);                 
            } 
          } 
        }); 
      } 
    } 
    
    // Build Workout List for when user selects mobility/run faster goals or flexability/running desired workouts
    if (inputGoal == "increase mobility" || inputWorkout == "Flexability") {
      for (var k = 0; k < flexArray.length; k++) {
        exerciseList.push(flexArray[k]);
      }
      repRange = "4-5 reps";
      numSets = "3-4 sets";
      restTime = "1 min";
      exerciseCount = "1-3";
      totalTime = "20-30";
      totalSets = "2-12";
    } else if (inputGoal == "run faster" || inputWorkout == "Running") {
      for (var k = 0; k < cardioArray.length; k++) {
        if (level == 1) {
          if (cardioArray[k]["exercise_name"] == "Running") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Foam Roll") {
            exerciseList.push(cardioArray[k]);
          }
        } else if (level == 2) {
          if (cardioArray[k]["exercise_name"] == "Battling Ropes") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Running") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Foam Roll") {
            exerciseList.push(cardioArray[k]);
          }
        } else if (level == 3) {
          if (cardioArray[k]["exercise_name"] == "Battling Ropes") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Box Jump") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Running") {
            exerciseList.push(cardioArray[k]);
          } else if (cardioArray[k]["exercise_name"] == "Foam Roll") {
            exerciseList.push(cardioArray[k]);
          }
        }
        exerciseCount = "1-3";
        totalTime = "40-60";
        totalSets = "N/A";
      }
    } 
    // Create exercise list for when user selects weight loss/gain strength goals
    else if (inputGoal == "weight loss" || inputGoal == "gain strength") {
      if (level == 1) {
        exerciseList.push(chestArray[0]);
        exerciseList.push(backArray[0]);
        exerciseList.push(legsArray[0]);
        exerciseList.push(armsArray[0]);
        exerciseList.push(absArray[0]);
      } else if (level == 2) {
        exerciseList.push(chestArray[0]);
        exerciseList.push(chestArray[2]);
        exerciseList.push(backArray[0]);
        exerciseList.push(backArray[2]);
        exerciseList.push(legsArray[0]);
        exerciseList.push(legsArray[1]);
        exerciseList.push(absArray[0]);
      } else if (level == 3) {
        exerciseList.push(chestArray[0]);
        exerciseList.push(chestArray[2]);
        exerciseList.push(backArray[0]);
        exerciseList.push(backArray[2]);
        exerciseList.push(legsArray[0]);
        exerciseList.push(legsArray[1]);
        exerciseList.push(armsArray[0]);
        exerciseList.push(armsArray[1]);
        exerciseList.push(absArray[0]);
        exerciseList.push(absArray[1]);
      }
    } 
    // create exercise list for when user selects "no goal" and selects desired workout
    if (inputWorkout != "none") {
       // debugger;
      switch (inputWorkout) {
        case "Chest":
            exerciseList = exerciseListCreate(exerciseList, chestArray);
        break;
        case "Back":
            exerciseList = exerciseListCreate(exerciseList, backArray);
        break;
        case "Legs":
            exerciseList = exerciseListCreate(exerciseList, legsArray);
        break;
        case "Arms":
          for (var i = 0; i < armsArray.length; i++) {
            if (level == 1) {
                if (armsArray[i].indexOf("triceps") > -1 && armsObj["tris"] == 0) {
                  exerciseList.push(armsArray[i]);
                  armsObj["tris"] = 1;
                } else if (armsArray[i].indexOf("biceps") > -1 && armsObj["bis"] == 0) {
                  exerciseList.push(armsArray[i]);
                  armsObj["bis"] = 1;
                } else if (armsArray[i].indexOf("shoulders") > -1 && armsObj["delts"] == 0) {
                  exerciseList.push(armsArray[i]);
                  armsObj["delts"] = 1;
                }
            }
          }
          exerciseList = exerciseListCreate(exerciseList, armsArray);
        break;
        case "Abs":
            exerciseList = exerciseListCreate(exerciseList, absArray);
        break;
        case "Generic+Cardio":
          var rand = getRandomArbitrary(0,4);
          exerciseList.push(cardioArray[rand]);
          totalTime = exerciseTime.split(" ")[0];
          totalSets = "N/A";
          displayGoal = inputWorkout.replace(/\+/g, " ");
        break;            
      }
    }

   //  console.log("Exercise array: "+JSON.stringify(exerciseList));

    // Display user full name
    $('.profile-avatar-name').text(inputName);
    // End Stub

   // Display the goal the user selected
   $('.profile-avatar-job').text(displayGoal);

   // Update exercise count, total sets, total time based on logic above
   $('.w-row .profile-figures-number:eq(0)').text(exerciseCount);
   $('.w-row .profile-figures-number:eq(1)').text(totalSets);
   $('.w-row .profile-figures-number:eq(2)').text(totalTime);


    // Here is where we handle the received results and update the page's html  
    for (var i = 0; i < exerciseList.length; i++) {
      listItem = i + 1;

      if (exerciseList[i] != undefined) {

        name = exerciseList[i]["exercise_name"];
        img = 'images/exercise_img/'+exerciseList[i]["exercise_image"];        

        if (inputWorkout != "none" || inputGoal == "run faster") {
          // Calculate rest time, sets, reps per exercise
          switch (exerciseList[i]["exercise_name"]) {
            case "Foam Roll":
            case "One Leg Squat on Balance Board":
            case "Stretch Table":
              repRange = "3-4 reps";
              numSets = "2 sets";
              restTime = "1 min";
            break;              
            case "Box Jump":              
            case "Battling Ropes":
            case "Medicine Ball Slam":
            case "Weighted Sled Drag":
              repRange = "1 min";
              numSets = "3 sets";
              restTime = "2 min";  
            break;              
            default:
              repRange = "5 mins w/u";
              restTime = exerciseTime;
              numSets = "";
            break; 
          }
        }

        restTime = restTime || exerciseTime || "";

        html = "<li class='profile-list-bookmark' data-ix='list-item' style='opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px); transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1), transform 500ms cubic-bezier(0.23, 1, 0.32, 1);'><a class='profile-list-link w-clearfix w-inline-block' data-load='1' href='video_a1.html?list="+name+"'><div class='bg-"+listItem+" profile-list-image' style='background-image:url("+img+")'></div><div class='profile-list-text'><div class='event-title'>"+name+"</div><div class='text-event-wrap w-clearfix'><div class='event-text suggested-stats'>"+ repRange +"</div><div class='event-text suggested-stats'>"+ numSets +"</div><div class='event-text suggested-stats'>"+ restTime +"</div></div></div></a></li>"

        $('.list.list-events').append(html);
      }
    }
  })

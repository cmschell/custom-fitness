# A Blank PhoneGap App

## Usage

### PhoneGap 

   1. Open project in PhoneGap: http://docs.phonegap.com/references/desktop-app/open-project/

### Desktop

In your browser, open the file:

    /www/index.html

 ### To set up PHP test
 
 1. Make sure you have Apache/MySQL/PHP set up on your local computer.
 	1a. Download XAMPP  - https://www.apachefriends.org/download.html
 	1b. Follow instructions here for Windows - https://www.maketecheasier.com/setup-local-web-server-all-platforms/
 2. Navigate to where you downloaded the custom-fitness repo and find the 'response.php' file
 3. Drag that to somewhere on your localhost directory
 4. Open workout_a.html and update the "url" in the .ajax POST to: http://localhost/[PATH/TO/FILE/ON/YOUR/LOCAL-COMPUTER]/response.php 

 		Here is what the .ajax POST looks like at the bottom of workout_a.html: 

 		$.ajax({
          type: "POST",
          dataType: "json",
          url: "http://localhost/~ChristinaSchell/php/response.php", //<=== UPDATE THAT. Relative or absolute path to response.php file
          data: data,
          success: function(data) {

              console.log(data);
             // alert(JSON.stringify(data));

            $(".body").html(
              "location: " + data["location"] + "<br />fitnessLevel: " + data["fitnessLevel"] + "<br />goal: " + data["goal"] + "<br />JSON: " + data["json"]
            );

            alert("Form submitted successfully.\nReturned json: " + data["json"]);
          },
          error: function(e) {
              alert('Error: ' + e.message);
          }

        });

 5. Make sure to update the url to be the path to the response.php on your local computer
 6. Open the CustomFitness PhoneGap project on your browser
 7. Navigate to preferences_a.html
 8. Select options and click submit
 9. If everything is set up properly you will see an alert with JSON data and the workout_a.html will print out the data that was manipulated in the php file.  


// counters
let totalClicks = 0; // all clicks on the entire page
let totalKeyPresses = 0;    // every time a key is pressed - since holding a key down is read as
                            // the same number of presses as characters typed and we want to count a long press asa a single press,
                            // this corresponds to the 'keyup' event 
let totalCharactersTyped = 0;   // since a long press is processed as several down presses, this corresponds to the 
                                // of characters typed and the 'keypress' event
let startTime = new Date();     // start time at page reload

// variable for checking wether the second (hidden) submit button has been pressed 
// and we can thus continue onto the password screen (since our signup page has 2 screens)
let passContinue = false;

// main function
function displayTrackingInfo() {
    //debug log
    console.log("tracking info called");

    // check which div to display - the one on the first page or on the password page
    // since passContinue turns true when the hidden continue to password button is pressed,
    // it will be true when the password screen is reached
    // (there is a hidden continue button such that we proceed to the password screen
    // only after user has looked at the (initially hidden) tracking statistics (div) on screen)
    let infodiv, infotext;
    if (!passContinue) {
        infodiv = document.getElementById("tracking-info1");
        infotext = document.getElementById("tracking-text1");
    } else {
        infodiv = document.getElementById("tracking-info2");
        infotext = document.getElementById("tracking-text2");
    }

    // make the respective div visible
    infodiv.style.visibility = "visible";

    let time = millisToReadable(calcElapsedTime(startTime)); //the time the page was open
    // set the message to display
    infotext.innerHTML = "Total clicks: " + totalClicks 
                        + "<br>Time page open: " + time 
                        + "<br>Total key presses: " + totalKeyPresses
                        + "<br>Total charcaters typed: " + totalCharactersTyped;
    
    // return whether we can continue to password screen
    return passContinue;
}

// addd event listener functions
document.addEventListener("DOMContentLoaded", function() {
    // debug 
    console.log("display info div " + passContinue);

    // increment clicks whenever anything is clicked
    document.body.addEventListener('click', function() {
        totalClicks++;
        console.log("clicks = " + totalClicks);
    });

    // add the key/character increment functions to the input fields and text area (bio input field)
    var inputFields = document.getElementsByTagName('input');
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener('keypress', incCharacterCount);

        inputFields[i].addEventListener('keyup', incKeyPressed);
    }

    var textAreaFields = document.getElementsByTagName('textarea');
    for (var i = 0; i < textAreaFields.length; i++) {
        textAreaFields[i].addEventListener('keypress', incCharacterCount);

        textAreaFields[i].addEventListener('keyup', incKeyPressed);
    }

    // hidden submit button pressed, can continue to password screen
    document.getElementById('pass-continue').addEventListener('click', () => {
        passContinue = true;
        console.log("pass");
    })

    // password screen submit has been pressed, display pass screen div
    document.getElementById('submit-new-acc').addEventListener('click', () => {
        passContinue = true;
        console.log("pass");
    })
});

// helper functions
function incKeyPressed() {
    totalKeyPresses++;
    console.log("keyp = " + totalKeyPresses);
}

function incCharacterCount() {
    totalCharactersTyped++;
    console.log("char = " + totalCharactersTyped);
}

// calculates the time that passed since page was reloaded until div is displayed (submit button pressed)
function calcElapsedTime(start) {
    let end = new Date();
    return end.getTime() - start.getTime();;
}

// turns miliseconds into a 'minutes : seconds ' string format
function millisToReadable(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Math.floor(((millis % 60000) / 1000));
    return ((seconds == 60) ? minutes + 1 : minutes) + " minutes and " + seconds + " seconds";
}
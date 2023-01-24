// counters
let totalClicks = 0; // all clicks on the entire page
let totalKeyPresses = 0;    // every time a key is pressed - since holding a key down is read as
                            // the same number of presses as characters typed and we want to count a long press asa a single press,
                            // this corresponds to the 'keyup' event 
let totalCharactersTyped = 0;   // since a long press is processed as several down presses, this corresponds to the 
                                // of characters typed and the 'keypress' event
let startTime = new Date();

// main function
function displayTrackingInfo() {
    let infodiv = document.getElementById("tracking-info");
    let infotext = document.getElementById("tracking-text");
    infodiv.style.visibility = "visible";

    let time = millisToReadable(calcElapsedTime(startTime)); // currently gives the time the page was open
    infotext.innerHTML = "Total clicks: " + totalClicks 
                        + "<br>Time page open: " + time 
                        + "<br>Total key presses: " + totalKeyPresses
                        + "<br>Total charcaters typed: " + totalCharactersTyped;
}

// event listener functions
document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener('click', function() {
        totalClicks++;
        console.log("clicks = " + totalClicks);
    });

    var inputFields = document.getElementsByTagName('input');
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener('keypress', () => {
            totalCharactersTyped++;
            console.log("char = " + totalCharactersTyped);
        });

        inputFields[i].addEventListener('keyup', () => {
            totalKeyPresses++;
            console.log("keyp = " + totalKeyPresses);
        })
    }
});

// helper functions
function calcElapsedTime(start) {
    let end = new Date();
    return end.getTime() - start.getTime();;
}

function millisToReadable(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Math.floor(((millis % 60000) / 1000));
    return ((seconds == 60) ? minutes + 1 : minutes) + " minutes and " + seconds + " seconds";
}
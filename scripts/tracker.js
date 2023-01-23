// counters
let totalClicks = 0;
let totalKeyPresses = 0;
let totalCharactersTyped = 0;
let startTime = new Date();

// main function
function displayTrackingInfo() {
    let infodiv = document.getElementById("tracking-info");
    let infotext = document.getElementById("tracking-text");
    infodiv.style.visibility = "visible";

    let time = millisToReadable(calcElapsedTime(startTime)); // currently gives the time the page was open
    infotext.innerHTML = "Total clicks: " + totalClicks + "<br>Time page open: " + time;
}

// event listener functions
document.body.addEventListener('click', function() {
    totalClicks++;
    console.log(totalClicks);
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
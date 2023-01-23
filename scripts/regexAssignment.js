let userID = /^[A-Z].{3,10}(\d|\W)$/;
//must start with a capital letter, followed by 3 to 10 characters and ending with a digit or a special character
let password = /.{12,}/; //any character at least 12 times
let name = /^[A-Za-z]+$/;
//must have at least one letter in the name
let zipCode = /^[0-9]{4,4}[A-Za-z]{2,2}$/;
//the first 4 characters are digits and the last 2 are letters
let email =
  /^([A-Za-z0-9]{1,1})([A-Za-z0-9\.\-\_]{3,})([A-Za-z0-9]{1,1})@([A-Za-z0-9]{1,1})([a-zA-Z0-9\.\-]{2,})([A-Za-z0-9]{1,1})\.([a-z]{2,})$/;
//the first and last chars of the username and of the domain must be letters or numbers ([A-Za-z0-9]{1,1})
//supported characters for the local-part among letters and digits are hyphens, dots and underscores
//cannot check whether there are 2 consecutive hyphens, underscores or dots
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("birthday")
    .setAttribute("max", new Date().toISOString().split("T")[0]);
});
let alphabetBig = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let alphabetSmall = alphabetBig.toLowerCase();
let specialCharacter = "~`!@#$%^&*()-_+={}[]|/:;'<>,.?";
let invEmailCharacters = "~`!@#$%^&*()+={}[]|/:;'<>,?";
let numbers = "0123456789";

const checkUserID = (value) => {
  if (alphabetBig.indexOf(value.charAt(0)) == -1) {
    return false;
  }
  if (value.length < 5 || value.length > 12) {
    return false;
  }
  if (
    numbers.indexOf(value.charAt(value.length - 1)) == -1 &&
    specialCharacter.indexOf(value.charAt(value.length - 1)) == -1 &&
    value.charAt(value.length - 1) != '"'
  ) {
    return false;
  }

  return true;
};

const checkPassword = (value) => {
  let good = "ok";
  let howMany = 1;
  let splitted = value.split("");
  if (value.length < 12) {
    return false;
  }
  for (var character of splitted) {
    if (alphabetBig.indexOf(character) != -1) {
      if (howMany % 2 != 0) {
        howMany = howMany * 2;
      }
    }
    if (alphabetSmall.indexOf(character) != -1) {
      if (howMany % 3 != 0) {
        howMany = howMany * 3;
      }
    }
    if (numbers.indexOf(character) != -1) {
      if (howMany % 5 != 0) {
        howMany = howMany * 5;
      }
    }
    if (specialCharacter.indexOf(character) != -1 || character == '"') {
      if (howMany % 7 != 0) {
        howMany = howMany * 7;
      }
    }
  }
  if (howMany != 210) {
    return false;
  }
  if (value.length >= 14) {
    good = "better";
  }
  return good;
};

const checkName = (value) => {
  let splitted = value.split("");
  for (var character of splitted) {
    if (
      numbers.indexOf(character) != -1 ||
      specialCharacter.indexOf(character) != -1 ||
      character == '"'
    ) {
      return false;
    }
  }
  return true;
};

const checkZipCode = (value) => {
  if (value.length != 6) {
    return false;
  }
  if (
    typeof parseInt(value.substring(0, 4)) != "number" || //it must be possible to be parsed and all 4 characters must be digits
    parseInt(value.substring(0, 4)) < 1000
  ) {
    return false;
  }
  var lastTwo = value.substring(4, 6).toLowerCase();
  if (
    alphabetSmall.indexOf(lastTwo.charAt(0)) == -1 || //the last to characters must be letters
    alphabetSmall.indexOf(lastTwo.charAt(1)) == -1
  ) {
    return false;
  }
  return true;
};

const functiona = (value) => {
  var splitted = value.split("@");
  console.log(splitted);
  if (splitted.length != 2) {
    return false;
  }
  for (var character of splitted[0].split("")) {
    if (invEmailCharacters.indexOf(character) != -1) {
      //only valid characters
      return false;
    }
  }
  for (var character of splitted[1].split("")) {
    if ((invEmailCharacters + "_").indexOf(character) != -1) {
      //only valid characters
      return false;
    }
  }
  if (
    splitted[1].split(".")[splitted[1].split(".").length - 1].indexOf("-") != //if the top-level domain contains hyphens or is too short return false
      -1 &&
    splitted[1].split(".")[splitted[1].split(".").length - 1].length < 2
  ) {
    return false;
  }

  if (
    splitted[0].split("")[0] == "-" ||
    splitted[0].split("")[0] == "." || //if first char is ".", "-" or "_" return false
    splitted[0].split("")[0] == "_"
  ) {
    return false;
  }
  if (
    splitted[0].split("")[splitted[0].split("").length - 1] == "-" ||
    splitted[0].split("")[splitted[0].split("").length - 1] == "." || //if last char is ".", "-" or "_" return false
    splitted[0].split("")[splitted[0].split("").length - 1] == "_"
  ) {
    return false;
  }
  return true;
};
function checkAndDisplay() {
  var zipcode = document.getElementById("zip").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var languages = document.getElementById("languages").value;
}

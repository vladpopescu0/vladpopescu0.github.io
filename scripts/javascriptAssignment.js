document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("birthday")
    .setAttribute("max", new Date().toISOString().split("T")[0]);
  document
    .getElementById("logincontinue")
    .addEventListener("click", checkAndDisplay);
  document
    .getElementById("submit-new-acc")
    .addEventListener("click", passwordValid);
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
  if (value == "") {
    return false;
  }
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
    console.log("lopa");
    console.log(value.length);
    return false;
  }
  if (
    typeof parseInt(value.substring(0, 4)) != "number" || //it must be possible to be parsed and all 4 characters must be digits
    parseInt(value.substring(0, 4)) < 1000
  ) {
    console.log(parseInt(value.substring(0, 4)));
    return false;
  }
  var lastTwo = value.substring(4, 6).toLowerCase();
  if (
    alphabetSmall.indexOf(lastTwo.charAt(0)) == -1 || //the last to characters must be letters
    alphabetSmall.indexOf(lastTwo.charAt(1)) == -1
  ) {
    console.log("ugabuga");
    return false;
  }
  return true;
};

const checkEmail = (value) => {
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
  console.log("ceva");
  var zipcode = document.getElementById("zip")?.value;
  var username = document.getElementById("username")?.value;
  var email = document.getElementById("email")?.value;
  var languages = document.getElementById("lang")?.value;
  var fName = document.getElementById("fname")?.value;
  var lName = document.getElementById("lname")?.value;
  var address = document.getElementById("address")?.value;
  var country = document.getElementById("country")?.value;
  var gender = [
    document.getElementById("sexm")?.checked,
    document.getElementById("sexf")?.checked,
    document.getElementById("sexo")?.checked,
  ];
  var date = document.getElementById("birthday")?.value;
  var about = document.getElementById("bio")?.value;

  if (gender[0]) {
    gender = "Male";
  } else if (gender[1]) {
    gender = "Female";
  } else {
    gender = "Other";
  }
  console.log(
    checkName(fName).toString() +
      checkName(lName).toString() +
      checkUserID(username).toString() +
      checkZipCode(zipcode).toString() +
      checkEmail(email).toString()
  );
  if (
    checkName(fName) &&
    checkName(lName) &&
    checkUserID(username) &&
    checkZipCode(zipcode) &&
    checkEmail(email) &&
    languages != "" &&
    country != ""
  ) {
    alert(
      "Username: " +
        username +
        "\n" +
        "First Name: " +
        fName +
        "\n" +
        "Last Name: " +
        lName +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Gender: " +
        gender +
        "\n" +
        "Languages: " +
        languages +
        "\n" +
        "Country: " +
        country +
        "\n" +
        "Zipcode: " +
        zipcode +
        "\n" +
        (address != "" ? "Address: " + address + "\n" : "") +
        (date != "" ? "Birthday: " + date + "\n" : "") +
        (about != "" ? "Bio: " + about + "\n" : "")
    );
    document.getElementById("signup-form").submit();
    //location.href = "#password-screen";
  } else {
    if (!checkEmail(email)) {
      document.getElementById("email").value = "";
      document.getElementById("email").style.border = "red 2px solid";
      document.getElementById("spanemail").style.display = "block";
    }
    if (!checkUserID(username)) {
      document.getElementById("username").value = "";
      document.getElementById("username").style.border = "red 2px solid";
      document.getElementById("spanusername").style.display = "block";
    }
    if (!checkName(fName)) {
      document.getElementById("fname").value = "";
      document.getElementById("fname").style.border = "red 2px solid";
      document.getElementById("spanfname").style.display = "block";
    }
    if (!checkName(lName)) {
      document.getElementById("lname").value = "";
      document.getElementById("lname").style.border = "red 2px solid";
      document.getElementById("spanlname").style.display = "block";
    }
    if (!checkZipCode(zipcode)) {
      document.getElementById("zip").value = "";
      document.getElementById("zip").style.border = "red 2px solid";
      document.getElementById("spanzip").style.display = "block";
    }
    if (languages == "") {
      document.getElementById("lang").style.border = "red 2px solid";
      document.getElementById("spanlanguages").style.display = "block";
    }
    if (country == "") {
      document.getElementById("country").style.border = "red 2px solid";
      document.getElementById("spancountry").style.display = "block";
    }
  }
}

const passwordValid = () => {
  const password = document.getElementById("pwd").value;
  const passwordConfirm = document.getElementById("confirm-pwd").value;
  console.log(checkPassword(password));
  if (checkPassword(password) && passwordConfirm == password) {
    document.getElementById("password-form").submit();
  }
  if (!checkPassword(password)) {
    document.getElementById("pwd").value = "";
    document.getElementById("confirm-pwd").value = "";
    document.getElementById("pwd").style.border = "red 2px solid";
    document.getElementById("spanpassword").style.display = "block";
    return;
  }
  if (password != passwordConfirm) {
    document.getElementById("pwd").style.border = "";
    document.getElementById("spanpassword").style.display = "none";
    document.getElementById("confirm-pwd").value = "";
    document.getElementById("confirm-pwd").style.border = "red 2px solid";
    document.getElementById("spanconfirm").style.display = "block";
  }
};

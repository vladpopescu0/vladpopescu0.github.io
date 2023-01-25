//!!The regex part of the assignment is similar to the javascript in order to keep the design the same for both.
//!!Instead of using the javascript function which return true or false,
//we used RegExp.test(String string) which returns true if the regex matches the string

let userIDReg = /^[A-Z].{3,10}(\d|\W)$/;
//must start with a capital letter, followed by 3 to 10 characters and ending with a digit or a special character
let passwordReg = /.{12,}/; //any character at least 12 times
let nameReg = /^[A-Za-z]+$/;
//must have at least one letter in the name
let zipCodeReg = /^[0-9]{4,4}[A-Za-z]{2,2}$/;
//the first 4 characters are digits and the last 2 are letters
let emailReg =
  /^([A-Za-z0-9]{1,1})([A-Za-z0-9\.\-\_]{1,})([A-Za-z0-9]{1,1})@([A-Za-z0-9]{1,1})([a-zA-Z0-9\.\-]{1,})([A-Za-z0-9]{1,1})\.([a-z]{2,})$/;
//the first and last chars of the username and of the domain must be letters or numbers ([A-Za-z0-9]{1,1})
//supported characters for the local-part among letters and digits are hyphens, dots and underscores
//cannot check whether there are 2 consecutive hyphens, underscores or dots

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("birthday")
    .setAttribute("max", new Date().toISOString().split("T")[0]);
  // document
  //   .getElementById("logincontinue")
  //   .addEventListener("click", checkAndDisplay);
  // document
  //   .getElementById("submit-new-acc")
  //   .addEventListener("click", passwordValid);
});
function checkAndDisplay() {
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
  if (
    nameReg.test(fName) &&
    nameReg.test(lName) &&
    userIDReg.test(username) &&
    zipCodeReg.test(zipcode) &&
    emailReg.test(email) &&
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
    // document.getElementById("signup-form").submit();
    //location.href = "#password-screen";
    return true;
  } else {
    if (!emailReg.test(email)) {
      document.getElementById("email").value = "";
      document.getElementById("email").style.border = "red 2px solid";
      document.getElementById("spanemail").style.display = "block";
    }
    if (!userIDReg.test(username)) {
      document.getElementById("username").value = "";
      document.getElementById("username").style.border = "red 2px solid";
      document.getElementById("spanusername").style.display = "block";
    }
    if (!nameReg.test(fName)) {
      document.getElementById("fname").value = "";
      document.getElementById("fname").style.border = "red 2px solid";
      document.getElementById("spanfname").style.display = "block";
    }
    if (!nameReg.test(lName)) {
      document.getElementById("lname").value = "";
      document.getElementById("lname").style.border = "red 2px solid";
      document.getElementById("spanlname").style.display = "block";
    }
    if (!zipCodeReg.test(zipcode)) {
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
    return false;
  }
}

const passwordValid = () => {
  const password = document.getElementById("pwd").value;
  const passwordConfirm = document.getElementById("confirm-pwd").value;
  if (passwordReg.test(password) && passwordConfirm == password) {
    // document.getElementById("password-form").submit();
    return true;
  }
  if (!passwordReg.test(password)) {
    document.getElementById("pwd").value = "";
    document.getElementById("confirm-pwd").value = "";
    document.getElementById("pwd").style.border = "red 2px solid";
    document.getElementById("spanpassword").style.display = "block";
    return false;
  }
  if (password != passwordConfirm) {
    document.getElementById("pwd").style.border = "";
    document.getElementById("spanpassword").style.display = "none";
    document.getElementById("confirm-pwd").value = "";
    document.getElementById("confirm-pwd").style.border = "red 2px solid";
    document.getElementById("spanconfirm").style.display = "block";
  }
  return false;
};

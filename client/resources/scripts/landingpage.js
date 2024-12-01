function validate(event, loginForm) {
    // Prevent the default form submission behavior
    event.preventDefault();

    var booValid = true;
    var strErrorMessage = "";

    // Check if the login ID is valid
    var validLoginIDs = ["jss1@yahoo.com.au"];
    if (!validLoginIDs.includes(loginForm.loginid.value)) {
        strErrorMessage += "Incorrect Login ID, Please try again\n";
        booValid = false;
    }

    if (!booValid) {
        alert(strErrorMessage); 
    } else {
        window.location.href = "adminpage.html"; 
    }
}
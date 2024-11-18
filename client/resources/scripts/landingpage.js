function validate(loginForm) {
    var booValid = true;
    var strErrorMessage = "";
 
    if (loginForm.loginid.value != "jss1@yahoo.com.au" && loginForm.loginid.value != "jss1@yahoo.com.au" && loginForm.loginid.value != "jss1@yahoo.com.au") {
        strErrorMessage += "Incorrect Login ID, Please try again\n";
        booValid = false;
    }
    if (!booValid) {
        alert(strErrorMessage);
    }
}
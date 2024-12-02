async function validate(event, loginForm) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5195/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const user = await response.json();

        if (user.isAdmin) {
            window.location.href = "adminpage.html";
        } else {
            window.location.href = "employeepage.html";
        }
    } catch (error) {
        alert("Invalid username or password. Please try again.");
        console.error(error);
    }
}

    // var booValid = true;
    // var strErrorMessage = "";

    // // Check if the login ID is valid
    // var validLoginIDs = ["jss1@yahoo.com.au"];
    // if (!validLoginIDs.includes(loginForm.loginid.value)) {
    //     strErrorMessage += "Incorrect Login ID, Please try again\n";
    //     booValid = false;
    // }

    // if (!booValid) {
    //     alert(strErrorMessage); 
    // } else {
    //     window.location.href = "adminpage.html"; 
    //}
//}
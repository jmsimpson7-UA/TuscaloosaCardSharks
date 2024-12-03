async function validate(event, loginForm) {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5195/login', {
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
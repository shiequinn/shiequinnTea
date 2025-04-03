document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Here you can add your authentication logic
    // For demonstration purposes, let's assume the username is "user" and the password is "pass"
    if (username === "user" && password === "pass") {
        // Redirect to the user account page
        window.location.href = "./index.profile.html"; // change to your actual user account page URL
    } else {
        alert("Invalid username or password");
    }
});

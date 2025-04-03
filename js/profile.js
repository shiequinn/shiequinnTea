// Initialize the user profile information
document.addEventListener('DOMContentLoaded', function() {
    // Load existing data if it exists
    const userName = localStorage.getItem('username') || 'Guest';
    const userEmail = localStorage.getItem('email') || '';
    const userPhone = localStorage.getItem('phone') || '';
    const userAddress = localStorage.getItem('address') || '';
    const userImage = localStorage.getItem('profileImage') || ''; // Default image if not uploaded

    // Populate the profile with stored values
    document.getElementById('profile-user-name').textContent = userName;
    document.getElementById('profile-user-email').textContent = userEmail;
    document.getElementById('profile-user-phone').textContent = userPhone;
    document.getElementById('profile-user-address').textContent = userAddress;

    // Set the profile picture
    document.getElementById('profileImage').src = userImage;

    // Update the greeting section with the user's full name
    const greeting = document.getElementById('Greeting');
    greeting.textContent = `Welcome, ${userName}!`;



    });

// Add logout functionality to the profile page
const confirmLogoutButton = document.getElementById('confirm-logout');
const cancelLogoutButton = document.getElementById('cancel-logout');

// Confirm logout button click event
if (confirmLogoutButton) {
    confirmLogoutButton.addEventListener('click', function() {
        console.log('Logout confirmed. Redirecting...');
        // Clear the localStorage if necessary
        localStorage.clear(); // Optional: clear all user data on logout
        // Redirect to the login page
        window.location.href = './index.login.html'; // Ensure this path is correct
    });
}

// Cancel logout button click event
if (cancelLogoutButton) {
    cancelLogoutButton.addEventListener('click', function() {
        console.log('Logout canceled. Redirecting to the main website...');
        // Redirect to the main website
        window.location.href = 'http://127.0.0.1:5501/index.html'; // Replace with your main website URL
    });
}
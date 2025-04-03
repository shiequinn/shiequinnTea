function submitForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value; // Handle password securely

    // Basic validation
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!validatePhone(phone)) {
        alert("Please enter a valid phone number.");
        return false;
    }
    // Further validations can be added as required
    // Save data into localStorage
 localStorage.setItem('username', name);
 localStorage.setItem('email', email);
 localStorage.setItem('phone', phone);
 localStorage.setItem('address', address);
 localStorage.setItem('profileImage', 'default_image_url.jpg'); // Set a default image URL or handle image upload separately


    // Redirect to profile.html with query parameters
    window.location.href = `index.profile.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}`;
    return false; // Prevent the form from submitting the traditional way
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return re.test(String(phone));
}
 

document.addEventListener('DOMContentLoaded', function() {
    // Load existing data if it exists (for demo purpose)
    const userName = localStorage.getItem('username') || '';
    const userEmail = localStorage.getItem('email') || '';
    const userPhone = localStorage.getItem('phone') || '';
    const userAddress = localStorage.getItem('address') || '';
    const userImage = localStorage.getItem('profileImage') || '';

    // Populate the form with stored values
    document.getElementById('fullName').value = userName;
    document.getElementById('email').value = userEmail;
    document.getElementById('phone').value = userPhone;
    document.getElementById('address').value = userAddress;

    // Set the preview image if it exists
    if (userImage) {
        document.getElementById('previewImage').src = userImage;
        document.getElementById('previewImage').style.display = 'block';
    }

    // Preview the image when uploaded
    document.getElementById('profileImage').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('previewImage').src = e.target.result;
                document.getElementById('previewImage').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
});

document.getElementById('editProfileForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const updatedName = document.getElementById('fullName').value;
    const updatedEmail = document.getElementById('email').value;
    const updatedPhone = document.getElementById('phone').value;
    const updatedAddress = document.getElementById('address').value;
    const profileImage = document.getElementById('profileImage').files[0];

    // Store updated values in local storage
    localStorage.setItem('username', updatedName);
    localStorage.setItem('email', updatedEmail);
    localStorage.setItem('phone', updatedPhone);
    localStorage.setItem('address', updatedAddress);
    
    // Save profile image if exists
    if (profileImage) {
        const reader = new FileReader();
        reader.onload = function() {
            localStorage.setItem('profileImage', reader.result);
        };
        reader.readAsDataURL(profileImage);
    }

    // Redirect back to profile page
    window.location.href = './index.profile.html';
};
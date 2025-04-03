// JavaScript to handle for my profile dropdwon 

document.getElementById('profile-user-name').innerText = 'John Doe'; // Replace with dynamic data

function myFunction() {
    // This function can be used to toggle dropdown if needed
    const dropdown = document.getElementById("dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}
function getUserData() {
    return {
        username: localStorage.getItem("username") || "Guest",
        imageUrl: localStorage.getItem("profileImage") || "path/to/default/image.jpg"
    };
}

function displayUserData() {
    const userData = getUserData();
    
    // Assuming the dropdown exists on all pages or is shown/created dynamically
    const profileImageElement = document.getElementById('profileImage');
    const profileNameElement = document.getElementById('profile-user-name');

    if (profileImageElement) {
        profileImageElement.src = userData.imageUrl;
    } else {
        console.error('Element with ID profile-image not found');
    }

    if (profileNameElement) {
        profileNameElement.textContent = userData.username;
    } else {
        console.error('Element with ID profile-user-name not found');
    }
}

// Ensure this call runs only when necessary
window.onload = displayUserData;




// Manually triggering the modal. You can control when to show it
document.getElementById('promotionModal').classList.add('show');

// Close the modal when the user clicks on <span> (x)
document.getElementById('closeModal').onclick = function() {
    document.getElementById('promotionModal').classList.remove('show');
};

   // Close the modal when the user clicks anywhere outside of the modal   
   window.onclick = function(event) {
       if (event.target == document.getElementById('promotionModal')) {
           document.getElementById('promotionModal').classList.remove('show');
       }
   };  
   document.addEventListener("DOMContentLoaded", () => {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const avgRatingElement = document.getElementById('avg-rating');
    const commentsSection = document.getElementById('comments-section');
    const ratingStars = document.querySelectorAll('.star');
    let selectedRating = 0;

    // Star rating selection
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            ratingStars.forEach(s => {
                s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= selectedRating);
            });
        });
    });

    // Restore existing comments
    comments.forEach(({ name, email, comment, rating }) => {
        displayReview(name, email, comment, rating);
    });

    document.getElementById('submit-button').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('review-user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();
        const comment = document.getElementById('user-comment').value.trim();

        // Validate inputs
        if (!name || !isValidEmail(email) || !comment || selectedRating === 0) {
            alert("Please fill in all fields, provide a valid email, and select a rating.");
            return;
        }

        ratings.push(selectedRating);
        comments.push({ name, email, comment, rating: selectedRating });
        localStorage.setItem('ratings', JSON.stringify(ratings));
        localStorage.setItem('comments', JSON.stringify(comments));

        updateAverageRating();
        displayReview(name, email, comment, selectedRating);

        // Clear input fields after submission
        document.getElementById('review-user-name').value = '';
        document.getElementById('user-email').value = '';
        document.getElementById('user-comment').value = '';
        selectedRating = 0;
        ratingStars.forEach(star => star.classList.remove('selected'));
    });

    // Update the average rating
    function updateAverageRating() {
        const totalRatings = ratings.length;
        if (totalRatings === 0) {
            avgRatingElement.textContent = '0';
            return;
        }
        const sumRatings = ratings.reduce((acc, curr) => acc + curr, 0);
        const average = (sumRatings / totalRatings).toFixed(1);
        avgRatingElement.textContent = `Average Rating: ${average} (${totalRatings} Reviews)`;
    }

    // Validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Display the submitted review
    function displayReview(name, email, comment, rating) {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `<strong>${name}</strong> (${email}): <br> ${comment} <br> Rating: ${starsDisplay(rating)} <hr>`;
        commentsSection.appendChild(reviewElement);
    }

    // Convert numeric rating to stars
    function starsDisplay(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating); // e.g., "★★★☆☆" for a 3-star rating
    }
});

// JavaScript to handle for the cart
//for shop content
const buttons = document.querySelectorAll('.sort-button button');
const items = document.querySelectorAll('.shop-items');

buttons.forEach(button => {
button.addEventListener('click', () => {
   const category = button.id.replace('show', '').toLowerCase(); // Get the category to show

   items.forEach(item => {
       if (category === 'all' || item.classList.contains(category)) {
           item.classList.add('active'); // Show item
       } else {
           item.classList.remove('active'); // Hide item
       }
   });
});
});

// Initial state, show all items by default
items.forEach(item => item.classList.add('active'));

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Toggle the 'active' class
});


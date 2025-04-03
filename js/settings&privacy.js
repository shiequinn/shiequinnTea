// Load settings and privacy preferences on page load
    document.addEventListener("DOMContentLoaded", function() {
        // Load username and notification preference
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const notificationsToggle = document.getElementById('notifications');
        const privateAccountToggle = document.getElementById('privateAccount');
        const hideEmailToggle = document.getElementById('hideEmail');
        const hidePhoneToggle = document.getElementById('hidePhone');
        const hideAddressToggle = document.getElementById('hideAddress');
        usernameInput.value = localStorage.getItem('username') || '';
        passwordInput.value = localStorage.getItem('password') || '';
        notificationsToggle.checked = localStorage.getItem('notifications') === 'true';


        privateAccountToggle.checked = localStorage.getItem('privateAccount') === 'true';
        hideEmailToggle.checked = localStorage.getItem('hideEmail') === 'true';
        hidePhoneToggle.checked = localStorage.getItem('hidePhone') === 'true';
        hideAddressToggle.checked = localStorage.getItem('hideAddress') === 'true';
    });

    // Save username and notification preferences
    document.getElementById('saveUsername').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        alert('Settings saved! Redirecting to profile page...');
        window.location.href = './index.profile.html';  // Redirect to profile page

    });

    const notifications = document.getElementById('notifications').checked;
    const saveNotification = document.getElementById('saveNotifications');

 document.getElementById('saveNotifications').addEventListener('click', function() {
    
    
       
    localStorage.setItem('notifications', notifications);

    alert('Settings saved! Redirecting to profile page...');
    window.location.href = './index.profile.html';  // Redirect to profile page

        

});

    // Save privacy settings
    document.getElementById('savePrivacy').addEventListener('click', function() {
        const privateAccount = document.getElementById('privateAccount').checked;
        const hideEmail = document.getElementById('hideEmail').checked;
        const hidePhone = document.getElementById('hidePhone').checked;
        const hideAddress = document.getElementById('hideAddress').checked;

        localStorage.setItem('privateAccount', privateAccount);
        localStorage.setItem('hideEmail', hideEmail);
        localStorage.setItem('hidePhone', hidePhone);
        localStorage.setItem('hideAddress', hideAddress);
        
        alert('Privacy settings saved! Redirecting to profile page...');
        window.location.href = './index.profile.html';  // Redirect to profile page
    });

   // JavaScript for FAQ toggle
   const faqQuestions = document.querySelectorAll('.faq-question');
   faqQuestions.forEach(question => {
       question.addEventListener('click', () => {
           const answer = question.nextElementSibling;
           answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
       });
   });
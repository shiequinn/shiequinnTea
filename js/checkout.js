// Function to handle payment method selection
function selectPaymentMethod(method) {
    const creditCardFields = document.getElementById('creditCardFields');
    const alipayFields = document.getElementById('alipayFields');
    const gcashFields = document.getElementById('gcashFields');

    // Hide all payment fields initially
    creditCardFields.style.display = 'none';
    alipayFields.style.display = 'none';
    gcashFields.style.display = 'none';

    // Show selected payment fields
    if (method === 'credit-card') {
        creditCardFields.style.display = 'block'; // Show credit card fields
    } else if (method === 'alipay') {
        alipayFields.style.display = 'block'; // Show Alipay fields
    } else if (method === 'gcash') {
        gcashFields.style.display = 'block'; // Show GCash fields
    }
}

// Form submission event
document.getElementById("checkoutForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Collect form data
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let zip = document.getElementById("zip").value;
    let paymentMethod = getSelectedPaymentMethod(); // Get the selected payment method
    
    // Generate order code
    let orderCode = generateOrderCode();

    // Simulate payment processing (you would integrate your payment processing here)
    let paymentSuccessful = await processPayment();

    if (paymentSuccessful) {
        // Display the confirmation modal
        displayConfirmation(fullName, email, address, city, state, zip, orderCode, paymentMethod);
    } else {
        alert("Payment failed. Please try again."); // Handle payment failure
    }

    
});

// Function to get the selected payment method
function getSelectedPaymentMethod() {
    const creditCardFields = document.getElementById('creditCardFields').style.display === 'block';
    const alipayFields = document.getElementById('alipayFields').style.display === 'block';
    const gcashFields = document.getElementById('gcashFields').style.display === 'block';
    

    if (creditCardFields) return 'Credit Card';
    if (alipayFields) return 'Alipay';
    if (gcashFields) return 'GCash';
    return 'Not selected'; // Default case
}

// Function to generate a unique order code
function generateOrderCode() {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000); // Example: generates an order code like ORD-123456
}

// Function to display confirmation in a modal
function displayConfirmation(fullName, email, address, city, state, zip, orderCode, paymentMethod) {
    let confirmationMessage = `
        <h2>Payment Confirmation</h2>
        <p>Order Code: <strong>${orderCode}</strong></p>
        <p>Name: ${fullName}</p>
        <p>Email: ${email}</p>
        <p>Address: ${address}, ${city}, ${state}, ${zip}</p>
        <p>Payment Method: ${paymentMethod}</p>
    `;

    // Hide the checkout form
    document.getElementById("checkoutForm").style.display = 'none';
    
    openModal(confirmationMessage); // Show modal with the confirmation message
}

// Function to open the modal
function openModal(orderDetails) {
    console.log('Opening modal with details:', orderDetails); // Log to check details
    document.getElementById('order-details').innerHTML = orderDetails; // Populate order details
    document.getElementById('confirmationModal').style.display = 'block'; // Show the modal
}

// Function to close the modal
function closeModal() {
document.getElementById('confirmationModal').style.display = 'none'; // Hide the modal

// Show the checkout form again
document.getElementById("checkoutForm").style.display = 'block';
}
// Function to continue shopping
function continueShopping() {
    // Logic for continuing shopping can be added here
    document.getElementById('confirmationModal').style.display = 'none';
    // When continuing shopping, we can optionally still show the checkout form
    document.getElementById('checkoutForm').style.display = 'block';
}
function showModal(orderDetails) {
    document.getElementById('order-details').innerText = orderDetails;
    document.getElementById('confirmationModal').style.display = 'block';
    // Hide checkout form when modal opens
    document.getElementById('checkoutForm').style.display = 'none';
}

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal and return to the checkout form
 closeModal.onclick = function() {
document.getElementById('confirmationModal').style.display = 'none';
document.getElementById('checkoutForm').style.display = 'block'; // Show checkout form again
}

 // When the user clicks anywhere outside of the modal, close it and return to the checkout form
 window.onclick = function(event) {
var modal = document.getElementById('confirmationModal');
if (event.target === modal) {
modal.style.display = "none";
document.getElementById('checkoutForm').style.display = 'block'; // Show checkout form again
}
}
// Optional: Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    var modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        closeModal();
    }
};


// Function to simulate the payment process (update this to integrate with Stripe/PayPal)
async function processPayment() {
    try {
        // Simulate a successful payment
        // Replace with actual payment processing logic
        return true; // Assume payment is successful
    } catch (error) {
        console.error("Payment Error: ", error);
        return false; // Handle payment error
    }
}


// Example function to simulate when the page loads
window.onload = function() {
    // You might want to trigger an action based on the context of your application
};
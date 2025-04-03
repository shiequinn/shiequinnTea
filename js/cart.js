document.addEventListener("DOMContentLoaded", function() {
    loadCart();

    document.getElementById('clear-cart').addEventListener('click', function() {
        localStorage.removeItem('cart');
        loadCart();
    });
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    const totalQuantityDiv = document.getElementById('total-quantity');

    cartItemsDiv.innerHTML = ''; // Clear existing items

    let totalPrice = 0; // New variable to calculate total price
    let totalQuantity = 0; // New variable to calculate total quantity

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} (x${item.quantity}) - HKD ${item.price * item.quantity}`;
        cartItemsDiv.appendChild(itemDiv);

        totalPrice += item.price * item.quantity;
        totalQuantity += item.quantity; // Add quantity to total quantity
    });

    totalDiv.textContent = `Total: HKD ${totalPrice}`;
    totalQuantityDiv.textContent = `Total Quantity: ${totalQuantity}`; // Update the total quantity div
}
// Description: JavaScript file for the shop page.
    function filterSelection(category) {
        // Get all elements with the class 'filterDiv'
        let filterDivs = document.getElementsByClassName("filterDiv");

        // If the category is 'all', show all items
        if (category === "all") category = "";

        // Loop through all filterDiv elements and hide/show them based on the category
        for (let i = 0; i < filterDivs.length; i++) {
            filterDivs[i].classList.remove("show");
            if (filterDivs[i].className.indexOf(category) > -1) {
                filterDivs[i].classList.add("show");
            }
        }

        // Get all buttons and clear the active class
        let buttons = document.getElementsByClassName("btn");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        // Add 'active' class to the button that was clicked
        const activeButton = document.querySelector(`.btn[onclick="filterSelection('${category}')"]`);
        if (activeButton) activeButton.classList.add("active");
    }

    // Call the filterSelection function to show all items by default
    document.addEventListener('DOMContentLoaded', function () {
        filterSelection('all');
    });

    // Optional: Add some CSS to handle the visibility of the items
    const styles = `
        .filterDiv {
            display: none;
        }
        .filterDiv.show {
            display: block;
        }
        .btn.active {
            background-color: #f3f3f3; /* Active button color */
            color: #333; /* Active button text color */
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

// Compare this snippet from js/cart.js:

// Description: JavaScript file for the cart page.
// shop.js
document.addEventListener("DOMContentLoaded", function() {
  const cartCountDisplay = document.getElementById("cart-count");

  // Load cart count from localStorage
  updateCartCount();

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll('.shop-item-button').forEach(button => {
      button.addEventListener('click', function() {
          const itemContainer = this.closest('.filterDiv');
          const itemName = itemContainer.querySelector('.shop-item-title').innerText;
          const itemPrice = itemContainer.querySelector('.shop-item-price').innerText.replace(/[^\d.-]/g, ''); // Extract numeric price
          const itemId = itemContainer.dataset.category + '-' + itemName; // Unique ID

          addToCart(itemId, itemName, itemPrice);
      });
  });

  function addToCart(id, name, price) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
          existingItem.quantity += 1; // Increase quantity if already exists
      } else {
          cart.push({ id, name, price: parseFloat(price), quantity: 1 }); // Add new item to cart
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert(`${name} has been added to your cart!`);
  }

  function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountDisplay.textContent = totalCount;
  }
});
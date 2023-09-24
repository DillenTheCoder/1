document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button'); // Get the checkout button element
    const totalLabelElement = document.getElementById('total-label'); // Get the total label element

    // Initialize or retrieve the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = calculateTotalPrice(cart); // Initialize total price

    // Function to calculate the total price
    function calculateTotalPrice(cartItems) {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // Function to remove an item from the cart
    function removeFromCart(productId) {
        // Find the item to be removed
        const removedItem = cart.find(item => item.id === productId);

        // Check if the item was found
        if (removedItem) {
            // Subtract the price of the removed item from the total price
            totalPrice -= removedItem.price * removedItem.quantity;

            // Remove the item from the cart
            cart = cart.filter(item => item.id !== productId);

            // Update the cart in local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Refresh the cart display
            displayCart();

            // Update the total amount in the HTML immediately
            totalAmountElement.textContent = totalPrice.toFixed(2);
        }

        // Update the checkout button visibility
        updateCheckoutButtonVisibility();
    }

    // Function to refresh the cart display
    function displayCart() {
        if (cart.length === 0) {
            // Display a message when the cart is empty
            cartItemsContainer.innerHTML = '<p class="emtycarttext">Your cart is empty. Continue Shopping ?';
            
            // Hide the total label and total amount when the cart is empty
            totalLabelElement.style.display = 'none';
            totalAmountElement.style.display = 'none';
            // Hide the checkout button when the cart is empty
            checkoutButton.style.display = 'none';
        } else {
            // Display cart items in the cart page
            cartItemsContainer.innerHTML = ''; // Clear previous content

            cart.forEach(item => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('cart-item');

                // Display product name, price, and quantity
                const productInfo = document.createElement('div');
                productInfo.classList.add('product-info');
                productInfo.innerHTML = `
                    <p class="product-name">${item.name}</p>
                    <p class="product-price">R${item.price.toFixed(2)}</p>
                    <p class="product-quantity">Quantity: ${item.quantity}</p>
                `;
                productDiv.appendChild(productInfo);

                // Add a "Remove" button as a Font Awesome icon
                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="fas fa-times"></i>'; // Font Awesome "X" icon
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', () => {
                    removeFromCart(item.id);
                });
                productDiv.appendChild(removeButton);

                cartItemsContainer.appendChild(productDiv);
            });

            // Update the total amount in the HTML
            totalAmountElement.textContent = totalPrice.toFixed(2);
            
            // Show the total label and total amount when there are items in the cart
            totalLabelElement.style.display = 'block';
            totalAmountElement.style.display = 'block';

            // Show the checkout button if there are items in the cart
            checkoutButton.style.display = 'block';
        }
    }

    // Function to update the checkout button visibility
    function updateCheckoutButtonVisibility() {
        if (cart.length === 0) {
            // Hide the checkout button if the cart is empty
            checkoutButton.style.display = 'none';
        } else {
            // Show the checkout button if there are items in the cart
            checkoutButton.style.display = 'block';
        }
    }

    // Display the cart when the page is loaded
    displayCart();
});








// Example cart item
const cartItem = {
    id: 1,
    name: 'Product 1',
    price: 10.00,
    quantity: 2,
    image: 'images/1.png', // Add the image URL for this product
};
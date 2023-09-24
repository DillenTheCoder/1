

// Function to display product cards based on the search input
function displayProductCards(searchText) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear previous results

    const searchMessage = document.createElement('div'); // Create a div for the search message
    searchMessage.classList.add('search-message');

    if (searchText.trim() === '') {
        // Clear product details when the search input is empty
        clearProductDetails();
        return; // No search query, so don't display any products
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        // If no products match the search term, display a message
        searchMessage.textContent = `We could not find results for "${searchText}".`;
        productList.appendChild(searchMessage);
    } else {
        filteredProducts.forEach(product => {
            const card = document.createElement('div'); // Change to a div element
            card.classList.add('product-card');

            // Create and add the image element
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = 'Product Image';
            card.appendChild(image);

            // Create and add the product name
            const nameDiv = document.createElement('div');
            nameDiv.innerHTML = `<h3>${product.name}</h3>`;
            card.appendChild(nameDiv);

            // Create and add the product price
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('product-price'); // Add a class for styling
            priceDiv.textContent = product.price; // Set the price text
            card.appendChild(priceDiv);



            productList.appendChild(card);
        });

        // Clear the search message if products are found
        searchMessage.textContent = '';
    }
}

// Function to clear product details
function clearProductDetails() {
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = ''; // Clear product details
    productDetails.style.display = 'none'; // Hide the product details panel
}

// Event listener for the search input
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim();
    displayProductCards(searchText);
});

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 5000);
}










function displayProductCards(searchText) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear previous results

    const searchMessage = document.createElement('div'); // Create a div for the search message
    searchMessage.classList.add('search-message');

    if (searchText.trim() === '') {
        // Clear product details when the search input is empty
        clearProductDetails();
        return; // No search query, so don't display any products
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        // If no products match the search term, display a message
        searchMessage.textContent = `We could not find results for "${searchText}".`;
        productList.appendChild(searchMessage);
    } else {
        filteredProducts.forEach(product => {
            const card = document.createElement('div'); // Change to a div element
            card.classList.add('product-card');

            // Create and add the image element
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = 'Product Image';
            card.appendChild(image);

            // Create and add the product name
            const nameDiv = document.createElement('div');
            nameDiv.innerHTML = `<h3>${product.name}</h3>`;
            card.appendChild(nameDiv);

            // Create and add the product price
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('product-price'); // Add a class for styling
            priceDiv.textContent = product.price; // Set the price text
            card.appendChild(priceDiv);

            // Create and add the button
            const button = document.createElement('button');
            button.textContent = 'View Details'; // You can customize the button text
            button.classList.add('view-details-button'); // Add a class for styling
            card.appendChild(button);

            // Add a click event listener to the button to handle its action (e.g., opening a product description)
            button.addEventListener('click', () => {
                // Handle the button click action here, e.g., by opening the product description
                // You can use product.descriptionUrl to navigate to the description page
                console.log(`View details of ${product.name}`);
            });

            productList.appendChild(card);
        });

        // Clear the search message if products are found
        searchMessage.textContent = '';
    }
}

























document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Initialize the cart with an empty array if it doesn't exist in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productDiv = event.target.closest('.product');
        const productId = productDiv.getAttribute('data-product-id');
        const productName = productDiv.getAttribute('data-product-name');
        const productPrice = parseFloat(productDiv.getAttribute('data-product-price'));

        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        // Store the updated cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
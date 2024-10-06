import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utilss.mjs';

// Function to render the cart contents and calculate total
function renderCartContents() {
  console.log('Rendering cart contents...');

  // Get the cart items from localStorage, or initialize an empty array if it doesn't exist
  const cartItems = getLocalStorage('so-cart') || [];
  console.log('Cart items:', cartItems);

  const emptyCartButton = document.getElementById("emptyCartBtn");
  const cartFooter = document.getElementById("cartFooter");

  // Check if the cart is empty
  if (cartItems.length > 0) {
    // Render the cart items using the cartItemTemplate function
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate and display the total price
    const total = cartItems.reduce((acc, item) => acc + (item.FinalPrice || 0) * (item.quantity || 1), 0);
    document.getElementById("cartTotalAmount").textContent = total.toFixed(2);

    // Show the cart footer and "Empty Cart" button if there are items
    cartFooter.classList.remove("hide");
    emptyCartButton.classList.remove("hide");

    // Attach the event listener to the "Empty Cart" button
    emptyCartButton.addEventListener("click", emptyCart);

    // Attach event listeners for quantity change
    document.querySelectorAll('.cart-card__quantity').forEach(input => {
      input.addEventListener('input', handleQuantityChange);
    });
  } else {
    // If there are no items in the cart, show an empty cart message and hide the cart footer
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    emptyCartButton.classList.add("hide"); // Hide the empty cart button when there's nothing in the cart
  }
}

// Template for rendering a single cart item
function cartItemTemplate(item) {
  const quantity = item.quantity || 1;  // Ensure quantity has a default value
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryExtraLarge}" alt="${item.Name}" />
      </a>
      <a href="${item.Url}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <input type="number" min="1" value="${quantity}" class="cart-card__quantity" data-id="${item.Id}" />
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Function to clear the cart
function emptyCart() {
  console.log('Emptying cart...');

  // Clear the cart from localStorage
  setLocalStorage('so-cart', []);

  // Rerender the cart to show an empty cart message
  renderCartContents();
  updateCartCount();
}

// Function to handle quantity changes
function handleQuantityChange(event) {
  const newQuantity = parseInt(event.target.value);
  const productId = event.target.dataset.id;

  // Get current cart items from localStorage
  let cartItems = getLocalStorage('so-cart') || [];

  // Find the product by its ID and update its quantity
  const productIndex = cartItems.findIndex(item => item.Id === productId);
  if (productIndex >= 0) {
    cartItems[productIndex].quantity = newQuantity;

    // Save updated cart back to localStorage
    setLocalStorage('so-cart', cartItems);

    // Re-render the cart and update the total
    renderCartContents();
    updateCartCount();
  }
}

// Function to update the cart count
function updateCartCount() {
  console.log('Updating cart count...');

  // Get the cart items from localStorage
  const cartItems = getLocalStorage('so-cart') || [];

  // Calculate the total quantity of all items in the cart
  const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  console.log('Total items in cart:', totalItems);

  // Select the cart count element and update its content
  const cartCountElement = document.getElementById('addProductCount');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems > 0 ? totalItems : '';
  } else {
    console.error('Cart count element not found.');
  }
}

// Function to add an item to the cart and save it to localStorage
export function addToCart(product) {
  console.log('Adding product to cart:', product);

  // Get the current cart from localStorage, or initialize an empty array if not present
  let cartItems = getLocalStorage('so-cart') || [];

  // Check if the product is already in the cart
  const existingProductIndex = cartItems.findIndex(item => item.Id === product.Id);

  if (existingProductIndex >= 0) {
    // If the product is already in the cart, update the quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // Otherwise, add the new product with a quantity of 1
    product.quantity = 1;
    cartItems.push(product);
  }

  // Save the updated cart to localStorage
  setLocalStorage('so-cart', cartItems);
  updateCartCount();
}

// Render the cart contents and update the cart count on page load
document.addEventListener('DOMContentLoaded', function() {
  // Load the header and footer after DOM is fully loaded
  loadHeaderFooter();

  // Render the cart contents and update the cart count on page load
  renderCartContents();
  updateCartCount();
});

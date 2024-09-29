import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Function to render the cart contents
function renderCartContents() {
  // Get the cart from localStorage, or initialize an empty array if it doesn't exist
  const cartItems = getLocalStorage("cart") || [];

  // If there are items in the cart, render them, otherwise display an empty cart message
  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
  }
}

// Template for rendering a single cart item
function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Function to add an item to the cart and save it to localStorage
export function addToCart(product) {
  // Get the current cart from localStorage, or initialize an empty array if not present
  let cartItems = getLocalStorage("cart") || [];

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
  setLocalStorage("so-cart", cartItems);
}

// Render the cart contents on page load
renderCartContents();

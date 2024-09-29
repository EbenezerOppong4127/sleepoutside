import { getLocalStorage, setLocalStorage } from "./utils.mjs";


// Function to render the cart contents
// Function to render the cart contents and calculate total
function renderCartContents() {
  // Get the cart items from localStorage, or initialize an empty array if it doesn't exist
  const cartItems = getLocalStorage("so-cart") || [];

  const emptyCartButton = document.getElementById("emptyCartBtn");
  const cartFooter = document.getElementById("cartFooter");

  // Check if the cart is empty
  if (cartItems.length > 0) {
    // Render the cart items using the cartItemTemplate function
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate and display the total price
    const total = cartItems.reduce((acc, item) => acc + item.FinalPrice * item.quantity, 0);
    document.getElementById("cartTotalAmount").textContent = total.toFixed(2);

    // Show the cart footer and "Empty Cart" button if there are items
    cartFooter.classList.remove("hide");
    emptyCartButton.classList.remove("hide");

    // Attach the event listener to the "Empty Cart" button
    emptyCartButton.addEventListener("click", emptyCart);
  } else {
    // If there are no items in the cart, show an empty cart message and hide the cart footer
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide");
    emptyCartButton.classList.add("hide"); // Hide the empty cart button when there's nothing in the cart
  }
}

// Template for rendering a single cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Function to clear the cart
function emptyCart() {
  // Clear the cart from localStorage
  setLocalStorage('so-cart', []);

  // Rerender the cart to show an empty cart message
  renderCartContents();
}


function updateCartCount() {
  // Get the cart items from localStorage
  const cartItems = getLocalStorage('so-cart') || [];

  // Calculate the total quantity of all items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
// alert(totalItems)
  // Select the cart count element and update its content
  const cartCountElement = document.getElementById('addProductCount');
  cartCountElement.textContent = totalItems > 0 ? totalItems : '';
}




// Function to add an item to the cart and save it to localStorage
export function addToCart(product) {
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

// Render the cart contents on page load
renderCartContents();
updateCartCount();


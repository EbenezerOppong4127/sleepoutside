export default class ProductDetails {
  constructor(productId, dataSource, prodDetailsElement) {
    this.productId = productId; // Store the product ID
    this.product = {}; // Empty object to hold the product details
    this.dataSource = dataSource; // DataSource to fetch product details
    this.prodDetailsElement = prodDetailsElement; // Element where product details will be rendered
  }

  async init() {
    // Fetch the product details using the productId
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    this.addToCart();
  }


  renderProductDetails() {
    // Assuming we have an element with the ID 'product-details' where we will render the details
    if (this.product && this.prodDetailsElement) {
      this.prodDetailsElement.innerHTML = `
        <img src="${this.product.Image}" alt="Image of ${this.product.Name}" />
        <input type="text" value="${this.product.Id}" hidden id="getProductId" name="getProductId">
        <h2>${this.product.Name}</h2>
        <p>${this.product.DescriptionHtmlSimple}</p>
        <p>Price: ${this.product.ListPrice}</p>
        <button id="add-to-cart">Add to Cart</button>
      `;
    } else {
      this.prodDetailsElement.innerHTML = '<p>Product not found.</p>';
    }
  }

  addToCart() {
    if (!this.product) {
      console.error("No product data available to add to cart.");
      return;
    }

    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        // Get the productId from the hidden input field
        const productId = document.getElementById('getProductId').value;

        // Retrieve the cart from localStorage (initialize as an empty array if not present)
        let cart = JSON.parse(localStorage.getItem('so-cart')) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = cart.findIndex(item => item.Id === productId);

        if (existingProductIndex !== -1) {
          // Product exists, increase the quantity
          cart[existingProductIndex].quantity += 1;
        } else {
          // New product, add it with quantity 1
          const productToAdd = {
            ...this.product,
            quantity: 1
          };
          cart.push(productToAdd);
        }

        // Update the cart in localStorage
        localStorage.setItem('so-cart', JSON.stringify(cart));
        // Confirm addition to cart
        alert('Product added to cart' );
      });
    } else {
      console.error("'Add to Cart' button not found.");
    }
  }
}

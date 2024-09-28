export default class ProductDetails {
  constructor(productId, dataSource , prodDetailsElement) {
    this.productId = productId; // Store the product ID
    this.product = {}; // Empty object to hold the product details
    this.dataSource = dataSource; // DataSource to fetch product details
    this.prodDetailsElement = prodDetailsElement;
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
        <h2>${this.product.Name}</h2>
        <p>${this.product.Description}</p>
        <p>Price: ${this.product.Price}</p>
        <button id="add-to-cart">Add to Cart</button>
      `;
    } else {
      this.prodDetailsElement.innerHTML = '<p>Product not found.</p>';
    }
  }

  addToCart() {
    // Assume you want to handle adding the product to the cart
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        // Logic to add the product to the cart, for example, storing it in localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(this.product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
      });
    }
  }
}

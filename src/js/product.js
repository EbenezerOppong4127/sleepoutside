import {getParams, setLocalStorage} from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import ProductList from './ProductList.mjs';
const dataSource = new ProductData('tents');

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
// document.getElementById('addToCart').addEventListener('click', addToCartHandler);


// Get the product ID from the URL parameters
const productId = getParams('product')
console.log(dataSource.findProductById(productId))

const prodDetailsElement = document.querySelector('.product-detail');
// const productList = new ProductList('Tents', tentProducts, listContainerTag);

// Create an instance of ProductDetails with the product ID and data source
const productDetails = new ProductDetails(productId, dataSource, prodDetailsElement);
// Initialize the product details
productDetails.init();

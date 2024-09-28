import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';

//get tents product from json file
const tentProducts = new ProductData('tents');
//the html tag element that will contain the list of items
const listContainerTag = document.querySelector('.product-list');
const productList = new ProductList('Tents', tentProducts, listContainerTag);

productList.init();


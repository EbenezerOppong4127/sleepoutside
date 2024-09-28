import {renderListWithTemplate} from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  getUsedProductIds() {
    return [
      '880RR', // Marmot Ajax Tent - 3-Person, 3-Season
      '985RF', // The North Face Talus Tent - 4-Person, 3-Season
      '985PR', // The North Face Alpine Guide Tent - 3-Person, 4-Season
      '344YJ'  // Cedar Ridge Rimrock Tent - 2-Person, 3-Season
    ];
  }

  filterProduct(products) {
    const usedProductIds = this.getUsedProductIds();
    return products.filter(product => usedProductIds.includes(product.Id));
  }


  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // render the list - to be completed

    const filteredProduct = this.filterProduct(list)

    this.renderList(filteredProduct);
  }
}


export default ProductListing;

import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // Store the fetched product list
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.products = list; // Save the list to use in filtering and sorting
    this.renderList(this.products);

    // Set up the event listeners for search and sorting
    this.initSearchAndSort();
  }

  // Render the product list
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // Initialize search and sorting event listeners
  initSearchAndSort() {
    const searchForm = document.getElementById("search-form");
    const sortSelect = document.getElementById("sort");

    // Search functionality
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchTerm = document.getElementById("search-input").value.toLowerCase();
      this.handleSearch(searchTerm);
    });

    // Sorting functionality
    sortSelect.addEventListener("change", (e) => {
      const sortBy = e.target.value;
      this.handleSort(sortBy);
    });
  }

  // Handle the search functionality
  handleSearch(searchTerm) {
    const filteredList = this.products.filter(product =>
      product.Name.toLowerCase().includes(searchTerm)
    );
    this.renderList(filteredList);
  }

  // Handle the sorting functionality
  handleSort(sortBy) {
    let sortedList = [...this.products];
    if (sortBy === "name") {
      sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "price") {
      sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(sortedList);
  }
}

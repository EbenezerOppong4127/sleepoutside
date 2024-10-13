import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
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

    // Set up the event listeners for search, sorting, and quick view
    this.initSearchAndSort();
    this.initQuickView();
  }

  // Render the product list
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // Initialize search, sorting, and quick view event listeners
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

  initQuickView() {
    // Event delegation to handle click on dynamically rendered products
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("quick-view-btn")) {
        const productId = e.target.getAttribute("data-id");
        const product = this.products.find(p => p.Id === productId);
        if (product) {
          this.showProductModal(product);
        }
      }
    });
  }

  // Show the modal with product details
   showProductModal(product) {
    const modal = document.getElementById("productModal");
    const modalContent = document.getElementById("modalProductDetails");

    // Prepare product details for the modal
    let modalHtml = `
    <h2>${product.Name}</h2>
    <p class="modal__price">$${product.FinalPrice}</p>
    <p class="modal__description">${product.DescriptionHtmlSimple}</p>
  `;

    // Add the primary image
    modalHtml += `<img src="${product.Images.PrimaryLarge}" alt="${product.Name}" class="modal__primary-image"/>`;

    // Add carousel if extra images are available
    if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
      modalHtml += `
      <div class="carousel">
        <button class="carousel-control prev">&lt;</button>
        <div class="carousel-container">
          <div class="carousel-track">
            ${product.Images.ExtraImages.map(image => `
              <div class="carousel-item">
                <img src="${image.Src}" alt="${image.Title}">
              </div>
            `).join('')}
          </div>
        </div>
        <button class="carousel-control next">&gt;</button>
      </div>
    `;
    }

    // Insert the HTML content into the modal
    modalContent.innerHTML = modalHtml;

    // Show the modal
    modal.style.display = "block";

    // Close the modal when the 'X' button is clicked
    const closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Carousel navigation logic
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    // Scroll to the next image
    nextButton.addEventListener('click', () => {
      if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        const translateValue = -(currentIndex * (carouselItems[0].clientWidth + 10)); // Adjust according to gap
        carouselTrack.style.transform = `translateX(${translateValue}px)`;
      }
    });

    // Scroll to the previous image
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        const translateValue = -(currentIndex * (carouselItems[0].clientWidth + 10));
        carouselTrack.style.transform = `translateX(${translateValue}px)`;
      }
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


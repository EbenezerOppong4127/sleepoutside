import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Add a function to validate form fields
function validateForm() {
  const form = document.forms["checkout"];
  let isValid = true;
  let errorMessage = "";

  // Check if required fields are filled out
  const requiredFields = ["fname", "lname", "street", "city", "state", "zip", "cardNumber", "expiration", "code"];
  requiredFields.forEach((field) => {
    const input = form[field];
    if (!input.value) {
      isValid = false;
      errorMessage += `${field} is required. `;
    }
  });

  // Check for proper ZIP code format (e.g., 5 digits)
  const zipInput = form["zip"].value;
  const zipPattern = /^\d{5}$/;  // Regular expression for 5-digit ZIP code
  if (!zipPattern.test(zipInput)) {
    isValid = false;
    errorMessage += "Invalid ZIP code. ";
  }

  // Check if the card number is at least 12 digits long
  const cardNumberInput = form["cardNumber"].value;
  const cardPattern = /^\d{12,16}$/; // Card number should be 12 to 16 digits
  if (!cardPattern.test(cardNumberInput)) {
    isValid = false;
    errorMessage += "Invalid card number. ";
  }

  // Display error message
  if (!isValid) {
    document.getElementById("error-message").innerText = errorMessage;
    document.getElementById("error-message").style.display = "block";
  } else {
    document.getElementById("error-message").style.display = "none";
  }

  return isValid;
}

// Add event listener to the submit button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  // Validate the form before proceeding
  if (validateForm()) {
    myCheckout.checkout();
  }
});

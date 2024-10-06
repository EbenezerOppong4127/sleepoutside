// wrapper for querySelector...returns matching element
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
const setClick = (selector, callback) => {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// Get parameters
// Use those lines to create a new
// function in the utils.mjs file called getParams(param) that we can use to get a parameter from the URL when we need to. (Don't forget to return the parameter!)
function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return  urlParams.get(param)
}


const renderListWithTemplate = (templateFn, parentElement, list, position = 'afterbegin', clear = false) => {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(response => response.text());
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate('/partials/header.html');
  const footer = await loadTemplate('/partials/footer.html');

  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');

  renderWithTemplate(header.innerHTML, headerElement);
  renderWithTemplate(footer.innerHTML, footerElement);
}


export {setClick, renderListWithTemplate, setLocalStorage, getLocalStorage, qs , getParams ,renderWithTemplate }


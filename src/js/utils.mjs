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


export {setClick, renderListWithTemplate, setLocalStorage, getLocalStorage, qs , getParams }


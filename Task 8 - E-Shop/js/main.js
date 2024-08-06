import CartManager from "./features/cart/cartManager.js";
import categoriesSuccess from "./features/categories.js";
import productsSuccess from "./features/products.js";
import handleRemoteRequest, { getManyRequsets } from "./shares/api.js";
import {
  loadingElement,
  errorElement,
  mainElement,
  catgoriesContainer,
  itemsElement,
} from "./shares/ui/dom-elements.js";

const requestsConfig = [
  {
    endpoint: "products/categories",
    success: (data) => categoriesSuccess(data),
  },
  {
    endpoint: "products",
    success: (data) => productsSuccess(data),
  },
];

getManyRequsets(
  {
    startLoading: () => {
      loadingElement.removeClass("d-none");
      loadingElement.addClass("d-flex");
    },
    error: (err) => {
      errorElement.removeClass("d-none");
      errorElement.addClass("d-flex");
      mainElement.removeClass("row");
      mainElement.addClass("d-none");
      errorElement.find(".alert").text(err.message);
    },
    stopLoading: () => {
      loadingElement.removeClass("d-flex");
      loadingElement.addClass("d-none");
    },
  },
  requestsConfig
).then(() => handleGetProductsByCategory());

//get products by category
// click on li => request by id value

function handleGetProductsByCategory() {
  catgoriesContainer.children().on("click", (e) => {
    handleRemoteRequest(
      `products/category/${e.target.id}`,

      (data) => productsSuccess(data),

      (err) => {
        itemsElement.html(`<div
        class="d-flex vh-100 justify-content-center align-items-center"
      >
        <div class="alert alert-danger">${err.message}</div>
      </div>`);
      },

      () => {
        itemsElement.html(`<div
          class="d-flex vh-100 justify-content-center align-items-center"
        >
          <h3>Loading...<h3>
        </div>`);
      }
    );
  });
}

//cart

const cartManager = new CartManager();

//1- static design
//2- UI Logic [toggle cart sidbar]

//3- when user add proudct: push the whole object to the cart array
// show the length of array in span
// loop on the array in case it's not empty and show the proeuycts
// user can increas [check if number of items less than or equal stock property]
// user can decreas
// user can remove
//4- initial array products is empty => display some messge

// get proudcts by category

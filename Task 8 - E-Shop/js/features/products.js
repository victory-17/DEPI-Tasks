import { itemsElement } from "../shares/ui/dom-elements.js";

const productsSuccess = function (data) {
  itemsElement.html(
    data.products
      .map((item, index) => {
        return `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="border shadow rounded-2 px-1 py-2 card">
              <img src=${
                item.images[0]
              } class="w-100 mb-2" style="height: 200px" />
              <div class="mb-3">
                <h3 class="mb-1">${item.title}</h3>
                <p>${item.description}</p>
              </div>
              <div class="d-flex gap-1 mb-3 align-items-center">
                <i class="fas fa-star text-warning"></i>
                <div class="px-2 bg-warning bg-opacity-75 rounded-2">${
                  item.rating
                }</div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="fw-bold mb-0 fs-3">$${item.price}</p>
                <button class="btn btn-primary" data-product='${JSON.stringify({
                  id: item.id,
                  title: item.title,
                  image: item.images[0],
                  price: item.price,
                  stock: item.stock,
                })}'>Add To Cart</button>
              </div>
            </div>
          </div>`;
      })
      .join("")
  );
};
export default productsSuccess;

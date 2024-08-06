export default class CartItem {
  constructor(id, title, image, price, stock, quantity = 1) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.quantity = quantity;
  }
  increase = function () {
    if (this.quantity < this.stock) {
      this.quantity += 1;
    }
  };
  decrease = function () {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  };
  getQuantity = function () {
    return this.quantity;
  };
  getTotal = function () {
    return this.quantity * this.price;
  };
  renderElement = function () {
    return ` <div class="card card-dark mb-3">
            <div class="row align-items-center no-gutters">
                <div class="col-md-4">
                <button class="remove-btn" data-action="remove" id="${this.id}"><i class="fas fa-trash-alt"></i></button>
                    <img src=${
                      this.image
                    } class="card-img card-img-top" alt="Product Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">Price: $<span id="price">${
                          this.price
                        }</span></p>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <button class="btn btn-dark-mode" type="button" data-action="decrease" id="${
                                  this.id
                                }">-</button>
                            </div>
                            <input type="text" class="form-control text-center" id="quantity" value=${this.getQuantity()}>
                            <div class="input-group-append">
                                <button class="btn btn-dark-mode" type="button" data-action="increase" id="${
                                  this.id
                                }">+</button>
                            </div>
                        </div>
                        <p class="card-text">Total: $<span id="total">${this.getTotal()}</span></p>
                    </div>
                </div>
            </div>
        </div>`;
  };

  static formToCartItemInstance = function ({
    id,
    title,
    image,
    price,
    stock,
    quantity,
  }) {
    return new CartItem(id, title, image, price, stock, quantity);
  };
}

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


export default function CreateProduct({
  product,
  handleChange,
  handleSubmit,
  actionButton,
  children,
}) {
  const handlePriceChange = (e) => {
    if (isNaN(e.target.value)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please enter a valid number for the price!',
      });
    } else {
      handleChange(e);
    }
  };

  const handleClear = () => {
    handleChange({ target: { name: 'name', value: '' } });
    handleChange({ target: { name: 'cat', value: '' } });
    handleChange({ target: { name: 'price', value: '' } });
    handleChange({ target: { name: 'description', value: '' } });
  };

  return (
    <div className="w-75 mx-auto py-5 px-3 rounded-3 shadow-lg mt-5">
      <h1>CRUD System</h1>
      <form id="product-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="product_name" className="form-label">
            Proudct Name
          </label>
          <input
            type="text"
            className="form-control"
            id="product_name"
            placeholder="Product Name"
            value={product.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product_category" className="form-label">
            Product Category
          </label>
          <input
            type="text"
            className="form-control"
            id="product_category"
            placeholder="Product Category"
            name="cat"
            value={product.cat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="product_price" className="form-label">
            Product Price
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="product_price"
            placeholder="Product Price"
            name="price"
            value={product.price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="prodct_desc" className="form-label">
            Product Description
          </label>
          <textarea
            className="form-control"
            id="prodct_desc"
            rows={3}
            required
            value={product.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        {children}
        <button className="btn btn-primary clear-btn" type="button" onClick={handleClear}>Clear</button>
      </form>
    </div>
  );
}

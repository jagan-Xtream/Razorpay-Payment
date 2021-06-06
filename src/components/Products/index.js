/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./style.css";

const Products = (props) => {
  return (
    <div className="productContainer">
      {props.products.map((product) => (
        <div class="card">
          <img src={product.image} alt="product" />
          <div class="card-body">
            <h5 class="card-title">{product.Name}</h5>
            <p class="card-text">{product.description} </p>
            <p class="card-text">{product.price}</p>
            <p class="card-text">{product.currency}</p>
          </div>

          <button onClick={() => props.buyNow(product.id)}>buy Now</button>
        </div>
      ))}
    </div>
  );
};
export default Products;

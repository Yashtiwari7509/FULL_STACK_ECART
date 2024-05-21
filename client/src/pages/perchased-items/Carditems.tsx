import React from "react";
import "./style.css";
import { Iproduct } from "../../models/interface";
const Carditems = ({ product }: any) => {
  const { imageURL, productName, description, price, stockQuantity } = product;

  return (
    <div className="data-pur">
      <div className="img-con">
        <img src={imageURL} alt="" />
      </div>
      <div className="container">
        <div className="product-name">{productName}</div>
        <div className="Describes">{description}</div>
        <div className="price-containers">
          <div>
            Price <span style={{ color: "greenyellow" }}>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carditems;

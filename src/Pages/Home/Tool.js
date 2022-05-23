import React from "react";
import { useNavigate } from "react-router-dom";

const Tool = ({ tool }) => {
  const navigate = useNavigate();

  const navigateToToolsPurchase = (toolsId) => navigate(`/tools/${toolsId}`);
  const {
    _id,
    name,
    picture,
    minOrderQuantity,
    availableQuantity,
    unitPrice,
    description,
  } = tool;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={picture} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Order Quantity {minOrderQuantity}</p>
        <p>Order Available {availableQuantity}</p>
        <p>Price $ {unitPrice} / qty</p>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => navigateToToolsPurchase(_id)}
            className="btn btn-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tool;

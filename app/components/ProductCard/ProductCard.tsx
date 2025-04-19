import React from "react";
import AddToCart from "../AddToCart";
// import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className="bg-red-500 text-white p-4">
      {/* p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-500 */}
      <AddToCart />
    </div>
  );
};

export default ProductCard;

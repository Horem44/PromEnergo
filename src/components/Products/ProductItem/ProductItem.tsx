import React from "react";

import classes from "./ProductItem.module.css";

interface ProductItemProps {
    image: string,
    price: number,
    label: string,
}

const ProductItem:React.FC<ProductItemProps> = (props) => {
  return (
    <div className={classes.product_item}>
      <img className={classes.product_img} src={props.image} alt={props.label} />
      <p className={classes.product_label}>{props.label}</p>
      <p className={classes.product_price}>{props.price}</p>
    </div>
  );
};

export default ProductItem;
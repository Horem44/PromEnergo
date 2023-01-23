import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./ProductList.module.css";
import Paginator from "../../UI/Paginator/Paginator";

export interface ProductListProps {
  products: {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
    category: string;
  }[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
  return (
    <div className={classes.product_list_container}>
      <ul className={classes.product_list}>
        {props.products.map((product) => {
          return (
            <li key={product.id} className={classes.product}>
              <ProductItem
                id={product.id}
                category={product.category}
                imgUrl={product.imgUrl}
                price={product.price}
                title={product.title}
              />
            </li>
          );
        })}
      </ul>
      <Paginator />
    </div>
  );
};

export default ProductList;

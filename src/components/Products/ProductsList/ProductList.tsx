import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./ProductList.module.css";

interface ProductListProps {
    products: {
        image: string;
        label: string;
        price: number;
    }[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
    return (
        <ul className={classes.product_list}>
            {props.products.map(product => {
                return (
                    <li className={classes.product}>
                        <ProductItem image={product.image} price={product.price} label={product.label}/>
                    </li>
                );
            })}
        </ul>
    )
};

export default ProductList;
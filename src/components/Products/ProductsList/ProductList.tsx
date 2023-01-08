import React from "react";
import ProductItem from "../ProductItem/ProductItem";
import classes from "./ProductList.module.css";
import Paginator from "../../UI/Paginator/Paginator";

interface ProductListProps {
    products: {
        image: string;
        label: string;
        price: number;
    }[];
}

const ProductList: React.FC<ProductListProps> = (props) => {
    return (
        <div className={classes.product_list_container}>
            <ul className={classes.product_list}>
                {props.products.map(product => {
                    return (
                        <li key={Math.random()} className={classes.product}>
                            <ProductItem image={product.image} price={product.price} label={product.label}/>
                        </li>
                    );
                })}
            </ul>
            <Paginator/>
        </div>
    )
};

export default ProductList;
import React from "react";

import classes from "./ProductItem.module.css";
import {Link} from "react-router-dom";

interface ProductItemProps {
    image: string;
    price: number;
    label: string;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <div className={classes.product_item}>
            <Link to='/product/details'>
                <img className={classes.product_img} src={props.image} alt={props.label}/>
            </Link>
            <p className={classes.product_label}>{props.label}</p>
            <p className={classes.product_price}>{props.price} грн.</p>
            <button>
                <Link to='/orders'>
                    Додати до замовленнь
                </Link>
            </button>
        </div>
    );
};

export default ProductItem;
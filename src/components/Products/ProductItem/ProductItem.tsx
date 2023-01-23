import React from "react";

import classes from "./ProductItem.module.css";
import {Link} from "react-router-dom";

interface ProductItemProps {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
    category: string;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    return (
        <div className={classes.product_item}>
            <Link to={`/product/${props.id}`}>
                <img className={classes.product_img} src={props.imgUrl} alt={props.title}/>
            </Link>
            <p className={classes.product_label}>{props.title}</p>
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
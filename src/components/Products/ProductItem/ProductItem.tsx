import React from "react";

import classes from "./ProductItem.module.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../Store";

export interface ProductItemProps {
    id: number;
    title: string;
    price: number;
    imgUrl: string;
    category: string;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
    const isAdmin = useSelector<RootState, boolean>(state => state.auth.isAdmin);
    const button = isAdmin ? {
        link: '/admin/edit/' + props.id,
        caption: 'Змінити'
    } : {
        link: '/orders/',
        caption: 'Додати до замовленнь'
    };


    return (
        <div className={classes.product_item}>
            <Link to={`/product/${props.id}`}>
                <img className={classes.product_img} src={props.imgUrl} alt={props.title}/>
            </Link>
            <p className={classes.product_label}>{props.title}</p>
            <p className={classes.product_price}>{props.price} грн.</p>
            <button>
                <Link to={button.link}>
                    {button.caption}
                </Link>
            </button>
        </div>
    );
};

export default ProductItem;
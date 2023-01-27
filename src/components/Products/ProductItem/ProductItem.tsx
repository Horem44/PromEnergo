import React from "react";

import classes from "./ProductItem.module.css";
import {Link, useHistory} from "react-router-dom";
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
    const history = useHistory();

    const button = isAdmin ? {
        link: '/admin/edit/' + props.id,
        caption: 'Змінити'
    } : {
        link: '/orders/',
        caption: 'Додати до замовленнь'
    };

    const addOrderHandler = () => {
        if(!(button.link === '/orders/')){
            history.push(button.link);
            return;
        }


        fetch('http://localhost:8080/order', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prodId: props.id.toString(),
                price: props.price
            })
        })
            .then(res => {
                return res.json();
            })
            .then(order => {
                console.log(order);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={classes.product_item}>
            <Link to={`/product/${props.id}`}>
                <img className={classes.product_img} src={props.imgUrl} alt={props.title}/>
            </Link>
            <p className={classes.product_label}>{props.title}</p>
            <p className={classes.product_price}>{props.price} грн.</p>
            <button onClick={addOrderHandler}>
                {button.caption}
            </button>
        </div>
    );
};

export default ProductItem;
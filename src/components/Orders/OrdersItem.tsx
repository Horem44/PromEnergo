import React from "react";
import classes from "./OrdersItem.module.css";
import {Link} from "react-router-dom";

interface ordersItemProps {
    orderDate: string;
    orderImg: string;
    orderTitle: string;
    orderQuantity: number;
    orderPrice: number;
    orderStatus: boolean;
}

const OrdersItem: React.FC<ordersItemProps> = (props) => {
    return <div className={classes.order_container}>
        <div className={classes.order_data_container}>
            <div className={classes.order_data}>
                <span>Номер замовлення</span>
                {1}
            </div>
            <div className={classes.order_data}>
                <Link to='/order/details'>
                    <img className={classes.order_img} src={props.orderImg} alt=''/>
                </Link>
            </div>
            <div className={classes.order_data}>
                <span>Дата замовлення</span>
                {props.orderDate}
            </div>
            <div className={classes.order_data}>
                <span>Назва замовлення</span>
                {props.orderTitle}
            </div>
            <div className={classes.order_data}>
                <span>Кількість</span>
                <input type='number' defaultValue={props.orderQuantity}/>
            </div>
            <div className={classes.order_data}>
                <span>Ціна замовлення</span>
                {props.orderPrice}
            </div>
            <div className={classes.order_data}>
                <span>Статус замовлення</span>
                {props.orderStatus ? 'Complete' : 'Uncompleted'}
            </div>
        </div>

        <div className={classes.order_button_container}>
            <button>Видалити замовлення</button>
            <button>Перейти до оплати</button>
        </div>
    </div>
}

export default OrdersItem;
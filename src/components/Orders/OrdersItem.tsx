import React from "react";
import classes from "./OrdersItem.module.css";

interface ordersItemProps {
    orderDate: string;
    orderImg: string
    orderTitle: string;
    orderPrice: number;
    orderStatus: boolean;
}

const OrdersItem:React.FC<ordersItemProps> = (props) => {
    return <div className={classes.order_container}>
        <div className={classes.order_data}>
            <span>Номер замовлення</span>
            {1}
        </div>
        <div className={classes.order_data}>
            <img  className={classes.order_img} src={props.orderImg} alt=''/>
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
            <span>Ціна замовлення</span>
            {props.orderPrice}
        </div>
        <div className={classes.order_data}>
            <span>Статус замовлення</span>
            {props.orderStatus ? 'Complete' : 'Uncompleted'}
        </div>
    </div>
}

export default OrdersItem;
import React from "react";
import classes from "./AdminOrdersItem.module.css";
import {Link, useHistory} from "react-router-dom";
import {showErrorNotification, showWarningNotification} from "../../../util/Notifications/notifications";
import {logoutRequest} from "../../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

interface AdminOrdersItemProps {
    onDeleteOrder: (OrderId:string) => void;
    name: string;
    surname: string;
    phoneNumber: string;
    deliveryCity: string;
    warehouse: string;
    ProductId: string;
    imgUrl: string;
    status: boolean;
    totalPrice: string;
    quantity: number;
    orderDate: string;
    OrderId: string;
}

const AdminOrdersItem: React.FC<AdminOrdersItemProps> = (props) => {
    const statusValue = props.status ? 'Оплачено' : 'Очікує оплату';

    return <div className={classes.admin_orders_container_main}>
        <div className={classes.admin_orders_container}>
            <div className={classes.admin_orders_container_data}>
                <div className={classes.admin_orders_user}>
                    <div className={classes.admin_orders_user_data}>
                        <span>Ім'я</span>
                        {props.name}
                    </div>
                    <div className={classes.admin_orders_user_data}>
                        <span>Прізвище</span>
                        {props.surname}
                    </div>
                    <div className={classes.admin_orders_user_data}>
                        <span>Телефон</span>
                        {props.phoneNumber}
                    </div>
                    <div className={classes.admin_orders_user_data}>
                        <span>Місто</span>
                        {props.deliveryCity}
                    </div>
                    <div className={classes.admin_orders_user_data}>
                        <span>Номер відділення</span>
                        {props.warehouse}
                    </div>
                </div>
                <div className={classes.admin_orders_order}>
                    <div className={classes.admin_orders_order_data}>
                        <span>Дата замовлення</span>
                        {props.orderDate}
                    </div>
                    <div className={classes.admin_orders_order_data}>
                        <span>Кількість</span>
                        {props.quantity}
                    </div>
                    <div className={classes.admin_orders_order_data}>
                        <span>Ціна</span>
                        {props.totalPrice}
                    </div>
                    <div className={classes.admin_orders_order_data}>
                        <span>Статус</span>
                        {statusValue}
                    </div>
                </div>
            </div>
            <div className={classes.admin_orders_order_data_img}>
                <Link to={'/product/' + props.ProductId}>
                    <img src={props.imgUrl} alt=''/>
                </Link>
            </div>
        </div>
        <div className={classes.admin_orders_control}>
            <button onClick={() => props.onDeleteOrder(props.OrderId)}>Видалити замовлення</button>
        </div>
    </div>

}

export default AdminOrdersItem;
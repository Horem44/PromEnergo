import React from "react";
import OrdersItem from "./OrdersItem";
import classes from "./OrdersList.module.css";

interface ordersListProps {
    orders: {
        id: number;
        prodImgUrl: string;
        orderDate: string;
        prodId: number;
        quantity: number;
        totalPrice: number;
        status: boolean;
    }[];
    onPayOrder: (prodId: number, orderId: number) => void;
    onDeleteOrder: (prodId: number) => void;
}

const OrdersList: React.FC<ordersListProps> = (props) => {
    return <div>
        <ul className={classes.orders_list}>
            {props.orders.map(order => {
                return <OrdersItem key={Math.random()} orderDate={order.orderDate} prodId={order.prodId}
                                   quantity={order.quantity}
                                   totalPrice={order.totalPrice} status={order.status}
                                   prodImgUrl={order.prodImgUrl}
                                   onDeleteOrder={props.onDeleteOrder}
                                   onPayOrder={props.onPayOrder}
                                   id={order.id}
                />
            })}
        </ul>
    </div>
};

export default OrdersList;
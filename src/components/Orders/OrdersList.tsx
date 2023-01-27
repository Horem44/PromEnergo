import React from "react";
import OrdersItem from "./OrdersItem";
import classes from "./OrdersList.module.css";

interface ordersListProps {
    orders: {
        orderNo: number;
        prodImgUrl: string;
        orderDate: string;
        prodId: number;
        quantity: number;
        totalPrice: number;
        status: boolean;
    }[];

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
                                   orderNo={order.orderNo}
                                   onDeleteOrder={props.onDeleteOrder}
                />
            })}
        </ul>
    </div>
};

export default OrdersList;
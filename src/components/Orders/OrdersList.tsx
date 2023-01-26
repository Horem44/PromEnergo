import React from "react";
import OrdersItem from "./OrdersItem";
import classes from "./OrdersList.module.css";

interface ordersListProps {
    orders: {
        orderDate: string;
        orderImg: string;
        orderTitle: string;
        orderQuantity: number;
        orderPrice: number;
        orderStatus: boolean;
    }[];
}

const OrdersList: React.FC<ordersListProps> = (props) => {
    return <div>
        <ul className={classes.orders_list}>
            {props.orders.map(order => {
                return <OrdersItem key={Math.random()} orderDate={order.orderDate} orderImg={order.orderImg}
                                   orderQuantity={order.orderQuantity}
                                   orderTitle={order.orderTitle}
                                   orderPrice={order.orderPrice} orderStatus={order.orderStatus}/>
            })}
        </ul>
    </div>
};

export default OrdersList;
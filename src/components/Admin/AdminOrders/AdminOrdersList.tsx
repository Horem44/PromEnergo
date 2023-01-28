import React from "react";
import AdminOrdersItem from "./AdminOrdersItem";
import classes from "./AminOrdersList.module.css";

interface AdminOrdersListProps {
    onDeleteOrder: (OrderId:string) => void;
    orders: {
        name: string;
        surname: string;
        phoneNumber: string;
        deliveryCity: string;
        warehouse: string;
        ProductId: string;
        imgUrl: string;
        status: boolean;
        OrderId: string;
        totalPrice: string;
        quantity: number;
        orderDate: string;
    }[]
}

const AdminOrdersList: React.FC<AdminOrdersListProps> = (props) => {
    return <div className={classes.admin_orders_list_container}>
        {props.orders.map(order => {
                return <AdminOrdersItem key={order.OrderId}
                                        name={order.name}
                                        surname={order.surname}
                                        phoneNumber={order.phoneNumber}
                                        deliveryCity={order.deliveryCity}
                                        warehouse={order.warehouse}
                                        ProductId={order.ProductId}
                                        imgUrl={order.imgUrl}
                                        status={order.status}
                                        OrderId={order.OrderId}
                                        totalPrice={order.totalPrice}
                                        quantity={order.quantity}
                                        orderDate={order.orderDate}
                                        onDeleteOrder={props.onDeleteOrder}
                />
            }
        )}
    </div>

};

export default AdminOrdersList;
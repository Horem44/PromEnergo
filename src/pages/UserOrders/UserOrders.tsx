import React, {useEffect, useState} from "react";
import OrdersList from "../../components/Orders/OrdersList";
import classes from "./UserOrders.module.css";
import {Blocks} from "react-loader-spinner";

interface Orders {
    orderNo: number;
    prodImgUrl: string;
    orderDate: string;
    prodId: number;
    quantity: number;
    totalPrice: number;
    status: boolean;
}

let orders: Orders[] = [];

const UserOrders = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<Orders[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/orders/user', {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(ordersData => {
                if (ordersData.error) {
                    setOrders([]);
                    setIsLoading(false);
                    return;
                }
                setOrders(ordersData.orders);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    const deleteOrderHandler = (prodId: number) => {
        setIsLoading(true);
        fetch('http://localhost:8080/order/delete/' + prodId, {
            credentials: "include",
            method: 'delete'
        }).then(res => {
            console.log(res.status);
            const newOrders = orders.filter((order) => {
                return !(order.prodId === prodId);
            });
            console.log(newOrders);
            setOrders(newOrders);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }

    return (
        <main>
            <div style={{height: "86px"}}></div>
            <h1 className={classes.user_orders_header}>Мої замовлення</h1>
            <Blocks
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            {!isLoading && <OrdersList onDeleteOrder={deleteOrderHandler} orders={orders}/>}
        </main>
    );
};

export default UserOrders;
import React, {useEffect, useState} from "react";
import OrdersList from "../../components/Orders/OrdersList";
import classes from "./UserOrders.module.css";
import {Blocks} from "react-loader-spinner";
import {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification
} from "../../util/Notifications/notifications";
import {logoutRequest} from "../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

interface Orders {
    id: number
    prodImgUrl: string;
    orderDate: string;
    prodId: number;
    quantity: number;
    totalPrice: number;
    status: boolean;
}

const UserOrders = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<Orders[]>([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/orders/user', {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(ordersData => {
                if (ordersData.isNotAuth) {
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    setIsLoading(false);
                    history.push('/login');
                }

                if (ordersData.error || !ordersData) {
                    showWarningNotification('Ще немає замовлень');
                    setOrders([]);
                    setIsLoading(false);
                    return;
                }
                console.log(ordersData.orders);
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
            return res.json();
        }).then(res => {
            if (res.isNotAuth) {
                showWarningNotification('Час дії сесії вичерпано');
                dispatch(logoutRequest() as unknown as AnyAction);
                setIsLoading(false);
                history.push('/login');
                return;
            }

            const newOrders = orders.filter((order) => {
                return !(order.prodId === prodId);
            });

            console.log(newOrders);
            setOrders(newOrders);
            setIsLoading(false);
            showSuccessNotification("Замовлення видалено");
        })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                showErrorNotification('Помилка сервера');
            });
    };

    const payOrderHandler = (prodId:number, orderId: number) => {
        setIsLoading(true);
        fetch('http://localhost:8080/orders/update-status', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prodId: prodId,
                orderId: orderId
            })
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                if(res.isNotAuth){
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    setIsLoading(false);
                    history.push('/login');
                    return;
                }

                console.log(orderId);

                const updatedOrderIndex = orders.findIndex(order => {
                    return (order.id === orderId);
                });


                const updatedOrder = {...orders[updatedOrderIndex], status: true};

                let newOrders = orders.filter(order => {
                    return !(order.id === orderId);
                });

                newOrders = [...newOrders, updatedOrder];

                console.log(updatedOrder);

                setOrders(newOrders);
                setIsLoading(false);
                showSuccessNotification("Замовлення оплачено");
                return;

            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                showErrorNotification('Помилка сервера');
                return;

            });
    };

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
            {!isLoading && <OrdersList onDeleteOrder={deleteOrderHandler} onPayOrder={payOrderHandler} orders={orders}/>}
        </main>
    );
};

export default UserOrders;
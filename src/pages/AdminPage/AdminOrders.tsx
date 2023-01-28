import React, {useEffect, useState} from "react";
import AdminOrdersList from "../../components/Admin/AdminOrders/AdminOrdersList";
import {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification
} from "../../util/Notifications/notifications";
import {logoutRequest} from "../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Blocks} from "react-loader-spinner";


const AdminOrders = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<any[]>([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/orders', {credentials: 'include'})
            .then(res => {
                if (res.status === 401) {
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    history.push('/login');
                    return;
                }

                return res.json();
            })
            .then(ordersData => {
                setOrders(ordersData);
                setIsLoading(false);
                return;
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, []);

    const orderDeleteHandler = (OrderId: string) => {
        fetch('http://localhost:8080/order/admin/delete/' + OrderId, {
            method: 'delete', credentials: 'include'
        })
            .then(res => {
                if(res.status === 401){
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    history.push('/login');
                }

                if(res.status !== 200){
                    showWarningNotification('Ще немає замовлень');
                    return;
                }

                const newOrders = orders.filter((order) => {
                    return !(order.OrderId === OrderId);
                });

                console.log(newOrders);
                setOrders(newOrders);
                setIsLoading(false);
                showSuccessNotification("Замовлення видалено");
            })
            .catch(err => {
                console.log(err);
                showErrorNotification('Помилка сервера');
            })
    }



    return <div>
        <div style={{height: "86px"}}></div>
        <Blocks
            visible={isLoading}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
        />
        {!isLoading && <AdminOrdersList orders={orders} onDeleteOrder={orderDeleteHandler}/>}
    </div>
}

export default AdminOrders;
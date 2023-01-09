import React from "react";
import OrdersList from "../../components/Orders/OrdersList";
import classes from "./UserOrders.module.css";

const DUMMY_ORDERS = [
  {
    orderDate: new Date().toISOString(),
    orderImg: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
    orderTitle: "order",
    orderPrice: 1,
    orderStatus: true,
  },
  {
    orderDate: new Date().toISOString(),
    orderImg: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
    orderTitle: "order",
    orderPrice: 2,
    orderStatus: true,
  },
  {
    orderDate: new Date().toISOString(),
    orderImg: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
    orderTitle: "order",
    orderPrice: 3,
    orderStatus: true,
  },
  {
    orderDate: new Date().toISOString(),
    orderImg: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
    orderTitle: "order",
    orderPrice: 4,
    orderStatus: true,
  },
  {
    orderDate: new Date().toISOString(),
    orderImg: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
    orderTitle: "order",
    orderPrice: 5,
    orderStatus: true,
  },
];

const UserOrders = () => {
  return (
    <main>
      <div style={{ height: "86px" }}></div>
      <h1 className={classes.user_orders_header}>Мої замовлення</h1>
      <OrdersList orders={DUMMY_ORDERS} />
    </main>
  );
};

export default UserOrders;
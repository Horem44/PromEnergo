import React, {useEffect} from "react";
import classes from "./OrdersItem.module.css";
import {Link} from "react-router-dom";

interface ordersItemProps {
    id: number;
    onDeleteOrder: (prodId: number) => void;
    onPayOrder: (prodId: number, orderId: number) => void;
    prodImgUrl: string;
    orderDate: string;
    prodId: number;
    quantity: number;
    totalPrice: number;
    status: boolean;
}

const OrdersItem: React.FC<ordersItemProps> = (props) => {
    return (
      <div className={classes.order_container}>
        <div className={classes.order_data_container}>
          <div className={classes.order_data}>
            <Link to={"/order/" + props.prodId}>
              <img
                className={classes.order_img}
                src={props.prodImgUrl}
                alt=""
              />
            </Link>
          </div>
          <div className={classes.order_data}>
            <span>Дата замовлення</span>
            {props.orderDate}
          </div>
          <div className={classes.order_data}>
            <span>Кількість</span>
            {props.quantity}
          </div>
          <div className={classes.order_data}>
            <span>Ціна замовлення</span>
            {props.totalPrice}
          </div>
          <div className={classes.order_data}>
            <span>Статус замовлення</span>
            {props.status ? "Оплачено" : "Очікує оплати"}
          </div>
        </div>

        <div className={classes.order_button_container}>
          <button onClick={() => props.onDeleteOrder(props.prodId)}>
            Видалити замовлення
          </button>
          {!props.status &&
            <button onClick={() => props.onPayOrder(props.prodId, props.id)}>
              Перейти до оплати
            </button>
          }
        </div>
      </div>
    );
}

export default OrdersItem;
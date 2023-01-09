import React from "react";
import classes from "./DeliveryInfo.module.css";

const DeliveryInfo = () => {
    return (
        <div className={classes.delivery_info_container}>
            <form className={classes.delivery_info_form}>
                <label htmlFor="delivery_city" className={classes.delivery_info_label}>
                    Місто
                </label>
                <input
                    type="text"
                    id="delivery_city"
                    className={classes.delivery_info_input}
                />

                <label htmlFor="delivery_dep" className={classes.delivery_info_label}>
                    Відділення Нової Пошти
                </label>
                <select className={classes.delivery_info_input}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <button type='submit' className={classes.delivery_info_btn}>Зберегти зміни</button>
            </form>
        </div>
    );
};

export default DeliveryInfo;
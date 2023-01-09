import React from "react";
import classes from "./UserInfo.module.css";

const UserInfo = () => {
    return <div className={classes.user_info_container}>
        <form className={classes.user_info_form}>
            <label htmlFor="info_email" className={classes.user_info_label}>
                Email
            </label>
            <input
                type="email"
                id="info_email"
                className={classes.user_info_input}
            />

            <label htmlFor="info_name" className={classes.user_info_label}>
                Ім'я
            </label>
            <input
                type="text"
                id="info_name"
                className={classes.user_info_input}
            />

            <label htmlFor="info_surname" className={classes.user_info_label}>
                Прізвище
            </label>
            <input
                type="text"
                id="info_surname"
                className={classes.user_info_input}
            />

            <label htmlFor="info_phone" className={classes.user_info_label}>
                Телефон
            </label>
            <input
                type="text"
                id="info_phone"
                className={classes.user_info_input}
            />

            <button type='submit' className={classes.user_info_btn}>Зберегти зміни</button>
        </form>
    </div>
}

export default UserInfo;
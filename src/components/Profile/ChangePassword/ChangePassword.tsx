import React from "react";
import classes from "./ChangePassword.module.css";

const ChangePassword = () => {
    return (
        <div className={classes.change_password_container}>
            <form className={classes.change_password_form}>
                <label htmlFor="reg_email" className={classes.change_password_label}>
                    Email
                </label>
                <input
                    type="email"
                    id="reg_email"
                    className={classes.change_password_input}
                />

                <button type='submit' className={classes.change_password_btn}>Змінити пароль</button>
            </form>
        </div>
    );
};

export default ChangePassword;
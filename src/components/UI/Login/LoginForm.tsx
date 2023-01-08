import React, {FormEvent} from "react";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
    const loginFormSubmitHandler = (e:FormEvent) => {
        e.preventDefault();
        console.log('submited')
    }

    return (
        <div className={classes.login_form_container}>
            <form className={classes.login_form} onSubmit={loginFormSubmitHandler}>
                <label htmlFor="login_email" className={classes.login_form_label}>
                    Email
                </label>
                <input type="email" id="login_email" className={classes.login_form_input}/>

                <label htmlFor="login_password" className={classes.login_form_label}>
                    Пароль
                </label>
                <input type="password" id="login_password" className={classes.login_form_input}/>

                <button className={classes.login_form_btn}>Увійти</button>
                <button className={classes.login_form_btn}>Реєстрація</button>
            </form>
        </div>
    );
};

export default LoginForm;

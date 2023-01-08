import React from "react";
import LoginForm from "../../components/UI/Login/LoginForm";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
    return <main>
        <div style={{height: "86px"}}></div>
        <h1 className={classes.login_page_header}>Вхід в акаунт</h1>
        <LoginForm/>
    </main>
}

export default LoginPage;

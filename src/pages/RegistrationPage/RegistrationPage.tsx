import React from "react";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import classes from "./RegistrationPage.module.css";

const RegistrationPage = () => {
    return <main>
        <div style={{height: "86px"}}></div>
        <h1 className={classes.registration_page_header}>Реєстрація профілю</h1>
        <RegistrationForm/>
    </main>;
}

export default RegistrationPage;
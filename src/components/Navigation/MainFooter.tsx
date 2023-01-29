import React from "react";
import {Link} from "react-router-dom";
import mainLogo from './assets/logo.png';
import classes from "./MainFooter.module.css";

const MainFooter = () => {
    return <footer className={classes.main_footer}>
        <h1 className={classes.footer_header}>Типографія ПромЕнерго</h1>
        <nav className={classes.footer_nav}>
            <Link to='/'>Головна</Link>
            <Link to='/products/0'>Товари</Link>
            <Link to='/contacts'>Контакти</Link>
        </nav>
        <div className={classes.footer_logo_container}>
            <img src={mainLogo} alt="Main Logo"/>
        </div>
        <div className={classes.footer_description}>
            <p>©ПромЕнерго 2023</p>
        </div>
    </footer>;
};

export default MainFooter;
import React from "react";
import {Link} from "react-router-dom";
import classes from "./UserMenu.module.css";

const UserMenu = () => {
    return <div className={classes.user_menu}>
        <ul className={classes.user_links}>
            <li className={classes.user_link}>
                <Link to='/profile'>
                    Мій профіль
                </Link>
            </li>
            <li className={classes.user_link}>
                <Link to='/orders'>
                    Мої замовлення
                </Link>
            </li>
            <li className={classes.user_link}>
                <Link to='/'>
                    Вийти
                </Link>
            </li>
        </ul>
    </div>
}

export default UserMenu;
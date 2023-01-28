import React from "react";
import {Link} from "react-router-dom";
import classes from "./UserMenu.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {logoutRequest} from "../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";

const UserMenu = () => {
    const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const isAdmin = useSelector<RootState, boolean>((state) => state.auth.isAdmin);

    const logoutHandler = () => {
        dispatch(logoutRequest() as unknown as AnyAction);
    };

    return (
        <div className={classes.user_menu}>
            <ul className={classes.user_links}>
                {isAuth && !isAdmin && (
                    <>
                        <li className={classes.user_link}>
                            <Link to="/profile">Мій профіль</Link>
                        </li>
                        <li className={classes.user_link}>
                            <Link to="/orders">Мої замовлення</Link>
                        </li>
                        <li className={classes.user_link}>
                            <Link to="/" onClick={logoutHandler}>
                                Вийти
                            </Link>
                        </li>
                    </>
                )}
                {!isAuth && (
                    <>
                        <li className={classes.user_link}>
                            <Link to="/login">Увійти</Link>
                        </li>
                        <li className={classes.user_link}>
                            <Link to="/registration">Реєстрація</Link>
                        </li>
                    </>
                )}
                {isAdmin && (
                    <>
                        <li className={classes.user_link}>
                            <Link to="/admin/orders">Всі замовлення</Link>
                        </li>
                        <li className={classes.user_link}>
                            <Link to="/" onClick={logoutHandler}>
                                Вийти
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default UserMenu;
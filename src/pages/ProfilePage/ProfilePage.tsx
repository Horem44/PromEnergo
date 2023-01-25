import React, {useReducer} from "react";
import UserInfo from "../../components/Profile/UserInfo/UserInfo";
import DeliveryInfo from "../../components/Profile/DeliveryInfo/DeliveryInfo";
import ChangePassword from "../../components/Profile/ChangePassword/ChangePassword";
import classes from "./ProfilePage.module.css";
import Cookies from "universal-cookie";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../Store/auth-slice";
import useLogout from "../../hooks/useLogout";

interface menuState {
    userInfoIsVisible: boolean;
    deliveryInfoIsVisible: boolean;
    changePasswordIsVisible: boolean;
}

interface menuAction {
    type: string
}

const initialMenuState: menuState = {
    userInfoIsVisible: true,
    deliveryInfoIsVisible: false,
    changePasswordIsVisible: false,
}

const menuReducer = (state: menuState, action: menuAction) => {
    switch (action.type) {
        case 'USER_INFO':
            return {
                userInfoIsVisible: true,
                deliveryInfoIsVisible: false,
                changePasswordIsVisible: false,
            }
        case 'DELIVERY_INFO':
            return {
                userInfoIsVisible: false,
                deliveryInfoIsVisible: true,
                changePasswordIsVisible: false,
            }
        case 'CHANGE_PASSWORD':
            return {
                userInfoIsVisible: false,
                deliveryInfoIsVisible: false,
                changePasswordIsVisible: true,
            }
        default:
            return state;
    }
}

const ProfilePage = () => {
    useLogout();

    const [menuState, dispatch] = useReducer<(state: menuState, actions: menuAction) => menuState>(menuReducer, initialMenuState);

    const openUserInfoHandler = () => {
        dispatch({type: 'USER_INFO'});
    }

    const openDeliveryInfoHandler = () => {
        dispatch({type: 'DELIVERY_INFO'});
    }

    const openChangePasswordHandler = () => {
        dispatch({type: 'CHANGE_PASSWORD'});
    }

    return (
        <main>
            <div style={{height: "84px"}}></div>
            <h1 className={classes.profile_page_header}>Профіль користувача</h1>
            <ul className={classes.profile_page_options}>
                <li
                    className={classes.profile_page_option}
                    onClick={openUserInfoHandler}
                >
                    Особисті дані
                </li>
                <li
                    className={classes.profile_page_option}
                    onClick={openDeliveryInfoHandler}
                >
                    Інформація про доставку
                </li>
                <li
                    className={classes.profile_page_option}
                    onClick={openChangePasswordHandler}
                >
                    Зміна пароля
                </li>
            </ul>
            <div className={classes.profile_page_menus}>
                {menuState.userInfoIsVisible && <UserInfo/>}
                {menuState.deliveryInfoIsVisible && <DeliveryInfo/>}
                {menuState.changePasswordIsVisible && <ChangePassword/>}
            </div>
        </main>
    );
}

export default ProfilePage;


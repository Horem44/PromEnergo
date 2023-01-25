import React, {useEffect} from "react";
import "./App.css";
import {Route, Switch, useHistory} from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainFooter from "./components/Navigation/MainFooter";
import MainPage from "./pages/MainPage/MainPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserOrders from "./pages/UserOrders/UserOrders";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./Store/auth-slice";
import {RootState} from "./Store";
import NewPassword from "./components/Profile/ChangePassword/NewPassword";
import Cookies from "universal-cookie";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);

    useEffect(() => {
        fetch("http://localhost:8080/", { credentials: "include"})
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!res.isNotAuth) {
                    dispatch(authActions.login());
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <MainHeader/>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>

                <Route path="/contacts" exact>
                    <ContactsPage/>
                </Route>

                <Route path="/products/:page" exact>
                    <ProductsPage/>
                </Route>

                <Route path="/registration" exact>
                    <RegistrationPage/>
                </Route>

                <Route path="/login" exact>
                    <LoginPage/>
                </Route>

                <Route path="/product/:prodId" exact>
                    <ProductDetailsPage/>
                </Route>

                {isAuth &&
                    [
                        <Route key={Math.random()} path="/new-password/:token" exact>
                            <NewPassword/>
                        </Route>,

                        <Route key={Math.random()} path="/profile" exact>
                            <ProfilePage/>
                        </Route>,

                        <Route key={Math.random()} path="/orders" exact>
                            <UserOrders/>
                        </Route>,

                        <Route key={Math.random()} path="/order/details" exact>
                            <OrderDetailsPage/>
                        </Route>,

                        <Route key={Math.random()} path="/admin/add-product" exact>
                            <AdminPage/>
                        </Route>,
                    ]
                }

                <Route path="/*">
                    <MainPage/>
                </Route>
            </Switch>
            {/*<div style={{height: "100vh"}}></div>*/}
            <MainFooter/>
        </>
    );
}

export default App;

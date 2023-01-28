import React, {useEffect, useState} from "react";
import "./App.module.css";
import {Route, Switch} from "react-router-dom";
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
import EditProductForm from "./components/Admin/EditProductForm";
import classes from "./App.module.css";
import {Blocks} from "react-loader-spinner";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const isAuth = useSelector<RootState, boolean>((state) => state.auth.isAuth);
    const isAdmin = useSelector<RootState, boolean>((state) => state.auth.isAdmin);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/", {credentials: "include"})
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.isNotAuth){
                    setIsLoading(false);
                    return;
                }

                if (res.isAdmin) {
                    dispatch(authActions.loginAdmin());
                    setIsLoading(false);
                    return;
                }

                if (!res.isNotAuth) {
                    dispatch(authActions.login());
                    setIsLoading(false);
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                return;
            });
    }, []);

    return (
        <>
            <div className={classes.main_container}>
                <MainHeader/>
                <Blocks
                    visible={isLoading}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                {!isLoading && <Switch>
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

                    {isAuth && [
                        <Route key={Math.random()} path="/new-password/:token" exact>
                            <NewPassword/>
                        </Route>,

                        <Route key={Math.random()} path="/profile" exact>
                            <ProfilePage/>
                        </Route>,

                        <Route key={Math.random()} path="/orders" exact>
                            <UserOrders/>
                        </Route>,

                        <Route key={Math.random()} path="/order/:prodId" exact>
                            <OrderDetailsPage/>
                        </Route>,
                    ]}

                    {isAdmin && [
                        <Route key={Math.random()} path="/admin/add-product" exact>
                            <AdminPage/>
                        </Route>,
                        <Route key={Math.random()} path="/admin/edit/:prodId" exact>
                            <EditProductForm/>
                        </Route>,
                    ]}

                    <Route path="/*">
                        <MainPage/>
                    </Route>
                </Switch>}
                <div className={classes.main_container_footer}>
                    <MainFooter/>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>

    );
}

export default App;

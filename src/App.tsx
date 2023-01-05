import React from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainFooter from "./components/Navigation/MainFooter";
import MainPage from "./pages/MainPage/MainPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

function App() {
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

                <Route path="/products" exact>
                    <ProductsPage/>
                </Route>
            </Switch>
            {/*<div style={{height: "100vh"}}></div>*/}
            <MainFooter/>
        </>
    );
}

export default App;

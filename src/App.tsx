import React from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainFooter from "./components/Navigation/MainFooter";
import MainPage from "./pages/MainPage/MainPage";

function App() {
    return (
        <>
            <MainHeader/>
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
            </Switch>
            {/*<div style={{height: "100vh"}}></div>*/}
            <MainFooter/>
        </>
    );
}

export default App;

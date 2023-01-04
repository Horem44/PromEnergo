import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainFooter from "./components/Navigation/MainFooter";

function App() {
    return (
        <>
            <MainHeader/>
            <Switch>
                <Route path="/main" exact>

                </Route>
            </Switch>
            <div style={{height: '100vh'}}></div>
            <MainFooter/>
        </>
    );
}

export default App;

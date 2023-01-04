import React from "react";
import classes from "./BackDrop.module.css";
import ReactDOM from "react-dom";

const portalDiv = document.getElementById('backdrop')!;

const BackDrop: React.FC = () => {
    return ReactDOM.createPortal((<div className={classes.backdrop}></div>), portalDiv);
};

export default BackDrop;
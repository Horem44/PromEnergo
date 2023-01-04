import React from "react";
import classes from "./SideDrawerButton.module.css";

const SideDrawerButton = () => {
    return (
        <div className={classes.side_drawer_btn}>
            <div className={classes["side_drawer_btn--line"]}></div>
            <div className={classes["side_drawer_btn--line"]}></div>
            <div className={classes["side_drawer_btn--line"]}></div>
        </div>
    );
};

export default SideDrawerButton;
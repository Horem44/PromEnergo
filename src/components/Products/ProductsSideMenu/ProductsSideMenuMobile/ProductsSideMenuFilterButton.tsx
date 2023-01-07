import React from "react";
import filterIcon from './images/filter.png'
import classes from "./ProductsSideMenuFilterButton.module.css";

interface ProductsSideMenuFilterButtonProps {
    onToggleSideMenu: () => void
}

const ProductsSideMenuFilterButton:React.FC<ProductsSideMenuFilterButtonProps> = (props) => {
    return <button className={classes.filter_button} onClick={props.onToggleSideMenu}>
        <img src={filterIcon} alt=''/>
        <span>Фільтри</span>
    </button>;
};

export default ProductsSideMenuFilterButton;
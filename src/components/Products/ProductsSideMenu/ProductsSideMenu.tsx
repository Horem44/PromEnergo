import React from "react";
import classes from "./ProductsSideMenu.module.css";

const ProductsSideMenu = () => {
    return (
        <div className={classes.side_menu}>
            <ul className={classes.side_menu_products}>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product1"/>
                    <label htmlFor="product1">Офісний та поліграфічний папір</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product2"/>
                    <label htmlFor="product2">Етикетки та бирки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product3"/>
                    <label htmlFor="product3">Тара та упаковка, загальне</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product4"/>
                    <label htmlFor="product4">Знаки і таблички безпеки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product5"/>
                    <label htmlFor="product5">Принтери, сканери, бфп</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product6"/>
                    <label htmlFor="product6">Канцелярські конверти</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product7"/>
                    <label htmlFor="product7">Файли і папки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product8"/>
                    <label htmlFor="product8">Бланки документів</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product9"/>
                    <label htmlFor="product9">Штемпельна продукція</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="product10"/>
                    <label htmlFor="product10">Дорожні знаки</label>
                </li>
            </ul>
        </div>

    )
};

export default ProductsSideMenu;
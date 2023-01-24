import React, {ChangeEvent, useRef} from "react";
import classes from "./ProductsSideMenu.module.css";
import {useHistory} from "react-router-dom";

interface categoriesState {
    category1: boolean;
    category2: boolean;
    category3: boolean;
    category4: boolean;
    category5: boolean;
    category6: boolean;
    category7: boolean;
    category8: boolean;
    category9: boolean;
    category10: boolean;
}

interface categoriesAction {
    type: string;
}

const initialCategoriesState: categoriesState = {
    category1: false,
    category2: false,
    category3: false,
    category4: false,
    category5: false,
    category6: false,
    category7: false,
    category8: false,
    category9: false,
    category10: false,
}

let searchQuery = new URLSearchParams();

const ProductsSideMenu = () => {
    const history = useHistory();

    const categoryChooseHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            searchQuery.append(`${e.target.id}`, 'true');
        }else{
            searchQuery.delete(`${e.target.id}`);
        }
        history.push({search: '?' + searchQuery.toString()});
    }

    return (
        <div className={classes.side_menu}>
            <ul className={classes.side_menu_products}>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category1" onChange={categoryChooseHandler}/>
                    <label htmlFor="category1">Офісний та поліграфічний папір</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category2" onChange={categoryChooseHandler}/>
                    <label htmlFor="category2">Етикетки та бирки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category3" onChange={categoryChooseHandler}/>
                    <label htmlFor="category3">Тара та упаковка, загальне</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category4" onChange={categoryChooseHandler}/>
                    <label htmlFor="category4">Знаки і таблички безпеки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category5" onChange={categoryChooseHandler}/>
                    <label htmlFor="category5">Принтери, сканери, бфп</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category6" onChange={categoryChooseHandler}/>
                    <label htmlFor="category6">Канцелярські конверти</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category7" onChange={categoryChooseHandler}/>
                    <label htmlFor="category7">Файли і папки</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category8" onChange={categoryChooseHandler}/>
                    <label htmlFor="category8">Бланки документів</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category9" onChange={categoryChooseHandler}/>
                    <label htmlFor="category9">Штемпельна продукція</label>
                </li>
                <li className={classes.side_menu_product}>
                    <input type="checkbox" id="category10" onChange={categoryChooseHandler}/>
                    <label htmlFor="category10">Дорожні знаки</label>
                </li>
            </ul>
        </div>
    );
};

export default ProductsSideMenu;
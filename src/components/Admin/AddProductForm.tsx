import React from "react";
import classes from "./AddProduct.module.css";

const AddProductForm = () => {
  return (
    <div className={classes.add_product_container}>
      <form className={classes.add_product_form}>
        <label className={classes.add_product_label} htmlFor="product_title">
          Назва продукту
        </label>
        <input className={classes.add_product_input} type="text" />
        <label
          className={classes.add_product_label}
          htmlFor="product_img"
        >Картинка продукту</label>
        <input className={classes.add_product_input_img} type="file" />
        <label className={classes.add_product_label} htmlFor="product_price">
          Ціна продукту
        </label>
        <input className={classes.add_product_input} type="number" min="0" />
        <button className={classes.add_product_btn} >Додати товар</button>
      </form>
    </div>
  );
};

export default AddProductForm;
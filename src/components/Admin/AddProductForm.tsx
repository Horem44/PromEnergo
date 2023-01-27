import React, {FormEvent, useRef, useState} from "react";
import classes from "./ProductForm.module.css";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {authActions, logoutRequest} from "../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";

const AddProductForm = () => {
    const [img, setImg] = useState<Blob>();
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const titleInputRef = useRef<HTMLInputElement>(null);
    const categoryInputRef = useRef<HTMLInputElement>(null);
    const priceInputRef = useRef<HTMLInputElement>(null);

    const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files![0]);
    };

    const addProductFormSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", titleInputRef.current!.value);
        formData.append("price", priceInputRef.current!.value);
        formData.append("category", categoryInputRef.current!.value);
        formData.append("image", img!);

        fetch("http://localhost:8080/product", {
            credentials: 'include',
            method: "post",
            body: formData,
        })
            .then((res) => {
                console.log(res);
                if (res.status === 401) {
                    dispatch(logoutRequest() as unknown as AnyAction);
                    history.push('/login');
                    return;
                }

                if (res.status !== 200) {
                    throw new Error("Введіть усі дані про товар");
                }

                titleInputRef.current!.value = "";
                priceInputRef.current!.value = "";
                categoryInputRef.current!.value = "";
            })
            .catch((err) => {
                setErrorMessage(err.message);
                console.log(err);
            });
    };

    return (
        <div className={classes.add_product_container}>
            <form
                className={classes.add_product_form}
                onSubmit={addProductFormSubmitHandler}
            >
                <label className={classes.add_product_label} htmlFor="product_title">
                    Назва продукту
                </label>
                <input
                    className={classes.add_product_input}
                    type="text"
                    id="product_title"
                    ref={titleInputRef}
                />
                <label className={classes.add_product_label} htmlFor="product_category">
                    Категорія продукту
                </label>
                <input
                    className={classes.add_product_input}
                    type="text"
                    id="product_category"
                    ref={categoryInputRef}
                />
                <label className={classes.add_product_label} htmlFor="product_img">
                    Картинка продукту
                </label>
                <input
                    className={classes.add_product_input_img}
                    type="file"
                    accept=".png, .jpg"
                    id="product_img"
                    onChange={changeFileHandler}
                />
                <label className={classes.add_product_label} htmlFor="product_price">
                    Ціна продукту
                </label>
                <input
                    className={classes.add_product_input}
                    type="number"
                    min="0"
                    id="product_price"
                    ref={priceInputRef}
                />
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <button className={classes.add_product_btn} type="submit">
                    Додати товар
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
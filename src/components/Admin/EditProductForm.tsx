import React, { FormEvent, useEffect, useRef, useState } from "react";
import classes from "./ProductForm.module.css";
import { useHistory, useParams } from "react-router-dom";
import { ProductItemProps } from "../Products/ProductItem/ProductItem";
import {authActions, logoutRequest} from "../../Store/auth-slice";
import {useDispatch} from "react-redux";
import {AnyAction} from "@reduxjs/toolkit";

let currentProduct: ProductItemProps;

const EditProductForm = () => {
  const { prodId } = useParams<{ prodId: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [img, setImg] = useState<Blob>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files![0]);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/product/" + prodId)
      .then((res) => {
        return res.json();
      })
      .then((product) => {
        if (product.error) {
          throw new Error(product.error.message);
        }
        currentProduct = product;
        setIsLoading(false);
      }).catch(err => {
          console.log(err);
          history.push('/');
    });
  }, [prodId]);

  const editFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const mode = e.currentTarget.id;

    const formData = new FormData();

    formData.append("title", titleInputRef.current!.value);
    formData.append("price", priceInputRef.current!.value);
    formData.append("category", categoryInputRef.current!.value);
    formData.append("image", img!);

    if (mode === "edit") {
      setIsLoading(true);
      fetch("http://localhost:8080/product/update/" + prodId, {
        method: "post",
        credentials: 'include',
        body: formData,
      })
        .then((res) => {
          if (res.status === 401) {
            dispatch(logoutRequest() as unknown as AnyAction);
            history.push('/login');
            return;
          }

          return res.json();
        })
        .then((product) => {
          currentProduct = product;
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
    if (mode === "delete") {
      setIsLoading(true);
      fetch("http://localhost:8080/product/delete/" + prodId, {
        method: "delete",
        credentials: 'include',
      })
        .then((res) => {
          if (res.status === 401) {
            dispatch(logoutRequest() as unknown as AnyAction);
            history.push('/login');
            return;
          }

          history.push("/products/0");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
    return;
  };

  return (
    <>
      <div style={{ height: "86px" }}></div>
      <div className={classes.add_product_container}>
        <form className={classes.add_product_form}>
          {!isLoading && (
            <>
              <label
                className={classes.add_product_label}
                htmlFor="product_title"
              >
                Назва продукту
              </label>
              <input
                className={classes.add_product_input}
                type="text"
                id="product_title"
                ref={titleInputRef}
                defaultValue={currentProduct.title}
              />
              <label
                className={classes.add_product_label}
                htmlFor="product_category"
              >
                Категорія продукту
              </label>
              <input
                className={classes.add_product_input}
                type="text"
                id="product_category"
                ref={categoryInputRef}
                defaultValue={currentProduct.category}
              />
              <label
                className={classes.add_product_label}
                htmlFor="product_img"
              >
                Картинка продукту
              </label>
              <input
                className={classes.add_product_input_img}
                type="file"
                accept=".png, .jpg"
                id="product_img"
                onChange={changeFileHandler}
              />
              <label
                className={classes.add_product_label}
                htmlFor="product_price"
              >
                Ціна продукту
              </label>
              <input
                className={classes.add_product_input}
                type="number"
                min="0"
                id="product_price"
                ref={priceInputRef}
                defaultValue={currentProduct.price}
              />
              <button
                className={classes.add_product_btn}
                type="submit"
                id="edit"
                onClick={editFormSubmitHandler}
              >
                Змінити товар
              </button>

              <button
                className={classes.add_product_btn}
                type="submit"
                id="delete"
                onClick={editFormSubmitHandler}
              >
                Видалити товар
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default EditProductForm;
import React, {FormEvent, useRef, useState} from "react";
import classes from "./AddProduct.module.css";

const AddProductForm = () => {
  const [img, setImg] = useState<Blob>();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  const changeFileHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files![0]);
  }

  const addProductFormSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', titleInputRef.current!.value);
    formData.append('price', priceInputRef.current!.value);
    formData.append('category', categoryInputRef.current!.value);
    formData.append('image', img!);

    fetch("http://localhost:8080/product", {
      method: "post",
      body: formData,
    })
      .then((res) => {
        console.log(res);
        titleInputRef.current!.value = "";
        priceInputRef.current!.value = "";
        categoryInputRef.current!.value = "";
      })
      .catch((err) => console.log(err));
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
        <button className={classes.add_product_btn} type="submit">
          Додати товар
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
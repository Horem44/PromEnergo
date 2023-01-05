import React from "react";
import ProductsSideMenu from "../../components/Products/ProductsSideMenu/ProductsSideMenu";
import ProductList from "../../components/Products/ProductsList/ProductList";
import classes from "./ProductsPage.module.css";

const DUMMY_PRODUCTS = [
  {
    price: 1,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
  {
    price: 2,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
  {
    price: 3,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
  {
    price: 4,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
  {
    price: 5,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
  {
    price: 6,
    image:
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
    label: "Product",
  },
];

const ProductsPage = () => {
  return (
    <div>
      <div style={{ height: "84px" }}></div>
      <div className={classes.products_page_container}>
        <ProductsSideMenu />
        <ProductList products={DUMMY_PRODUCTS} />
      </div>
    </div>
  );
};

export default ProductsPage;

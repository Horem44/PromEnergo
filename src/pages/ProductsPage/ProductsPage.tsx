import React, { useState } from "react";
import ProductsSideMenu from "../../components/Products/ProductsSideMenu/ProductsSideMenu";
import ProductList from "../../components/Products/ProductsList/ProductList";
import classes from "./ProductsPage.module.css";
import ProductsSideMenuFilterButton from "../../components/Products/ProductsSideMenu/ProductsSideMenuMobile/ProductsSideMenuFilterButton";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {uiActions} from "../../Store/ui-slice";

const isSideMenuOpenInitially = window.innerWidth >= 750;
const windowWidth = window.innerWidth;

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
  const productsFilterMenuIsOpen = useSelector<RootState, boolean>(
      (state) => state.ui.productsFilterMenuIsVisible
  );

  const dispatch = useDispatch();

  const sideMenuToggleHandler = () => {
    dispatch(uiActions.toggleProductsFilterMenu())
    if (!productsFilterMenuIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <div>
      <div style={{ height: "84px" }}></div>
      <ProductsSideMenuFilterButton onToggleSideMenu={sideMenuToggleHandler} />
      <div className={classes.products_page_container}>
        {productsFilterMenuIsOpen && <ProductsSideMenu />}
        {productsFilterMenuIsOpen && windowWidth < 750 && (
          <div onClick={sideMenuToggleHandler}>
            <BackDrop />
          </div>
        )}
        <ProductList products={DUMMY_PRODUCTS} />
      </div>
    </div>
  );
};

export default ProductsPage;

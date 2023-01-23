import React, { useEffect, useState } from "react";
import ProductsSideMenu from "../../components/Products/ProductsSideMenu/ProductsSideMenu";
import ProductList from "../../components/Products/ProductsList/ProductList";
import classes from "./ProductsPage.module.css";
import ProductsSideMenuFilterButton from "../../components/Products/ProductsSideMenu/ProductsSideMenuMobile/ProductsSideMenuFilterButton";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { uiActions } from "../../Store/ui-slice";

const windowWidth = window.innerWidth;

let products: any;

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const productsFilterMenuIsOpen = useSelector<RootState, boolean>(
    (state) => state.ui.productsFilterMenuIsVisible
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);
      fetch("http://localhost:8080/products")
        .then((response) => {
          return response.json();
        })
        .then((prods) => {
          products = prods;
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
  }, []);

  const toggleProductsFilterMenuHandler = () => {
    dispatch(uiActions.toggleProductsFilterMenu());
    if (!productsFilterMenuIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <div>
      <div style={{ height: "84px" }}></div>
      <ProductsSideMenuFilterButton
        onToggleSideMenu={toggleProductsFilterMenuHandler}
      />
      <div className={classes.products_page_container}>
        {productsFilterMenuIsOpen && <ProductsSideMenu />}
        {productsFilterMenuIsOpen && windowWidth < 750 && (
          <div onClick={toggleProductsFilterMenuHandler}>
            <BackDrop />
          </div>
        )}
        {!isLoading && <ProductList products={products} />}
      </div>
    </div>
  );
};

export default ProductsPage;

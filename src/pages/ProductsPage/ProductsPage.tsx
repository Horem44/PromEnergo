import React, { useEffect, useState } from "react";
import ProductsSideMenu from "../../components/Products/ProductsSideMenu/ProductsSideMenu";
import ProductList from "../../components/Products/ProductsList/ProductList";
import classes from "./ProductsPage.module.css";
import ProductsSideMenuFilterButton from "../../components/Products/ProductsSideMenu/ProductsSideMenuMobile/ProductsSideMenuFilterButton";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store";
import { uiActions } from "../../Store/ui-slice";
import getProducts from "../../util/ProductsUtil/getProducts";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { paginatorActions } from "../../Store/paginator-slice";

const windowWidth = window.innerWidth;

let products: any;

const ProductsPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { page } = useParams<{ page: string }>();
  const { search: filterParams } = useLocation();

  const productsFilterMenuIsOpen = useSelector<RootState, boolean>(
    (state) => state.ui.productsFilterMenuIsVisible
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getProducts(+page, filterParams).then((prodsData) => {
      if (prodsData!.error) {
        throw new Error(prodsData!.error.message)
      }
      console.log(prodsData);

      dispatch(paginatorActions.setCount(prodsData!.count));
      products = prodsData!.data;
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      history.push("/products/0");
      return;
    });
  }, [page, filterParams]);

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
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ProductList products={products} />}
      </div>
    </div>
  );
};

export default ProductsPage;

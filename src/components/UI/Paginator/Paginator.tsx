import React, {useState} from "react";
import classes from "./Paginator.module.css";
import getProducts from "../../../util/ProductsUtil/getProducts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Store";
import {useHistory, useParams} from "react-router-dom";

const Paginator = () => {
    const history = useHistory();
    const { page: currentPage } = useParams<{page: string}>();
    const count = useSelector<RootState, number>(state => state.paginator.count);

    const nextPageHandler = () => {
       history.replace('/products/' + (+currentPage + 1));

    };

    const previousPageHandler = () => {
        history.push('/products/' + (+currentPage - 1));
    };


    return (
        <div className={classes.paginator}>
            {+currentPage !== 0 && (
                <div
                    className={classes.paginator_control}
                    onClick={previousPageHandler}
                >
                    {"<<"} Попередня
                </div>
            )}

            {(count - (+currentPage * 8) > 8) && (
                <div className={classes.paginator_control} onClick={nextPageHandler}>
                    Наступна {">>"}
                </div>
            )}
        </div>
    );
};

export default Paginator;

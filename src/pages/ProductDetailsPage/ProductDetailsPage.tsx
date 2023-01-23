import React from "react";
import Details from "../../components/Details/Details";
import {useParams} from "react-router-dom";

const ProductDetailsPage = () => {
    let {prodId} = useParams<{prodId: string}>();

    return <main>
        <div style={{height: "86px"}}></div>
        <Details buttonCaption={'Додати до замовлень'} linkTo={'/orders'} id={prodId}/>
    </main>
}

export default ProductDetailsPage;
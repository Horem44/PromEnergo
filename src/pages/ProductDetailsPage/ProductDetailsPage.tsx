import React from "react";
import Details from "../../components/Details/Details";

const ProductDetailsPage = () => {
    return <main>
        <div style={{height: "86px"}}></div>
        <Details buttonCaption={'Додати до замовлень'} linkTo={'/orders'}/>
    </main>
}

export default ProductDetailsPage;
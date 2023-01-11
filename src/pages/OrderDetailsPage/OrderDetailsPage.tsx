import React from "react";
import Details from "../../components/Details/Details";

const OrderDetailsPage = () => {
    return <main>
        <div style={{height: "86px"}}></div>
        <Details buttonCaption={'Перейти до оплати'} linkTo={'/'}/>
    </main>
}

export default OrderDetailsPage;
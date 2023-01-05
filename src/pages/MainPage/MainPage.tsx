import React from "react";
import Carousel from "../../components/UI/Carousel/Carousel";
import classes from "./MainPage.module.css";

import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpeg";
import img4 from "./images/img4.jpg";
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <main>
            <div style={{height: "86px"}}></div>
            <h1 className={classes.main_page_header}>Типографія ПромЕнерго</h1>
            <Carousel/>
            <section className={classes.main_page_info}>
                <div className={classes.main_page_container}>
                    <Link to='/products'>
                        <img src={img1} alt="img"/>
                        <h2>Широкоформатний друк</h2>
                    </Link>
                </div>
                <div className={classes.main_page_container}>
                    <Link to='/products'>
                        <img src={img2} alt="img"/>
                        <h2>Візитки</h2>
                    </Link>
                </div>
                <div className={classes.main_page_container}>
                    <Link to='/products'>
                        <img src={img3} alt="img"/>
                        <h2>Таблички</h2>
                    </Link>
                </div>
                <div className={classes.main_page_container}>
                    <Link to='/products'>
                        <img src={img4} alt="img"/>
                        <h2>Файли та папки</h2>
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default MainPage;
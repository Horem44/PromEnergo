import React from "react";
import Map from "../../components/UI/Map/Map";
import locationIcon from "./images/location_icon.png"
import classes from "./ContactsPage.module.css";

import timeIcon from "./images/time.svg";
import phoneIcon from "./images/phone.svg";
import mailIcon from "./images/envelope.svg";

const ContactsPage = () => {
    return <main>
        <div style={{height: "86px"}}></div>
        <section className={classes.location_section}>
            <img src={locationIcon} alt='img'/>
            <address>м. Вінниця вул. Генерала Арабея 13</address>
            <div>
                <Map/>
            </div>
        </section>
        <section className={classes.contacts_section}>
            <div className={classes.contact}>
                <img src={timeIcon} alt=""/>
                <p>Час роботи</p>
                <p>з 9.00 до 17.00</p>
            </div>
            <div className={classes.contact}>
                <img src={phoneIcon} alt=""/>
                <p>Телефон</p>
                <p>050 208 96 17</p>
            </div>
            <div className={classes.contact}>
                <img src={mailIcon} alt=""/>
                <p>Пошта</p>
                <p>olyayegorova8@gmail.com</p>
            </div>
        </section>
    </main>;
};

export default ContactsPage;

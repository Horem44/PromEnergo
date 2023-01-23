import React, {useEffect, useState} from "react";
import classes from "./Details.module.css";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {uiActions} from "../../Store/ui-slice";

interface DetailsProps {
    id: string;
    buttonCaption: string;
    linkTo: string;
}

interface DetailsItem {
    id: string;
    title: string;
    price: string;
    imgUrl: string;
}


let detailItem: DetailsItem;

const Details: React.FC<DetailsProps> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetails = () => {
            setIsLoading(true);
            fetch("http://localhost:8080/product/" + props.id)
                .then((response) => {
                    return response.json();
                })
                .then((item) => {
                    detailItem = item;
                    console.log(item);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchDetails();
    }, [])

    return (
        <div className={classes.details_container}>
            {!isLoading && (<>
                <img
                    src={detailItem.imgUrl}
                    alt={detailItem.title}
                />
                <div className={classes.details_description}>{detailItem.title}</div>
                <div className={classes.details_description}>{detailItem.price} грн.</div>
                <button className={classes.details_btn}>
                    <Link className={classes.details_link} to={props.linkTo}>
                        {props.buttonCaption}
                    </Link>
                </button>
            </>)}
        </div>
    );
};

export default Details;
import React from "react";
import classes from "./Paginator.module.css";

const Paginator = () => {
    return <div className={classes.paginator}>
        <div className={classes.paginator_control}>
           {'<<'} Попередня
        </div>
        <div className={classes.paginator_control}>
            Наступна {'>>'}
        </div>
    </div>;
}

export default Paginator;
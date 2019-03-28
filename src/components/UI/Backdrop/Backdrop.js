import React from "react";
import classes from "./Backdrop.module.scss";

const backdrop = props =>
    props.show ? (
        <div onClick={props.clicked} className={classes.Backdrop} />
    ) : null;

export default backdrop;

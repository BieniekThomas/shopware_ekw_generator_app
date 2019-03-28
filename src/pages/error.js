import React from "react";
import { Link } from "@reach/router";

const errorPage = () => {
    return (
        <div>
            <h1>Error</h1>
            <Link to="/">Try again</Link>
        </div>
    );
};

export default errorPage;

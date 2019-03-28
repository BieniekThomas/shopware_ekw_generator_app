import React from "react";
import classes from "./header.module.scss";
import logo from "../../images/logo.jpg";

import { Link } from "@reach/router";

const Header = () => (
    <div className={classes.Header}>
        <Link to="/" title="Home">
            <img src={logo} alt="Logo" width="200" height="50" />
        </Link>
        <Link to="/standard-plugins" title="Standard Plugins">
            Standard Plugins
        </Link>
    </div>
);

export default Header;

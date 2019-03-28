import React, { Component } from "react";

import Header from "./components/Header/header";
import { Router, Location } from "@reach/router";

import Home from "./pages/index";
import "./index.css";
import classes from "./App.module.scss";
import Plugins from "./pages/plugins";
import ErrorPage from "./pages/error";
import SuccessPage from "./pages/success";

import posed, { PoseGroup } from "react-pose";

const RouteContainer = posed.div({
    enter: { opacity: 1, delay: 300, beforeChildren: 300 },
    exit: { opacity: 0 }
});

const PosedRouter = ({ children }) => (
    <Location>
        {({ location }) => (
            <PoseGroup>
                <RouteContainer key={location.key}>
                    <Router location={location}>{children}</Router>
                </RouteContainer>
            </PoseGroup>
        )}
    </Location>
);

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className={classes.BodyWrapper}>
                    <div className={classes.BodyInner}>
                        <PosedRouter>
                            <Home path="/" />
                            <Plugins path="/standard-plugins" />
                            <ErrorPage path="/error" />
                            <SuccessPage path="/success" />
                        </PosedRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

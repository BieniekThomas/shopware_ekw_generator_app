import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import * as actions from "../../store/actions/index";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Success extends Component {
    componentDidMount() {
        if (this.props.isDownloadAvailable) {
            this.props.download();
        }
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.props.download();
    };

    render() {
        let successForm = (
            <React.Fragment>
                <p>
                    Wenn der Download nicht automatisch gestartet ist, kannst du
                    ihn hier manuell nochmal starten
                </p>
                <form onSubmit={event => this.onSubmitHandler(event)}>
                    <Button>Download starten</Button>
                </form>
            </React.Fragment>
        );

        if (!this.props.isDownloadAvailable) {
            successForm = (
                <React.Fragment>
                    <h3>you shouldn't be here</h3>
                    <Link to="/">Go Home</Link>
                </React.Fragment>
            );
        }

        if (this.props.Loading) {
            successForm = <Spinner />;
        }

        if (this.props.isSuccess) {
            successForm = <h1>Successfully downloaded</h1>;
        }

        if (this.props.isError) {
            successForm = (
                <React.Fragment>
                    <h1>Something went wrong</h1>
                    <Link to="/">Try again</Link>
                </React.Fragment>
            );
        }

        return successForm;
    }
}

const mapStateToProps = state => {
    return {
        isDownloadAvailable: state.download.isDownloadAvailable,
        loading: state.download.loading,
        isError: state.download.isError,
        isSuccess: state.download.isSuccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        download: (token, userId) => dispatch(actions.download(token, userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Success, Axios));

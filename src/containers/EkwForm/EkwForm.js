import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "../../components/UI/Button/Button";
import classes from "./EkwForm.module.scss";
import BackendForm from "../backendForm/BackendForm";

class EkwForm extends Component {
    inputChangedHandler = (event, inputIdentifier) => {
        this.props.fieldChange(event, inputIdentifier);
        this.props.checkFormValid(event, inputIdentifier);
    };

    onSubmitHandler = event => {
        event.preventDefault();
        // @todo: fetchData in Redux
        const formData = {
            normal: {},
            backendFields: {}
        };
        for (let formElementIdentifier in this.props.ekwForm) {
            formData.normal[formElementIdentifier] = this.props.ekwForm[
                formElementIdentifier
            ].value;
        }

        for (let backendFieldIdentifier in this.props.backendFields) {
            const backField = this.props.backendFields[backendFieldIdentifier];
            // destructuring
            const {
                valueSelect,
                valueName,
                valueFieldLabel,
                valueSupportText,
                valueDefaultValue,
                valueRequired
            } = backField;
            formData.backendFields[backendFieldIdentifier] = {
                valueSelect,
                valueName,
                valueFieldLabel,
                valueSupportText,
                valueDefaultValue,
                valueRequired
            };
        }

        this.props.submitForm(formData);
    };

    render() {
        const formElementsArray = [];
        for (let key in this.props.ekwForm) {
            formElementsArray.push({
                id: key,
                config: this.props.ekwForm[key]
            });
        }

        let formInner = (
            <React.Fragment>
                <span onClick={() => this.props.resetFields()}>
                    Reset Fields
                </span>
                <div
                    className={classes.Container}
                    style={{ display: "flex", alignItems: "stretch" }}
                >
                    <div
                        className={classes.LeftContainer}
                        style={{
                            width: "50%",
                            paddingRight: 20,
                            float: "left"
                        }}
                    >
                        {formElementsArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                name={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={event =>
                                    this.inputChangedHandler(
                                        event,
                                        formElement.id
                                    )
                                }
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                label={formElement.config.elementConfig.label}
                                required={
                                    formElement.config.validation.required
                                }
                            />
                        ))}
                        <Button
                            type="submit"
                            disabled={!this.props.formIsValid}
                        >
                            Jetzt erstellen!
                        </Button>
                    </div>
                    <div className={classes.RightContainer}>
                        <BackendForm />
                    </div>
                </div>
            </React.Fragment>
        );

        if (this.props.loading) {
            formInner = <Spinner />;
        }

        return (
            <React.Fragment>
                <form onSubmit={event => this.onSubmitHandler(event)}>
                    {formInner}
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.submit.loading,
        isError: state.submit.isError,
        isSuccess: state.submit.isSuccess,
        ekwForm: state.fields.ekwFields,
        formIsValid: state.fields.formIsValid,
        backendFields: state.fields.backendFields
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitForm: formData => dispatch(actions.submitForm(formData)),
        resetFields: () => dispatch(actions.emptyFields()),
        fieldChange: (event, inputIdentifier) =>
            dispatch(actions.fieldChange(event, inputIdentifier)),
        checkFormValid: (event, inputIdentifier) =>
            dispatch(actions.checkFormValid(event, inputIdentifier))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(EkwForm, Axios));

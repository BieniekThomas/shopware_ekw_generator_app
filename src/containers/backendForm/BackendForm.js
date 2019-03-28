import React, { Component } from "react";
import { connect } from "react-redux";

import BackendFieldset from "../../components/Fieldset/BackendFieldset/BackendFieldset";
import classes from "./BackendForm.module.scss";
import * as actions from "../../store/actions/index";

class BackendForm extends Component {
    onShowMoreInputs = () => {
        this.props.addBackendField();
    };

    onDeleteHandler = id => {
        this.props.removeBackendField(id);
    };

    render() {
        let fields = null;
        const backendFieldsObject = this.props.backendFields;
        const backendFields = Object.entries(backendFieldsObject);
        if (backendFields.length > 0) {
            fields = backendFields.map(item => {
                // destructring
                var [key, values] = item;
                return (
                    <BackendFieldset
                        key={key}
                        itemId={key}
                        valueSelect={values.selectValue}
                        valueName={values.valueName}
                        valueFieldLabel={values.valueFieldLabel}
                        valueSupportText={values.valueSupportText}
                        valueDefaultValue={values.valueDefaultValue}
                        valueRequired={values.valueRequired}
                        onDelete={() => this.onDeleteHandler(key)}
                    />
                );
            });
        }

        return (
            <div className={classes.Inner}>
                <h3>Backendkonfiguration</h3>
                <span
                    className={classes.MoreInputs}
                    onClick={event => this.onShowMoreInputs(event)}
                >
                    +
                </span>
                {fields}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        backendFields: state.fields.backendFields
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBackendField: () => dispatch(actions.addBackendField()),
        removeBackendField: id => dispatch(actions.removeBackendField(id)),
        inputChanged: (event, key) =>
            dispatch(actions.backendFieldChange(event, key))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackendForm);

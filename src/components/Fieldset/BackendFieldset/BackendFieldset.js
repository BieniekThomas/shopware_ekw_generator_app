import React from "react";
import Input from "../../UI/Input/Input";
import classes from "./BackendFieldset.module.scss";

import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const BackendFieldset = props => {
    const elementOptions = {
        options: [
            { value: "none", displayValue: "Bitte Auswählen" },
            { value: "textfield", displayValue: "Textfeld" },
            { value: "textArea", displayValue: "Textarea" },
            { value: "checkbox", displayValue: "Checkbox" },
            { value: "mediafield", displayValue: "Mediafeld" },
            { value: "tinyMce", displayValue: "WYSIWYG-Editor" },
            { value: "displayfield", displayValue: "Überschrift" }
        ],
        value: "bitte auswählen"
    };

    const onSelectChange = (event, key) => {
        props.selectFieldChange(event, key);
    };

    const onInputChange = event => {
        props.backendFieldChange(event, props.itemId);
    };

    let inputSet = null;
    // destructuring
    const {
        valueSelect,
        valueName,
        valueFieldLabel,
        valueSupportText,
        valueRequired,
        valueDefaultValue
    } = props.backendFields[props.itemId];

    const defaultFormSet = (
        <React.Fragment>
            <input
                type="text"
                placeholder="Name"
                name="valueName"
                value={valueName}
                onChange={event => onInputChange(event)}
            />
            <input
                type="text"
                placeholder="Field Label"
                name="valueFieldLabel"
                value={valueFieldLabel}
                onChange={event => onInputChange(event)}
            />
            <input
                type="text"
                placeholder="Support Text"
                name="valueSupportText"
                value={valueSupportText}
                onChange={event => onInputChange(event)}
            />
            <input
                type="checkbox"
                name="valueRequired"
                value={valueRequired}
                checked={valueRequired}
                onChange={event => onInputChange(event)}
            />{" "}
            Required?
            <input
                type="text"
                placeholder="Default Value"
                name="valueDefaultValue"
                value={valueDefaultValue}
                onChange={event => onInputChange(event)}
            />
        </React.Fragment>
    );
    // todo: https://developers.shopware.com/developers-guide/custom-shopping-world-elements/#adding-configuration-fields-to-the-element alle Elemente abbilden
    switch (valueSelect) {
        case "textfield":
            inputSet = defaultFormSet;
            break;
        case "textArea":
            inputSet = defaultFormSet;
            break;
        case "checkbox":
            inputSet = <p>Checkbox</p>;
            break;
        case "mediafield":
            inputSet = <p>Mediafeld</p>;
            break;
        case "tinyMce":
            inputSet = <p>WYSIWIG-Editor</p>;
            break;
        case "displayfield":
            inputSet = <p>Überschrift</p>;
            break;
        case "none":
            inputSet = null;
            break;
        default:
            inputSet = null;
    }
    return (
        <div
            key={props.itemId}
            className={classes.InputWrap}
            style={{
                width: "100%",
                margin: "20px 0",
                paddingLeft: 20,
                borderLeft: "1px solid #ccc"
            }}
        >
            <span onClick={() => props.onDelete(props.itemId)}>
                Eingabefeld löschen
            </span>
            <Input
                elementType="select"
                elementConfig={elementOptions}
                changed={event => onSelectChange(event, props.itemId)}
            />
            {inputSet}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        backendFields: state.fields.backendFields
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectFieldChange: (event, key) =>
            dispatch(actions.selectFieldChange(event, key)),
        backendFieldChange: (event, key) =>
            dispatch(actions.backendFieldChange(event, key))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BackendFieldset);

import * as actionTypes from "./actionTypes";

// normal fields
export const fieldChange = (event, inputIdentifier) => {
    const updatedFormElement = {
        value: event.target.value,
        touched: true
    };

    return {
        type: actionTypes.FIELD_CHANGE,
        id: inputIdentifier,
        updatedFormElement: updatedFormElement
    };
};

// backend fields
export const backendFieldChange = (event, inputIdentifier) => {
    if (event.target.name === "valueRequired") {
        const makeBoolean = event.target.value === "true";
        return {
            type: actionTypes.BACKENDFIELD_CHANGE,
            id: inputIdentifier,
            value: !makeBoolean,
            name: event.target.name
        };
    }
    return {
        type: actionTypes.BACKENDFIELD_CHANGE,
        id: inputIdentifier,
        value: event.target.value,
        name: event.target.name
    };
};

let backendFieldId = 0;
export const addBackendField = () => {
    return {
        type: actionTypes.BACKENDFIELD_ADD,
        id: ++backendFieldId
    };
};

export const removeBackendField = inputIdentifier => {
    return {
        type: actionTypes.BACKENDFIELD_REMOVE,
        id: inputIdentifier
    };
};

export const selectFieldChange = (event, id) => {
    return {
        type: actionTypes.BACKENDFIELD_SELECT_CHANGE,
        value: event.target.value,
        id: id
    };
};

// general
export const emptyFields = () => {
    return {
        type: actionTypes.EMPTY_FIELDS
    };
};

export const checkFormValid = (event, inputIdentifier) => {
    return {
        type: actionTypes.CHECK_FORM_VALID,
        value: event.target.value,
        name: event.target.name,
        id: inputIdentifier
    };
};

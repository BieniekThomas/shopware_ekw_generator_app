import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initalState = {
    ekwFields: {
        ekwName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Dein Pluginname",
                label: "EKW-Name in CamelCase"
            },
            value: "",
            validation: {
                required: true,
                isValidEkwName: true
            },
            valid: false,
            touched: false
        },
        description: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                placeholder: "",
                label: "Beschreibung"
            },
            value: "",
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        author: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "econsor",
                label: "Autor"
            },
            value: "",
            validation: {
                required: false
            },
            valid: true,
            touched: false
        },
        link: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "www.econsor.de",
                label: "Link"
            },
            value: "",
            validation: {
                required: false
            },
            valid: true,
            touched: false
        }
    },
    backendFields: {},
    formIsValid: true
};

const initialStateCopy = { ...initalState };

// normal fields
const fieldChange = (state, action) => {
    const id = action.id;
    const updatedFormElement = updateObject(state.ekwFields[id], {
        value: action.updatedFormElement.value,
        // valid: action.updatedFormElement.valid,
        touched: action.updatedFormElement.valid
    });
    const updatedOrderForm = updateObject(state.ekwFields, {
        [id]: updatedFormElement
    });
    return updateObject(state, {
        ekwFields: updatedOrderForm
    });
};

// backend fields
const backendFieldChange = (state, action) => {
    const name = action.name;
    const value = action.value;
    const id = action.id;
    const updatedFormElement = updateObject(state.backendFields[id], {
        [name]: value
    });
    const updatedBackendForm = updateObject(state.backendFields, {
        [id]: updatedFormElement
    });
    return updateObject(state, {
        backendFields: updatedBackendForm
    });
};

const selectFieldChange = (state, action) => {
    const inputId = action.id;
    const value = action.value;
    const updatedElement = updateObject(state.backendFields[inputId], {
        valueSelect: value
    });
    const updatedBackendform = updateObject(state.backendFields, {
        [inputId]: updatedElement
    });
    return updateObject(state, {
        backendFields: updatedBackendform
    });
};

const addBackendField = (state, action) => {
    const inputId = action.id;
    const backendFieldsUpdate = {
        ...state.backendFields,
        ["backendField_" + inputId]: {
            id: inputId,
            valueSelect: "none",
            valueName: "",
            valueFieldLabel: "",
            valueSupportText: "",
            valueDefaultValue: "",
            valueRequired: false
        }
    };
    return updateObject(state, {
        backendFields: backendFieldsUpdate
    });
};

const removeBackendField = (state, action) => {
    const copyObject = { ...state.backendFields };
    const arrayItem = Object.entries(copyObject);
    const filteredArray = arrayItem.filter(item => {
        const [key] = item;
        return key !== action.id;
    });

    const backendFieldsUpdate = filteredArray.reduce((result, item) => {
        const [key, values] = item;
        const resultOld = { ...result };
        result = {
            ...resultOld,
            [key]: {
                ...values
            }
        };
        return result;
    }, {});

    return updateObject(state, {
        backendFields: backendFieldsUpdate
    });
};

// general
const emptyFields = (state, action) => {
    return updateObject(state, {
        ekwFields: initialStateCopy.ekwFields,
        backendFields: initialStateCopy.backendFields,
        formIsValid: initialStateCopy.formIsValid
    });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.EMPTY_FIELDS:
            return emptyFields(state, action);
        case actionTypes.FIELD_CHANGE:
            return fieldChange(state, action);
        case actionTypes.BACKENDFIELD_SELECT_CHANGE:
            return selectFieldChange(state, action);
        case actionTypes.BACKENDFIELD_REMOVE:
            return removeBackendField(state, action);
        case actionTypes.BACKENDFIELD_ADD:
            return addBackendField(state, action);
        case actionTypes.BACKENDFIELD_CHANGE:
            return backendFieldChange(state, action);
        default:
            return state;
    }
};

export default reducer;

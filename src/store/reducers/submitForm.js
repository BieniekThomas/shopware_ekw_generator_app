import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    formFields: [],
    loading: false,
    isSuccess: false,
    isError: false
};

const initSubmitForm = (state, action) => {
    const fields = action.formData;
    return updateObject(state, {
        loading: true,
        formFields: fields
    });
};

const submitFormSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        isSuccess: true
    });
};

const submitFormFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        isError: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_SUBMIT_FORM:
            return initSubmitForm(state, action);
        case actionTypes.SUBMIT_SUCCESS:
            return submitFormSuccess(state, action);
        case actionTypes.SUBMIT_FAIL:
            return submitFormFail(state, action);
        default:
            return state;
    }
};

export default reducer;

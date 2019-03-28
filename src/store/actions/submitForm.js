import * as actionTypes from "./actionTypes";
import Axios from "axios";
import { navigate } from "@reach/router";
import { prepareDownload } from "./download";

export const initSubmitForm = formData => {
    return {
        type: actionTypes.INIT_SUBMIT_FORM,
        ekwData: formData
    };
};

export const submitFail = error => {
    return {
        type: actionTypes.SUBMIT_FAIL,
        error: error
    };
};

export const submitSuccess = () => {
    return {
        type: actionTypes.SUBMIT_SUCCESS
    };
};

export const submitForm = formData => {
    return dispatch => {
        dispatch(initSubmitForm(formData));
        Axios.post("/ekw-submit", formData)
            .then(response => {
                dispatch(submitSuccess());
                dispatch(prepareDownload());
                navigate("/success");
            })
            .catch(error => {
                dispatch(submitFail(error));
                navigate("/error");
            });
    };
};

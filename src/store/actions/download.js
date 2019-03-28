import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const prepareDownload = () => {
    return {
        type: actionTypes.PREPARE_DOWNLOAD
    };
};

export const initDownload = () => {
    return {
        type: actionTypes.INIT_DOWNLOAD
    };
};

export const downloadFail = error => {
    return {
        type: actionTypes.DOWNLOAD_FAIL,
        error: error
    };
};

export const downloadSuccess = () => {
    return {
        type: actionTypes.DOWNLOAD_SUCCESS
    };
};

const downloadZip = data => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ekw.zip");
    document.body.appendChild(link);
    link.click();
};

export const download = () => {
    return dispatch => {
        dispatch(initDownload());
        Axios({
            url: "/success",
            method: "GET",
            responseType: "blob", // important
            mode: "cors",
            headers: { "Access-Control-Allow-Origin": true }
        })
            .then(response => {
                dispatch(downloadSuccess());
                downloadZip(response.data);
            })
            .catch(err => {
                dispatch(downloadFail(err));
            });
    };
};

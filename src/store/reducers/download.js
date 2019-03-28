import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    isDownloadAvailable: false,
    loading: false,
    download: false,
    isError: false,
    isSuccess: false
};

const initDownload = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const prepareDownload = (state, action) => {
    return updateObject(state, {
        isDownloadAvailable: true,
        isError: false,
        isSuccess: false,
        download: false
    });
};

const downloadSuccess = (state, action) => {
    return updateObject(state, {
        isDownloadAvailable: false,
        loading: false,
        download: false,
        isSuccess: true
    });
};

const downloadFail = (state, action) => {
    return updateObject(state, {
        isDownloadAvailable: false,
        loading: false,
        download: false,
        isError: true
    });
};

const download = (state, action) => {
    return updateObject(state, {
        download: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PREPARE_DOWNLOAD:
            return prepareDownload(state, action);
        case actionTypes.INIT_DOWNLOAD:
            return initDownload(state, action);
        case actionTypes.DOWNLOAD_SUCCESS:
            return downloadSuccess(state, action);
        case actionTypes.DOWNLOAD_FAIL:
            return downloadFail(state, action);
        case actionTypes.DOWNLOAD:
            return download(state, action);
        default:
            return state;
    }
};

export default reducer;

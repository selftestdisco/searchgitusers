import * as actionTypes from './actionTypes';


export const fetchAllUsers = (page = 135) => {
    return {
        type: actionTypes.FETCH_ALL_USERS,
        data: page
    };
}

export const fetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        data: data
    };
}

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAILED,
        error: error,
        msg : "Could not get users details"
    };
}

export const selectUser = (data) => {
    return { 
        type : actionTypes.SELECT_USER,
        data: data
    }
}
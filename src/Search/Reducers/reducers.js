import * as actionTypes from '../Actions/actionTypes';

export const fetchUsersReducer = (state,action) => {
    switch(action.type){
        case actionTypes.FETCH_USERS_SUCCESS: 
            return {...state,users:action.data};
        case actionTypes.FETCH_USERS_FAILED:
            return {...state,error:action.error,msg:action.msg}
        case actionTypes.SELECT_USER: 
            return {...state,selectedUser: action.data}
        default:
            return state;
    }
}
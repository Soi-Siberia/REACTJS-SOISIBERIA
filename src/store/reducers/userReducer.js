import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    dataVerify: "",
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
        console.log("Login success", action.userInfo)
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.VERIFY_EMAIL_SUCCESS:
            state.dataVerify = action.data 
            return {
            ...state,
            }
        case actionTypes.VERIFY_EMAIL_FAILD:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;
import actionTypes from '../actions/actionTypes';

const initialState = {
    doctorTop: [],
}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                doctorTop: action.data
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default homePageReducer;
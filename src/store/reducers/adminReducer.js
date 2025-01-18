import actionTypes from '../actions/actionTypes';
// import { userService } from '../../../services';


const initialState = {
    genders:[],
    rode: [],
    Postion:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("Đây là FETCH_GENDER_START",action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let coppyState = { ...state}
            coppyState.genders = action.data
            console.log("Đây là FETCH_GENDER_SUCCESS")
            console.log("data: ", coppyState)
            return {
                ...coppyState
            }
        
        case actionTypes.FETCH_GENDER_FAIDED:
        console.log("Đây là FETCH_GENDER_FAIDED")
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;
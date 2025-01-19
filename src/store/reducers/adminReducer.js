import actionTypes from '../actions/actionTypes';
// import { userService } from '../../../services';


const initialState = {
    isLoadinggender: false,
    genders:[],
    role: [],
    postion:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadinggender = true;
            // console.log("Đây là FETCH_GENDER_START",action)
            // console.log("data state start", state)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let coppyState = { ...state}
            coppyState.genders = action.data
            coppyState.isLoadinggender = false
            // console.log("Đây là FETCH_GENDER_SUCCESS")
            // console.log("data success: ", coppyState)
            return {
                ...coppyState
            }
        
        case actionTypes.FETCH_GENDER_FAIDED:
        // console.log("Đây là FETCH_GENDER_FAIDED")
        state.isLoadinggender = false
            return {
                ...state
            }

        
        case actionTypes.FETCH_POSITION_START:
            return{
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.postion = action.data
            return{
                ...state
            }

        case actionTypes.FETCH_POSITION_FAIDED:
            return{
                ...state
            }

        //ROLE
        case actionTypes.FETCH_ROLE_START:
            console.log(" ROLE SUCCESS")
            return{
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data
            return{
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            return{
                ...state
            }

        

        default:
            return state;
    }
}

export default adminReducer;
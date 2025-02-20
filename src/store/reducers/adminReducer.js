import actionTypes from '../actions/actionTypes';
// import { userService } from '../../../services';


const initialState = {
    isLoadinggender: false,
    genders:[],
    role: [],
    postion:[],
    dataCreateUser:[],
    dataAllUser: [],
    dataAllDoctor: [],
    roleTimeDoctor: []
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
            // console.log(" ROLE SUCCESS")
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

        // CREATE NEW USER
        case actionTypes.CREATE_NEW_USER_SUCCESS:
            state.dataCreateUser = action.data
            // console.log("admin reducer data", state.dataCreateUser)
            return{
                ...state
            }
        case actionTypes.CREATE_NEW_USER_FAILED:
            return{
                ...state
            }
        
        case actionTypes.GET_ALL_USER_SUCCESS:
            state.dataAllUser = action.data
            return{
                ...state
            }
        case actionTypes.GET_ALL_USER_FAILD:
            return{
                ...state
            }
        case actionTypes.DELETE_USER_BY_ID_SUCCESS:
            return{
                ...state
            }
        case actionTypes.DELETE_USER_BY_ID_FAILD:
            return{
                ...state
            }
        case actionTypes.UPDATE_USER_SUCCESS:
            return{
                ...state
            }
        case actionTypes.UPDATE_USER_FAILD:
            return{
                ...state
            }
        case actionTypes.GET_ALL_DOCTOR_SUCCESS:
            state.dataAllDoctor = action.data
            return{
                ...state
            }
        case actionTypes.GET_ALL_DOCTOR_FAILD:
            return{
                ...state
            }                       
        case actionTypes.CREATE_MARKDOWN_SUCCESS:
            return{
                ...state
            } 

        case actionTypes.CREATE_MARKDOWN_FAILD:
            return{
                ...state
            }
        case actionTypes.FETCH_ROLE_DOCTOR_SUCCESS:
            state.roleTimeDoctor = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_DOCTOR_FAIDED:
            
            return{
                ...state
            }

            default:
        return state;
    }
}

export default adminReducer;
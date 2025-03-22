import actionTypes from '../actions/actionTypes';

const initialState = {
    doctorTop: [],
    detailDoctor: [],
    scheduleDoctor: [],
    TimeDoctors: [],
    extraInforDoctor: [],
    profileDoctor: []

}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                doctorTop: action.data
            }
        case actionTypes.GET_ALL_DOCTOR_FAILD:
            return {
                ...state
            }
        
        case actionTypes.GET_DETAIL_DOCTOR_BY_ID_SUCCESS:
            state.detailDoctor = action.data
            return {
                ...state
            }

        case actionTypes.GET_DETAIL_DOCTOR_BY_ID_FAILD:
            return{
                ...state
            }
            
        case actionTypes.GET_SCHDULE_DOCTOR_BY_ID_SUCCESS:
            
            return{
                ...state,
                scheduleDoctor: action.data
            }

        case actionTypes.GET_SCHDULE_DOCTOR_BY_ID_FAILD:

            return{
                ...state
            }
        case actionTypes.GET_EXTRA_INFOR_DOCTER_SUCCESS:
            return{
                ...state,
                extraInforDoctor: action.data
            }
        case actionTypes.GET_EXTRA_INFOR_DOCTER_FAILD:
            return{
                ...state
            }
        case actionTypes.GET_PROFILE_DOCTOR_SUCCESS:
            return{
                ...state,
                profileDoctor: action.data
            }
        case actionTypes.GET_PROFILE_DOCTOR_FAILD:
            return{
                ...state
            }
        case actionTypes.CREATE_BOOKING_PATTIENT_SUCCESS:
            return{
                ...state
            }
        case actionTypes.CREATE_BOOKING_PATTIENT_FAILD:
            return{
                ...state
            }
            
        default:
            return state;
    }
}

export default homePageReducer;
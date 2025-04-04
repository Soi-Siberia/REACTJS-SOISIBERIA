import actionTypes from "./actionTypes";
import { homePageService, userService } from "../../services";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export const getTopDoctorStart = () => {
    return async (dispatch, getSate) =>{
        try {

            let result = await homePageService.getTopDoctor(10)
            if(result)
            {
                // console.log("Dữ liệu Top Doctor: ", result)
                // toast.success("Load thành công")
                dispatch(getTopDoctorSuccess(result))

            }else{

                dispatch(getTopDoctorFaild())

            }
            
        } catch (e) {
            
            dispatch(getTopDoctorFaild())
            // toast.error("Please contact administrator")
            console.log("getTopDoctorStart ERROR")
            
        }
    }
}

export const getTopDoctorSuccess = (data)=> ({
    type: actionTypes.GET_TOP_DOCTOR_SUCCESS,
    data: data
})

export const getTopDoctorFaild = ()=> ({
    type: actionTypes.GET_TOP_DOCTOR_FALLD,
})

export const getDetailDoctorByIdStart = (id) => {
    return async (dispatch, getSate) =>{
        try {
            // console.log("ID get detailt Doctor: ", id)
            let result = await homePageService.getDetailDoctorById(id)
            if(result)
            {
                // console.log("Detail  Doctor by ID: ", result)
                // toast.success("Load thành công")
                dispatch(getDetailDoctorByIdSuccess(result))

            }else{

                dispatch(getDetailDoctorByIdFaild())

            }
            
        } catch (e) {
            
            dispatch(getDetailDoctorByIdFaild())
            // toast.error("Please contact administrator")
            console.log("getDetailDoctorByIdStart ERROR")
            
        }
    }
}

export const getDetailDoctorByIdSuccess = (data)=> ({
    type: actionTypes.GET_DETAIL_DOCTOR_BY_ID_SUCCESS,
    data: data
})
export const getDetailDoctorByIdFaild = ()=> ({
    type: actionTypes.GET_DETAIL_DOCTOR_BY_ID_FAILD,
})

export const getSchduleDoctorByIdStart = (id) =>{
    return async (dispatch, getSate)=>{
        try {
            // console.log("id active get schdule", id)
            let result = await homePageService.getScheduleDoctorByID(id)
            if(result && result.errCode === 0)
            {
                // console.log("Data get schudule by ID: ", result.data)
                dispatch(getSchduleDoctorByIdSuccess(result.data))
            }else
            {
                dispatch(getSchduleDoctorByIdFaild())
            }
            
        } catch (e) {
            console.log("getSchduleDoctorByIdStart Error")
            // toast.error("Đã có lỗi phát sinh")
            dispatch(getSchduleDoctorByIdFaild())
        }
    }
}
export const getSchduleDoctorByIdSuccess = (data) => ({
    type: actionTypes.GET_SCHDULE_DOCTOR_BY_ID_SUCCESS,
    data: data
})

export const getSchduleDoctorByIdFaild = (data) => ({
    type: actionTypes.GET_SCHDULE_DOCTOR_BY_ID_FAILD,
})

export const fatchTimeStart = ()=>{
    return async(dispatch, getSate) => {
        try {
            let result = await userService.getAllCode('TIME')
            if(result && result.errCode === 0)
            {
                console.log("Time result.dataResult: ", result.dataResult)
                
                dispatch(fatchTimeSucess(result.dataResult))
            }else
            {
                dispatch(fatchTimeFaild())
            }

            
        } catch (e) {
            console.log("fatchTimeStart ERROR")
            dispatch(fatchTimeFaild())
        }
    }
}

export const fatchTimeSucess = (data) =>({
    type: actionTypes.FATCH_TIME_SUCESS,
    data: data
})
export const fatchTimeFaild = () =>({
    type: actionTypes.FATCH_TIME_FAILD
})

export const getExtraInforDoctorByIdStart = (id) =>{
    return async (dispatch, getSate) =>{
        try {
            let result = await homePageService.getExtraInforDoctorByID(id)
            if(result && result.errCode === 0)
            {
                // console.log("Extra Infor Doctor: ", result)
                dispatch(getExtraInforDoctorByIdSuccess(result.data))
            }else
            {
                // dispatch(getExtraInforDoctorByIdFaild())
            }
            
        } catch (e) {
            console.log("getExtraInforDoctorById ERROR")
            dispatch(getExtraInforDoctorByIdFaild())
        }
    }
}

export const getExtraInforDoctorByIdSuccess = (data) =>({
    type: actionTypes.GET_EXTRA_INFOR_DOCTER_SUCCESS,
    data: data
})
export const getExtraInforDoctorByIdFaild = () =>({
    type: actionTypes.GET_EXTRA_INFOR_DOCTER_FAILD
})

export const getProfileDoctorByIdStart = (id) =>{
    // console.log("ID get profile doctor: ", id)
    return async (dispatch, getSate) =>{
        try {
            let result = await homePageService.getProfileDoctorByID(id)
            if(result && result.errCode === 0)
            {
                // console.log("Profile Doctor: ", result)
                dispatch(getProfileDoctorByIdSuccess(result.data))
            }else
            {
                dispatch(getProfileDoctorByIdFaild())
            }
            
        } catch (e) {
            console.log("getProfileDoctorById ERROR")
            // dispatch(getProfileDoctorByIdFaild())
        }
    }
}
export const getProfileDoctorByIdSuccess = (data) =>({
    type: actionTypes.GET_PROFILE_DOCTOR_SUCCESS,
    data: data
})
export const getProfileDoctorByIdFaild = () =>({
    type: actionTypes.GET_PROFILE_DOCTOR_FAILD
})

export const createBookingPattientStart = (data)=>{
    return async(dispatch, getSate) => {
        try {
            let result = await userService.createBookingPattient(data)
            if(result && result.errCode === 0)
            {
                // console.log("Đã lên lịch khám thành công !!!")
                dispatch(createBookingPattientSuccess())
                toast.success(result.message)
            }else
            {
                dispatch(createBookingPattientFaild())
                toast.success(result.message)

            }

            
        } catch (e) {
            dispatch(createBookingPattientFaild())
        }
    }
}

export const createBookingPattientSuccess = () =>({
    type: actionTypes.CREATE_BOOKING_PATTIENT_SUCCESS,
})

export const createBookingPattientFaild = () =>({
    type: actionTypes.CREATE_BOOKING_PATTIENT_FAILD,
})


export const getAllSpecialtyStart = () => {
    return async (dispatch, getSate) =>{
        try {
            let result = await homePageService.getAllSpecialty()
            if(result && result.errCode === 0)
            {
                // console.log("Data get all specialty: ", result)
                dispatch(getAllSpecialtySuccess(result.data))
            }else
            {
                dispatch(getAllSpecialtyFaild())
            }
            
        } catch (e) {
            console.log("getAllSpecialtyStart ERROR")
        }
    }
}
export const getAllSpecialtySuccess = (data) =>({
    type: actionTypes.GET_ALL_SPECIALTY_SUCCESS,
    data: data
})
export const getAllSpecialtyFaild = () =>({
    type: actionTypes.GET_ALL_SPECIALTY_FAILD,
})
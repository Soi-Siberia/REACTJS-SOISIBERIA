import actionTypes from "./actionTypes";
import { homePageService, userService } from "../../services";
// import { toast } from "react-toastify";

export const getTopDoctorStart = () => {
    return async (dispatch, getSate) =>{
        try {

            let result = await homePageService.getTopDoctor(5)
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
                console.log("Data get schudule by ID: ", result.data)
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
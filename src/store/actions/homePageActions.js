import actionTypes from "./actionTypes";
import { homePageService } from "../../services";
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
            console.log("ID get detailt Doctor: ", id)
            let result = await homePageService.getDetailDoctorById(id)
            if(result)
            {
                console.log("Detail  Doctor by ID: ", result)
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
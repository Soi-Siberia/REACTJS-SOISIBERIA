import actionTypes from './actionTypes';
import { userService } from '../../services';
import  {toast}  from 'react-toastify';

//action Creator gender
export const fetchGenderStart =() => {

    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START}) // gọi đến action FETCH_GENDER_START

            let res = await userService.getAllCode("GENDER")
            if( res && res.errCode === 0 )
            {
                // console.log("data: ", res.dataResult)
                dispatch(fetchGenderSuccess(res.dataResult))
                
            }else{
                dispatch(fetchGenderFaided());
            }
            
        } catch (e) {
            dispatch(fetchGenderFaided());
            // console.log("fetchGenderStart error", e)
            
        }   
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

//action Creator Position
export const fetchPositionStart = () =>{
    return  async (dispatch, getState) =>{

        try {

            let res = await userService.getAllCode("POSITION")
            if(res && res.errCode === 0)
            {
                // console.log("data succes position action creator: ", res.dataResult)
                dispatch(fetchPositionSuccess(res.dataResult))
            }else{
                dispatch(fetchPositionFaided())

            }
        } catch (e) {
            dispatch(fetchPositionFaided())
            console.log("fetchPositionFaided erro ",e)
        }

    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED,
})



//ROLE
export const fetchRoleStart = () => {
    
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCode("ROLE")
            // console.log("data role api: ", res)
            if(res && res.errCode === 0){
                dispatch(fetchRoleSucces(res.dataResult))
            }else{
                dispatch(fetchRoleFaided())
            }
            
        }catch (e){
            dispatch(fetchRoleFaided())
            console.log("fetchRoleStart ERRO", e)
        }
    }
}
export const fetchRoleSucces = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED,
})

//active create new user

export const createNewUserStart = (data)=>{

    return async(dispatch, getState)=>{
        try {
            // console.log("data res api", data)

            let res = await userService.CreateNewUser(data)
            if(res && res.errCode === 0){
                toast.success(res.errMessage)
                dispatch(createNewUserSuccess(res))
                dispatch(getAllUserStart())
            }else{
                dispatch(createNewUserFaild())
                toast.error(res.errMessage)
            }

            
        } catch (e) {
            dispatch(createNewUserFaild())
            toast.error("CREATE ERROR, PLEASE CONTACT THE ADMIN")
            console.log('CREATE NEW USER ERROR',e)
        }
    }
}

export const createNewUserSuccess = (dataRes)=> ({
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
    data: dataRes
})

export const createNewUserFaild = ()=> ({
    type: actionTypes.CREATE_NEW_USER_FAILED
})

export const getAllUserStart = ()=>{
    return async (dispatch, getState) => {
        try {
            let result = await userService.getAllUsers('ALL') 
            if(result && result.errCode === 0)
            {
                dispatch(getAllUserSuccess(result.user.reverse()))
            }else{
                dispatch(getAllUserFaild())
                console.log("getAllUserStart ERRO", result.user)
            }
            
        } catch (e) {
            dispatch(getAllUserFaild())
            
        }
    }
}

export const getAllUserSuccess = (dataResult)=>({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: dataResult
})
export const getAllUserFaild = ()=>({
    type: actionTypes.GET_ALL_USER_FAILD,
})

export const deleteUserIdStart = (idUser) =>{
    return async(dispatch, getState) =>{
        try {
            let resDel = await userService.DeleteUser(idUser)
            if(resDel && resDel.errCode === 0)
            {
                toast.success(resDel.errMessage)
                dispatch(deleteUserIdSuccess())
            }else(
                toast.error(resDel.errMessage)
            )
        } catch (e) {
            console.log("deleteUserIdStart ERROR", e)
            toast.error("ERROR DELETE USER")
            dispatch(deleteUserIdFaild())
        }
    }
}



export const deleteUserIdSuccess = ()=>({
    type: actionTypes.DELETE_USER_BY_ID_SUCCESS
})

export const deleteUserIdFaild = ()=>({
    type: actionTypes.DELETE_USER_BY_ID_SUCCESS
})

//UPDATE USER

export const updateUserStart = (dataUpdate) =>{
    return async (dispatch, getState) => {
        console.log("Đây là data updateUserStart:", dataUpdate)
        try {
            let resutlUpdate = await userService.EditUser(dataUpdate)
            if(resutlUpdate && resutlUpdate.errCode === 0)
            {
                toast.success(resutlUpdate.message)
                dispatch(updateUserSuccess())
            }else{
                toast.error("resutlUpdate.message")
                dispatch(updateUserFaild())
            }

        } catch (e) {
            console.log("updateUserStart ERROR", e)
            dispatch(updateUserFaild())
            toast.error("UPDATE USER FAILD")
        }
    }
}


export const updateUserSuccess = () =>({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFaild = () => ({
    type: actionTypes.UPDATE_USER_FAILD
})

export const getAllDoctorStart = () => {
    return (async (dispatch, getState)=> {
        try {
        let result = await userService.getAllDoctor()
        if(result)
        {
            // console.log("Gell ALL Doctor:",result.doctors.data)

            dispatch(getAllDoctorSuccess(result.data))
        }else
        {
            dispatch(getAllDoctorFaild())
        }
            
        } catch (e) {
            dispatch(getAllDoctorFaild())
            console.log("getAllDoctorStart error", e)
        }
    })
}
export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTOR_SUCCESS,
    data: data
})
export const getAllDoctorFaild = () => ({
    type: actionTypes.GET_ALL_DOCTOR_FAILD,
})

export const createMarkDownStart = (data) => {
    return ( async (dispatch, getState) => {
        try {
            console.log("data create markdown action: ", data)
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown)
            {
                toast.error ("Dữ liệu đầu vào trống vui lòng kiểm tra lại !!!!")
                dispatch(createMarkDownFaild())

            }else{
                let result = await userService.createMarkDown(data)
                // console.log("Kết quả create markdown: ",result)

                if(result && result.errCode === 0)
                {
                    toast.success(result.message)
                    dispatch(createMarkDownSuccess())
                }else{

                    toast.error(result.message)
                    dispatch(createMarkDownFaild())

                }

            }

            
        } catch (e) {
            console.log("createMarkDownStart error", e)
            toast.error("Đã có lỗi vui lòng liên hệ ADMIN")
            dispatch(createMarkDownFaild())
        }
    })
}


export const createMarkDownSuccess = () => ({
    type: actionTypes.CREATE_MARKDOWN_SUCCESS,
})

export const createMarkDownFaild = () => ({
    type: actionTypes.CREATE_MARKDOWN_FAILD,
})

export const fatchRoleDoctorStart = () =>{
    return ( async (dispatch, getState) => {
        try {
            let res = await userService.getAllCode("TIME")
            if(res && res.errCode === 0)
            {
                // console.log("data succes position action creator: ", res.dataResult)
                dispatch(fatchRoleDoctorSuccess(res.dataResult))
            }else{
                dispatch(fatchRoleDoctorFaild())
        
            }
        } catch (e) {
            dispatch(fatchRoleDoctorFaild())
            console.log("fatchRoleDoctorStart error ",e)
        }
    })
}

export const fatchRoleDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_DOCTOR_SUCCESS,
    data: data
})

export const fatchRoleDoctorFaild = () => ({
    type: actionTypes.FETCH_ROLE_DOCTOR_FAIDED,
})

export const bulkCreateSheduleStart = (data) => {
    return ( async (dispatch, getState)=>{
        console.log("data bulk start: ", data)
        console.log("data type bulk start: ",typeof data)


        try {
            // if(data && data.length > 0)
            // {
            //     toast.warn("Dữ liệu trống! Vui lòng kiểm tra lại")
            //     dispatch(bulkCreateSheduleFaild)
            // }
            let result = await userService.bulkCreateShedule(data)
            if(result && result.errCode === 0)
            {
                toast.success(result.message)
            }else
            {
                toast.error(result.message)
            }
        } catch (e) {
            console.log("bulkCreateSheduleStart ERROR")
            dispatch(bulkCreateSheduleFaild())
        }
    })
}

export const bulkCreateSheduleSucess = () =>({
    type: actionTypes.BULK_CREATE_SCHEDULE_SUCCESS
})

export const bulkCreateSheduleFaild = () => ({
    type: actionTypes.BULK_CREATE_SCHEDULE_FAILD
})

export const fetchDoctorInforStart =() => {

    return async (dispatch, getState) => {
        try {
            let resPrice = await userService.getAllCode("PRICE")
            let resPayment = await userService.getAllCode("PAYMENT")
            let resProvince = await userService.getAllCode("PROVINCE")
            if( resPrice?.errCode === 0 &&
                resPayment?.errCode === 0 &&
                resProvince?.errCode === 0 )
            {
                let doctorInfor = {
                    resPrice: resPrice.dataResult,
                    resPayment: resPayment.dataResult, 
                    resProvince: resProvince.dataResult
                }
                // console.log("data doctor infor: ", doctorInfor)
                dispatch(fetchDoctorInforSucess(doctorInfor))
                
            }else{
                dispatch(fetchDoctorInforFaild());
            }
            
        } catch (e) {
            dispatch(fetchDoctorInforFaild());
            // console.log("fetchGenderStart error", e)
            
        }   
    }

}

export const fetchDoctorInforSucess = (doctorInfor) => ({
    type: actionTypes.FETCH_DOCTOR_INFOR_SUCCESS,
    data: doctorInfor
})

export const fetchDoctorInforFaild = () => ({
    type: actionTypes.FETCH_DOCTOR_INFOR_FAILD
})

export const fetchMarkDownDoctorStart = (id) =>{
    return async (dispatch, getState) => {
        try {
            
            let result = await userService.getMarkdownDoctorByID(id)
            // console.log("MarkDown infor by ID doctor: ", result)
            dispatch(fetchMarkDownDoctorSuccess(result.data))

            
        } catch (e) {
            console.log("fetchMarkDownDoctorStart ERROR!!!")
            dispatch(fetchMarkDownDoctorFaild())
        }
    }
}

export const fetchMarkDownDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_MARKDOWN_DOCTOR_SUCCESS,
    data: data
})

export const fetchMarkDownDoctorFaild = () => ({
    type: actionTypes.FETCH_MARKDOWN_DOCTOR_FAILD
})


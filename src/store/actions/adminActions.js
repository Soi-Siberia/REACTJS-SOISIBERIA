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
        try {
            let resutlUpdate = await userService.EditUser(dataUpdate)
            console.log("Đây là data updateUserStart:", dataUpdate)
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
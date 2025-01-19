import actionTypes from './actionTypes';
import { userService } from '../../services';

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
            console.log("data role api: ", res)
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
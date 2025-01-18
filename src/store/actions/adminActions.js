import actionTypes from './actionTypes';
import { userService } from '../../services';


export const fetchGenderStart =() => {

    return async (dispatch, getState) => {
        console.log("get state: ", getState)
        try {
            let res = await userService.getAllCode("GENDER")
            if( res && res.errCode === 0 )
            {
                console.log("data: ", res.dataResult)
                dispatch(fetchGenderSuccess(res.dataResult))
                
            }else{
                dispatch(fetchGenderFaided());
            }
            
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log("fetchGenderStart error", e)
            
        }   
    }

}

export const fetchGenderSuccess = (getData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: getData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

//B1 tạo các action ở đây

import { toast } from 'react-toastify';
import actionTypes from './actionTypes';
import { userService } from "../../services";


export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

export const verifyEmailBookingStart = (data)=>{
    return async(dispatch, getSate) => {
        try {
            let result =  await userService.verifyEmailBooking(data)
            dispatch(verifyEmailBookingSuccess(result))
            
        } catch (e) {
            dispatch(verifyEmailBookingFaild(e))
            toast.error("Đã có lỗi sãy ra", e)
        }
    }
}

export const verifyEmailBookingSuccess = (data) => ({
    type: actionTypes.VERIFY_EMAIL_SUCCESS,
    data: data
})
export const verifyEmailBookingFaild = () => ({
    type: actionTypes.VERIFY_EMAIL_FAILD
})

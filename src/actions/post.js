import axios from "axios";
import {
    loginSlice,
    forgotPasswordSlice,
    registerAccountSlice,
    postEmployeeSlice,
} from "../reducers/post"
import { data } from "react-router-dom";
import {
    loginStatusSlice
} from "../reducers/get"

const {setLoginStatus} = loginStatusSlice.actions
const { loginSuccess, loginError, setLoadingLogin } = loginSlice.actions
export const login = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        }, 
        withCredentials: true,
    }
    dispatch(setLoadingLogin(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_LOGIN}`, data, config);
        dispatch(loginSuccess(response?.data?.success));
        dispatch(setLoginStatus(true))
    } catch(error) {
        const errorData = error.response?.data || {};

        const response = {
            errorLogin: errorData?.error,
            errorPassLogin: errorData.ErrorField?.Password 
            || errorData.ErrorField[0]?.Password || undefined,
            errorEmailLogin: errorData.ErrorField?.Email 
            || errorData.ErrorField[0]?.Email || undefined,
        };

        dispatch(loginError(response));
    } finally {
        dispatch(setLoadingLogin(false))
    }
}

const {setSuccessForgotPassword, setErrorForgotPassword, setLoadingForgotPassword} = forgotPasswordSlice.actions
export const forgotPassword = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }
    dispatch(setLoadingForgotPassword(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}`, data, config)
        dispatch(setSuccessForgotPassword(response?.data?.success))
    } catch (error) {
        dispatch(setErrorForgotPassword(error?.response?.data?.error))
    } finally {
        dispatch(setLoadingForgotPassword(false))
    }
}


const {setSuccessRegisterAccount, setErrorRegisterAccount, setLoadingRegisterAccount} = registerAccountSlice.actions
export const registerAccount = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
    dispatch(setLoadingRegisterAccount(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_REGISTER}`, data, config)
        dispatch(setSuccessRegisterAccount(response?.data?.success))
    } catch (error) {
        dispatch(setErrorRegisterAccount({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
            errorDomain: error?.response?.data?.ErrorField?.subdomain,
        }))
    } finally {
        dispatch(setLoadingRegisterAccount(false))
    }
}

const {setSuccessPostEmployee, setErrorPostEmployee, setLoadingPostEmployee} = postEmployeeSlice.actions
export const postEmployee = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
    dispatch(setLoadingPostEmployee(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_POST_EMPLOYEE}`, data, config)
        dispatch(setSuccessPostEmployee(response?.data?.success))
    } catch (error) {
        dispatch(setErrorPostEmployee({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.errorField,
        }))
    } finally {
        dispatch(setLoadingPostEmployee(false))
    }
}
import axios from "axios";
import {
    loginSlice,
    forgotPasswordSlice,
    registerAccountSlice,
    postEmployeeSlice,
    createEmployeeSlice,
    addStoreSlice,
    submissionChangePaymentGatewaySlice,
} from "../reducers/post"
import { data } from "react-router-dom";
import {
    loginStatusSlice
} from "../reducers/get"
import {statusExpiredUserTokenSlice} from '../reducers/expToken'
import { collectFingerprintAsync } from "../helperComponent/fp";

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

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
        const nonce_data = await collectFingerprintAsync();

        const formData = {
            ...data,
            nonce: nonce_data.nonce,
            value: nonce_data.value, 
            iv: nonce_data.iv,
        }

        const response = await axios.post(`${process.env.REACT_APP_LOGIN}`, formData, config);
        dispatch(loginSuccess(response?.data?.success));
        dispatch(setLoginStatus(true))
    } catch(error) {
        const errorData = error.response?.data || {};

        const response = {
            errorLogin: errorData?.error,
            errorField: errorData.ErrorField,
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
        const nonce_data = await collectFingerprintAsync();

        const formData = {
            ...data,
            nonce: nonce_data.nonce,
            value: nonce_data.value, 
            iv: nonce_data.iv,
        }

        const response = await axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD}`, formData, config)
        dispatch(setSuccessForgotPassword(response?.data?.success))
    } catch (error) {
        dispatch(setErrorForgotPassword({
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
        }))
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
        const nonce_data = await collectFingerprintAsync();

        const formData = {
            ...data,
            nonce_data,
        };

        const response = await axios.post(`${process.env.REACT_APP_REGISTER}`, formData, config)
        dispatch(setSuccessRegisterAccount({
            success: response?.data?.success, 
            data: response?.data?.data,
        }))
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
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorPostEmployee({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
        }))
    } finally {
        dispatch(setLoadingPostEmployee(false))
    }
}

const {
  setSuccessCreateEmployee,
  setErrorCreateEmployee,
  setLoadingCreateEmployee,
} = createEmployeeSlice.actions
export const createEmployee = (formData) => {
  return async (dispatch) => {
    dispatch(setLoadingCreateEmployee(true))
    try {
      const response = await axios.post(process.env.REACT_APP_EMPLOYEE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      dispatch(setSuccessCreateEmployee(response?.data?.success))
      return response.data
    } catch (error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorCreateEmployee({
            error: error?.response?.data?.error, 
            errorField: error?.response?.data?.ErrorField,
        }))
    } finally {
      dispatch(setLoadingCreateEmployee(false))
    }
  }
}

const {
    setSuccessAddStore,
    setErrorAddStore,
    setLoadingAddStore
} = addStoreSlice.actions
export const addStore = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
    dispatch(setLoadingAddStore(true))
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_ADD_STORE}`,
            data,
            config
        )
        dispatch(setSuccessAddStore({
            success: response?.data?.success, 
            data: response?.data?.data,
        }))
    } catch (error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorAddStore({
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
        }))
    } finally {
        dispatch(setLoadingAddStore(false))
    }
}

const {setSuccessSubmissionChangePaymentGateway,setErrorSubmissionChangePaymentGateway,setLoadingSubmissionChangePaymentGateway} = submissionChangePaymentGatewaySlice.actions 
export const submissionChangePaymentGateway = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }
    dispatch(setLoadingSubmissionChangePaymentGateway(true))
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_POST_SUBMISSION_CHANGE_CREDENTIAL_STORE}`,
            data,
            config
        )
        dispatch(setSuccessSubmissionChangePaymentGateway(response?.data?.success))
    } catch (error) {
        if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
            dispatch(setStatusExpiredUserToken(true));
        }
        dispatch(setErrorSubmissionChangePaymentGateway({
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.ErrorField,
        }))
    } finally {
        dispatch(setLoadingSubmissionChangePaymentGateway(false))
    }
}
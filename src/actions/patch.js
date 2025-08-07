import axios from "axios";
import { 
    registerVerificationSlice,
    patchCredentialStoreSlice,
    extendServiceStoreSlice,
} from "../reducers/patch" 

const {setSuccessRegisterVerification, setErrorRegisterVerification, setLoadingRegisterVerification, setDataRegisterVerification} = registerVerificationSlice.actions
export const registerVerification = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }
    dispatch(setLoadingRegisterVerification(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_REGISTER_VERIFICATION}`, data, config)
        dispatch(setSuccessRegisterVerification(response?.data?.success))
        dispatch(setDataRegisterVerification(response?.data?.data))
    } catch (error) {
        dispatch(setErrorRegisterVerification({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.errorField,
        }))
    } finally {
        dispatch(setLoadingRegisterVerification(false))
    }
}

const { setSuccessPatchCredentialStore, setErrorPatchCredentialStore, setLoadingPatchCredentialStore } = patchCredentialStoreSlice.actions
export const patchCredentialStore = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
    dispatch(setLoadingPatchCredentialStore(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_PATCH_CREDENTIAL_STORE}`, data, config)
        dispatch(setSuccessPatchCredentialStore(response?.data?.success))
    } catch (error) {
        dispatch(setErrorPatchCredentialStore({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.errorField,
        }))
    } finally {
        dispatch(setLoadingPatchCredentialStore(false))
    }
}


const {setSuccessExtendServiceStore, setErrorExtendServiceStore, setLoadingExtendServiceStore, setDataExtendServiceStore} = extendServiceStoreSlice.actions
export const extendServiceStore = (data) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }
    dispatch(setLoadingExtendServiceStore(true))
    try {
        const response = await axios.post(`${process.env.REACT_APP_EXTEND_SERVICE_STORE}`, data, config)
        dispatch(setSuccessExtendServiceStore(response?.data?.success))
        dispatch(setDataExtendServiceStore(response?.data?.data))
    } catch (error) {
        dispatch(setErrorExtendServiceStore({ 
            error: error?.response?.data?.error,
            errorField: error?.response?.data?.errorField,
        }))
    } finally {
        dispatch(setLoadingExtendServiceStore(false))
    }
}

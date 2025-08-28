import axios from "axios";
import { 
  updateEmployeeSlice,
  updateStoreSlice,
} from "../reducers/put";
import {statusExpiredUserTokenSlice} from '../reducers/expToken'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {
  setSuccessUpdateEmployee,
  setErrorUpdateEmployee,
  setLoadingUpdateEmployee,
} = updateEmployeeSlice.actions
export const updateEmployee = (formData) => {
  return async (dispatch) => {
    dispatch(setLoadingUpdateEmployee(true))
    try {
      const response = await axios.put(process.env.REACT_APP_EMPLOYEE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      dispatch(setSuccessUpdateEmployee(true))
      return response.data
    } catch (error) {
      if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
        dispatch(setStatusExpiredUserToken(true));
      }
      dispatch(setErrorUpdateEmployee(error?.response?.data?.error || 'Gagal memperbarui employee'))
    } finally {
      dispatch(setLoadingUpdateEmployee(false))
    }
  }
}

const {
  setSuccessUpdateStore,
  setErrorUpdateStore,
  setLoadingUpdateStore,
} = updateStoreSlice.actions
export const updateStore = (formData) => {
  return async (dispatch) => {  
    dispatch(setLoadingUpdateStore(true))
    try {
      const response = await axios.put(process.env.REACT_APP_ADD_STORE, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      dispatch(setSuccessUpdateStore(response?.data))
    } catch(error) {
      if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
        dispatch(setStatusExpiredUserToken(true));
      }
      dispatch(setErrorUpdateStore({
        error: error.response?.data?.error,
        errorField: error.response?.data?.ErrorField
      }))
    } finally {
      dispatch(setLoadingUpdateStore(false))
    }
  }
}
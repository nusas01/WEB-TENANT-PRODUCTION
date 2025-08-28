import axios from "axios";
import { deleteEmployeeSlice  } from "../reducers/delete";
import {statusExpiredUserTokenSlice} from '../reducers/expToken'

const {setStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions

const {
  setSuccessDeleteEmployee,
  setErrorDeleteEmployee,
  setLoadingDeleteEmployee,
} = deleteEmployeeSlice.actions
export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(setLoadingDeleteEmployee(true))
    try {
      const response = await axios.delete(process.env.REACT_APP_EMPLOYEE, {
        params: { id: id },
        withCredentials: true,
      })
      dispatch(setSuccessDeleteEmployee(true))
      return response.data
    } catch (error) {
      if (error.response?.data?.code === "TOKEN_USER_EXPIRED") {
        dispatch(setStatusExpiredUserToken(true));
      }
      dispatch(setErrorDeleteEmployee(error?.response?.data?.error || 'Gagal menghapus employee'))
    } finally {
      dispatch(setLoadingDeleteEmployee(false))
    }
  }
}
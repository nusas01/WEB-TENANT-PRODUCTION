import axios from "axios";
import { updateEmployeeSlice } from "../reducers/put";

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
      dispatch(setErrorUpdateEmployee(error?.response?.data?.error || 'Gagal memperbarui employee'))
    } finally {
      dispatch(setLoadingUpdateEmployee(false))
    }
  }
}



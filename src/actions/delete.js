import axios from "axios";
import { deleteEmployeeSlice  } from "../reducers/delete";

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
      dispatch(setErrorDeleteEmployee(error?.response?.data?.error || 'Gagal menghapus employee'))
      throw error
    } finally {
      dispatch(setLoadingDeleteEmployee(false))
    }
  }
}
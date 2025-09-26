import { createSlice } from "@reduxjs/toolkit";


const initialDeleteEmployeeState = {
  successDeleteEmployee: null,
  errorDeleteEmployee: null,
  loadingDeleteEmployee: false,
}
export const deleteEmployeeSlice = createSlice({
  name: 'deleteEmployee',
  initialState: initialDeleteEmployeeState,
  reducers: {
    setSuccessDeleteEmployee: (state, action) => {
      state.successDeleteEmployee = action.payload
    },
    setErrorDeleteEmployee: (state, action) => {
      state.errorDeleteEmployee = action.payload || null
    },
    setLoadingDeleteEmployee: (state, action) => {
      state.loadingDeleteEmployee = action.payload
    },
    resetDeleteEmployee: (state) => {
      state.successDeleteEmployee = null
      state.errorDeleteEmployee = null
    },
  },
})
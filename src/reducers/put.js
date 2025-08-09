import { createSlice } from "@reduxjs/toolkit";

const initialUpdateEmployeeState = {
  successUpdateEmployee: false,
  errorUpdateEmployee: null,
  loadingUpdateEmployee: false,
}
export const updateEmployeeSlice = createSlice({
  name: 'updateEmployee',
  initialState: initialUpdateEmployeeState,
  reducers: {
    setSuccessUpdateEmployee: (state, action) => {
      state.successUpdateEmployee = action.payload
    },
    setErrorUpdateEmployee: (state, action) => {
      state.errorUpdateEmployee = action.payload || null
    },
    setLoadingUpdateEmployee: (state, action) => {
      state.loadingUpdateEmployee = action.payload
    },
    resetUpdateEmployee: (state) => {
      state.successUpdateEmployee = false
      state.errorUpdateEmployee = null
    },
  },
})
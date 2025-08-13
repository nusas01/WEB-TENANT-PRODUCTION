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

const initialUpdateStoreState = {
  successUpdateStore: false,
  errorUpdateStore: null,
  errorFieldUpdateStore: {},
  loadingUpdateStore: false,
}
export const updateStoreSlice = createSlice({
  name: 'updateStore',
  initialState: initialUpdateStoreState,
  reducers: {
    setSuccessUpdateStore: (state, action) => {
      state.successUpdateStore = action.payload
    },
    setErrorUpdateStore: (state, action) => {
      state.errorUpdateStore = action.payload.error || null
      state.errorFieldUpdateStore = action.payload.errorField || {}
    },
    setLoadingUpdateStore: (state, action) => {
      state.loadingUpdateStore = action.payload
    },
    resetUpdateStore: (state) => {
      state.successUpdateStore = false
      state.errorUpdateStore = null
      state.errorFieldUpdateStore = {}
    },
  },
})
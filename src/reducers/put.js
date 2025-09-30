import { createSlice } from "@reduxjs/toolkit";

const initialUpdateEmployeeState = {
  successUpdateEmployee: null,
  errorUpdateEmployee: null,
  errorFieldUpdateEmployee: null,
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
      state.errorUpdateEmployee = action.payload.error || null
      state.errorFieldUpdateEmployee = action.payload.errorField
    },
    setLoadingUpdateEmployee: (state, action) => {
      state.loadingUpdateEmployee = action.payload
    },
    resetUpdateEmployee: (state) => {
      state.errorFieldUpdateEmployee = null
      state.successUpdateEmployee = null
      state.errorUpdateEmployee = null
    },
  },
})

const initialUpdateStoreState = {
  successUpdateStore: null,
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
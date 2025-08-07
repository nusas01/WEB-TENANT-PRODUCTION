import { createSlice } from "@reduxjs/toolkit";

const initialRegisterVerification = {
    successRegisterVerification: false,
    errorFieldsRegisterVerification: null,
    errorRegisterVerification: null,
    loadingRegisterVerification: false,
    dataRegisterVerification: null, 
}
export const registerVerificationSlice = createSlice({
    name: 'registerVerification',
    initialState: initialRegisterVerification,
    reducers: {
        setSuccessRegisterVerification: (state, action) => {
            state.successRegisterVerification = action.payload
        },
        setErrorRegisterVerification: (state, action) => {
            state.errorFieldsRegisterVerification = action.payload.errorField
            state.errorRegisterVerification = action.payload.error
        },
        setLoadingRegisterVerification: (state, action) => {
            state.loadingRegisterVerification = action.payload
        },
        setDataRegisterVerification: (state, action) => {
            state.dataRegisterVerification = action.payload
        },
        resetRegisterVerification: (state) => {
            state.errorFieldsRegisterVerification = null
            state.errorRegisterVerification = null
            state.successRegisterVerification = false
            state.dataRegisterVerification = null
        }
    }
})

const initialPatchCredentialStore = {
    successPatchCredentialStore: false,
    errorFieldsPatchCredentialStore: null,
    errorPatchCredentialStore: null,
    loadingPatchCredentialStore: false,
}
export const patchCredentialStoreSlice = createSlice({
    name: 'patchCredentialStore',
    initialState: initialPatchCredentialStore,
    reducers: {
        setSuccessPatchCredentialStore: (state, action) => {
            state.successPatchCredentialStore = action.payload
        },
        setErrorPatchCredentialStore: (state, action) => {
            state.errorFieldsPatchCredentialStore = action.payload.errorField
            state.errorPatchCredentialStore = action.payload.error
        },
        setLoadingPatchCredentialStore: (state, action) => {
            state.loadingPatchCredentialStore = action.payload
        },
        resetPatchCredentialStore: (state) => {
            state.errorFieldsPatchCredentialStore = null
            state.errorPatchCredentialStore = null
            state.successPatchCredentialStore = false
        }
    }
})


const initialExtendServiceStore = {
    successExtendServiceStore: false,
    errorFieldsExtendServiceStore: null,
    errorExtendServiceStore: null,
    loadingExtendServiceStore: false,
    dataExtendServiceStore: null,
}
export const extendServiceStoreSlice = createSlice({
    name: 'extendServiceStore',
    initialState: initialExtendServiceStore,
    reducers: {
        setSuccessExtendServiceStore: (state, action) => {
            state.successExtendServiceStore = action.payload
        },
        setErrorExtendServiceStore: (state, action) => {
            state.errorFieldsExtendServiceStore = action.payload.errorField
            state.errorExtendServiceStore = action.payload.error
        },
        setLoadingExtendServiceStore: (state, action) => {
            state.loadingExtendServiceStore = action.payload
        },
        setDataExtendServiceStore: (state, action) => {
            state.dataExtendServiceStore = action.payload
        },
        resetExtendServiceStore: (state) => {
            state.errorFieldsExtendServiceStore = null
            state.errorExtendServiceStore = null
            state.successExtendServiceStore = false
            state.dataExtendServiceStore = null
        }
    }
})